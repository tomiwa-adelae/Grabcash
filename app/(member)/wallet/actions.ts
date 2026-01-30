"use server";

import { logActivity } from "@/app/data/admin/activity/log-activity";
import { getUserDetails } from "@/app/data/user/get-user-details";
import { requireUser } from "@/app/data/user/require-user";
import { DEFAULT_MINIMUM_PAYOUT, DEFAULT_WITHDRAWAL_FEE } from "@/constants";
import { PayoutSuccessful } from "@/emails/payout.successful";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { formatMoneyInput } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY,
);

export const initiatePayout = async ({
  amount,
}: {
  amount: number;
}): Promise<ApiResponse> => {
  const session = await requireUser();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        earnings: true,
        name: true,
        email: true,
        accountNumber: true,
        bankCode: true,
        bankName: true,
        accountName: true,
        id: true,
        emailNotification: true,
      },
    });

    // 1. Validations
    if (!user || amount < DEFAULT_MINIMUM_PAYOUT) {
      return {
        status: "error",
        message: `Minimum withdrawal is ₦${DEFAULT_MINIMUM_PAYOUT}`,
      };
    }

    if (!user.earnings || amount > user.earnings) {
      return { status: "error", message: "Insufficient balance" };
    }

    if (!user.accountNumber || !user.bankCode) {
      return { status: "error", message: "Bank details incomplete." };
    }

    const withdrawalFee = (amount * Number(DEFAULT_WITHDRAWAL_FEE)) / 100;
    const finalAmountToDebit = amount + withdrawalFee;

    // 2. Initiate Flutterwave Transfer
    const transferReference = `payout_${user.id}_${Date.now()}`;
    const idempotencyKey = `idem_${Date.now()}_${user.id}`;
    const traceId = `trace_${Date.now()}_${user.id}`;

    try {
      // A. Generate Access Token
      console.log("Step 1: Generating access token...");
      const authRes = await fetch(
        "https://idp.flutterwave.com/realms/flutterwave/protocol/openid-connect/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: env.FLUTTERWAVE_CLIENT_ID,
            client_secret: env.FLUTTERWAVE_CLIENT_SECRET,
            grant_type: "client_credentials",
          }),
        },
      );

      if (!authRes.ok) {
        const errorText = await authRes.text();
        console.error("Auth Error Response:", errorText);
        return {
          status: "error",
          message: "Authentication failed with payment gateway",
        };
      }

      const authData = await authRes.json();
      console.log("Auth successful, token received");

      if (!authData.access_token) {
        console.error("No access token in response:", authData);
        return {
          status: "error",
          message: "Failed to get authentication token",
        };
      }

      const access_token = authData.access_token;

      // Set the base URL based on environment
      const baseUrl =
        env.FLUTTERWAVE_ENV === "production"
          ? "https://api.flutterwave.com"
          : "https://developersandbox-api.flutterwave.com";

      console.log("Using base URL:", baseUrl);

      // B. Create a Transfer Recipient
      console.log("Step 2: Creating transfer recipient...");
      console.log("Account Number:", user.accountNumber);
      console.log("Bank Code:", user.bankCode);

      const recipientPayload = {
        type: "bank_ngn",
        bank: {
          account_number: user.accountNumber,
          code: user.bankCode,
        },
      };

      console.log(
        "Recipient payload:",
        JSON.stringify(recipientPayload, null, 2),
      );

      const recipientRes = await fetch(`${baseUrl}/transfers/recipients`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "X-Trace-Id": traceId,
          "X-Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(recipientPayload),
      });

      console.log("Recipient response status:", recipientRes.status);

      const recipientText = await recipientRes.text();
      console.log("Recipient raw response:", recipientText);

      if (!recipientRes.ok) {
        console.error(
          "Recipient creation failed with status:",
          recipientRes.status,
        );
        return {
          status: "error",
          message: `Failed to create recipient: ${recipientText}`,
        };
      }

      let recipientData;
      try {
        recipientData = JSON.parse(recipientText);
      } catch (e) {
        console.error("Failed to parse recipient response:", e);
        return {
          status: "error",
          message: "Invalid response from payment gateway",
        };
      }

      if (recipientData.status !== "success") {
        console.error("Recipient Error:", recipientData);
        return {
          status: "error",
          message:
            recipientData.error?.message ||
            recipientData.message ||
            "Failed to create recipient",
        };
      }

      const recipientId = recipientData.data.id;
      console.log("Recipient created successfully:", recipientId);

      // C. Initiate the Transfer
      console.log("Step 3: Initiating transfer...");

      const transferPayload = {
        action: "instant",
        reference: transferReference,
        narration: `Payout for ${user.name}`,
        meta: {
          user_id: user.id,
          user_name: user.name,
        },
        payment_instruction: {
          source_currency: "NGN",
          destination_currency: "NGN",
          amount: {
            applies_to: "destination_currency",
            value: amount,
          },
          recipient_id: recipientId,
        },
      };

      console.log(
        "Transfer payload:",
        JSON.stringify(transferPayload, null, 2),
      );

      const transferResponse = await fetch(`${baseUrl}/transfers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "X-Trace-Id": traceId,
          "X-Idempotency-Key": transferReference,
        },
        body: JSON.stringify(transferPayload),
      });

      console.log("Transfer response status:", transferResponse.status);

      const transferText = await transferResponse.text();
      console.log("Transfer raw response:", transferText);

      if (!transferResponse.ok) {
        console.error("Transfer failed with status:", transferResponse.status);
        return {
          status: "error",
          message: `Transfer failed: ${transferText}`,
        };
      }

      let data;
      try {
        data = JSON.parse(transferText);
      } catch (e) {
        console.error("Failed to parse transfer response:", e);
        return {
          status: "error",
          message: "Invalid response from payment gateway",
        };
      }

      if (data.status !== "success") {
        console.error("Transfer Error:", data);
        return {
          status: "error",
          message: data.error?.message || data.message || "Transfer failed",
        };
      }

      console.log("Transfer successful!");

      // 3. Update Database (Atomic Transaction)
      const payoutRecord = await prisma.$transaction(async (tx) => {
        // Deduct total (amount + fee)
        await tx.user.update({
          where: { id: user.id },
          data: { earnings: { decrement: finalAmountToDebit } },
        });

        // Create the main payout record
        return await tx.payout.create({
          data: {
            userId: user.id,
            amount,
            status: "PAID",
            bankName: user.bankName!,
            accountNumber: user.accountNumber!,
            accountName: user.accountName!,
            fee: withdrawalFee,
            title: "Payout Withdrawal",
            type: "DEBIT",
            withdrawal: true,
          },
        });
      });

      // 4. Notifications & Logs
      if (user.emailNotification) {
        await mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: { Email: env.SENDER_EMAIL_ADDRESS, Name: "grabcash" },
              To: [{ Email: user.email, Name: user.name }],
              Subject: `Your payout was successful`,
              HTMLPart: PayoutSuccessful({
                amount: formatMoneyInput(amount),
                bankName: user.bankName!,
                accountNumber: user.accountNumber!,
                date: payoutRecord.createdAt,
                name: user.name!,
              }),
            },
          ],
        });
      }

      await logActivity({
        type: "PAYOUT_COMPLETED",
        description: `${user.name} withdrew ₦${formatMoneyInput(amount)}`,
        userId: user.id,
        payoutId: payoutRecord.id,
        metadata: { amount, reference: transferReference },
      });

      revalidatePath("/");
      return {
        status: "success",
        message: "Payout initiated. Funds will arrive shortly.",
      };
    } catch (err) {
      console.error("Flutterwave API Error:", err);
      return {
        status: "error",
        message: "Connection to payment gateway failed.",
      };
    }
  } catch (error) {
    console.error("General Payout Error:", error);
    return { status: "error", message: "An unexpected error occurred." };
  }
};
