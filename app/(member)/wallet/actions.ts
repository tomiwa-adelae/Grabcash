"use server";

import { requireUser } from "@/app/data/user/require-user";
import { DEFAULT_MINIMUM_PAYOUT, DEFAULT_WITHDRAWAL_FEE } from "@/constants";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const initiatePayout = async ({
  amount,
}: {
  amount: number;
}): Promise<ApiResponse> => {
  const session = await requireUser();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        earnings: true,
        name: true,
        accountNumber: true,
        bankCode: true,
        bankName: true,
        accountName: true,
      },
    });

    // Input validations
    if (amount < DEFAULT_MINIMUM_PAYOUT) {
      return {
        status: "error",
        message: `You cannot withdraw less than ₦${DEFAULT_MINIMUM_PAYOUT}`,
      };
    }

    if (!user?.earnings || user.earnings <= 0) {
      return { status: "error", message: "Insufficient balance" };
    }

    if (amount > user.earnings) {
      return { status: "error", message: "Insufficient balance" };
    }

    if (
      !user.accountNumber ||
      !user.bankCode ||
      !user.bankName ||
      !user.accountName
    ) {
      return {
        status: "error",
        message:
          "Account details incomplete. Please update your bank information.",
      };
    }

    try {
      // 1️⃣ Create transfer recipient
      const recipientRes = await axios.post(
        "https://api.paystack.co/transferrecipient",
        {
          type: "nuban",
          name: user.name || "User",
          account_number: user.accountNumber,
          bank_code: user.bankCode,
          currency: "NGN",
        },
        {
          headers: {
            Authorization: `Bearer ${env.PS_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!recipientRes.data.status) {
        return {
          status: "error",
          message: recipientRes.data.message || "Failed to create recipient",
        };
      }

      const recipientCode = recipientRes.data.data.recipient_code;

      // Generate unique reference for this transfer
      const transferReference = `payout_${session.user.id}_${Date.now()}`;

      const withdrawalFee = (amount * Number(DEFAULT_WITHDRAWAL_FEE)) / 100;
      const payoutAmount = amount - withdrawalFee;

      // 2️⃣ Initiate transfer
      // const transferRes = await axios.post(
      //   "https://api.paystack.co/transfer",
      //   {
      //     source: "balance",
      //     reason: `Payout withdrawal for ${user.name}`,
      //     amount: Math.floor(payoutAmount * 100), // convert to kobo
      //     recipient: recipientCode,
      //     reference: transferReference,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${env.PS_SECRET_KEY}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (!transferRes.data.status) {
      //   return {
      //     status: "error",
      //     message: transferRes.data.message || "Transfer failed",
      //   };
      // }

      // 3️⃣ Update user earnings in database
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          earnings: {
            decrement: payoutAmount,
          },
        },
      });

      await prisma.payout.create({
        data: {
          userId: session.user.id,
          amount,
          status: "PAID",
          bankName: user.bankName,
          accountNumber: user.accountNumber,
          accountName: user.accountName,
          fee: withdrawalFee,
          title: "Payout Withdrawal",
          type: "DEBIT",
          withdrawal: true,
        },
      });

      await prisma.payout.create({
        data: {
          userId: session.user.id,
          amount: withdrawalFee,
          status: "PAID",
          bankName: user.bankName,
          accountNumber: user.accountNumber,
          accountName: user.accountName,
          fee: 0,
          title: "Withdrawal fee",
          type: "DEBIT",
        },
      });

      revalidatePath("/");

      return {
        status: "success",
        message:
          "Payout initiated successfully. Funds will be transferred shortly.",
        // data: {
        //   transferCode: transferRes.data.data.transfer_code,
        //   reference: transferReference,
        // },
      };
    } catch (transferError: any) {
      console.error(
        "Transfer error:",
        transferError.response?.data || transferError.message
      );

      // Handle specific Paystack errors
      if (transferError.response?.data) {
        return {
          status: "error",
          message: transferError.response.data.message || "Transfer failed",
        };
      }

      return {
        status: "error",
        message: "Failed to process transfer. Please try again.",
      };
    }
  } catch (error: any) {
    console.error("Payout error:", error);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
