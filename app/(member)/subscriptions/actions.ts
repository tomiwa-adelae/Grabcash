// "use server";

// import { logActivity } from "@/app/data/admin/activity/log-activity";
// import { getUserDetails } from "@/app/data/user/get-user-details";
// import { requireUser } from "@/app/data/user/require-user";
// import { ProSubscriptionEmail } from "@/emails/pro-subscription-email";
// import { prisma } from "@/lib/db";
// import { env } from "@/lib/env";
// import { ApiResponse } from "@/lib/types";

// import Mailjet from "node-mailjet";
// const mailjet = Mailjet.apiConnect(
//   env.MAILJET_API_PUBLIC_KEY,
//   env.MAILJET_API_PRIVATE_KEY
// );

// export const activateSubscription = async ({
//   amount,
//   planId,
//   status,
//   reference,
//   transactionId,
// }: {
//   amount: string;
//   planId: string;
//   status: string;
//   reference: string;
//   transactionId: string;
// }) => {
//   const { user } = await requireUser();

//   try {
//     const userDetails = await getUserDetails();
//     if (userDetails.status === "SUSPENDED")
//       return { status: "error", message: "Your account has been suspended" };
//     if (userDetails.status === "DELETED")
//       return { status: "error", message: "Your account has been deleted" };

//     const plan = await prisma.subscriptionPlan.findUnique({
//       where: { id: planId },
//     });

//     if (!plan) return { status: "error", message: "Oops! Invalid plan" };

//     await prisma.payment.create({
//       data: {
//         userId: user.id,
//         subscriptionPlanId: plan.id,
//         amount,
//         reference,
//         transactionId,
//         status:
//           status === "successful" ||
//           status === "completed" ||
//           status === "success"
//             ? "SUCCESS"
//             : "FAILED",
//       },
//     });

//     const subscription = await prisma.subscription.create({
//       // where: { userId: user.id },
//       // update: {
//       //   subscriptionPlanId: plan.id,
//       //   startDate: new Date(),
//       //   endDate: new Date(
//       //     Date.now() + Number(plan.durationDays) * 24 * 60 * 60 * 1000
//       //   ),
//       //   status: "ACTIVE",
//       // },
//       data: {
//         userId: user.id,
//         subscriptionPlanId: plan.id,
//         startDate: new Date(),
//         endDate: new Date(
//           Date.now() + Number(plan.durationDays) * 24 * 60 * 60 * 1000
//         ),
//         status: "ACTIVE",
//       },
//     });

//     await prisma.payout.create({
//       data: {
//         amount: Number(amount),
//         fee: Number(amount),
//         type: "DEBIT",
//         userId: user.id,
//         title: `Grabcash ${plan.name} subscription`,
//         status: "PAID",
//       },
//     });

//     // Log the activity
//     await logActivity({
//       type: "USER_UPGRADED",
//       description: `${plan.name} plan was activated for ${
//         user.name || user.email
//       }`,
//       userId: user.id,
//       subscriptionId: subscription.id,
//       metadata: {
//         planName: plan.name,
//         price: plan.price,
//         durationDays: plan.durationDays,
//       },
//     });

//     await mailjet.post("send", { version: "v3.1" }).request({
//       Messages: [
//         {
//           From: {
//             Email: env.SENDER_EMAIL_ADDRESS,
//             Name: "grabcash",
//           },
//           To: [{ Email: user.email, Name: user.name }],
//           Subject: `Welcome to grabcash Pro, ${user.name}`,
//           HTMLPart: ProSubscriptionEmail({ name: user.name, plan: plan.name }),
//         },
//       ],
//     });

//     return {
//       status: "success",
//       message: "Account successfully upgraded",
//       data: subscription,
//     };
//   } catch (error) {
//     return {
//       status: "error",
//       message:
//         "Failed to upgrade account. Please reach out to out support team",
//     };
//   }
// };

"use server";

import { logActivity } from "@/app/data/admin/activity/log-activity";
import { getUserDetails } from "@/app/data/user/get-user-details";
import { requireUser } from "@/app/data/user/require-user";
import { ProSubscriptionEmail } from "@/emails/pro-subscription-email";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

import Mailjet from "node-mailjet";
const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY,
);

export const activateSubscription = async ({
  amount,
  planId,
  transactionId, // Flutterwave's 'transaction_id' from the response
}: {
  amount: number;
  planId: string;
  transactionId: string;
}) => {
  const { user } = await requireUser();

  try {
    // 1. VERIFY TRANSACTION WITH FLUTTERWAVE
    // We call Flutterwave directly to ensure the user actually paid.
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${env.FW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const fwData = await response.json();

    // Validation checks
    if (fwData.status !== "success" || fwData.data.status !== "successful") {
      return { status: "error", message: "Transaction verification failed" };
    }

    // Ensure the amount paid matches the expected amount
    if (fwData.data.amount < amount) {
      return { status: "error", message: "Invalid payment amount detected" };
    }

    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED") throw new Error("SUSPENDED");

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) return { status: "error", message: "Invalid plan" };

    // 2. DATABASE TRANSACTION (Keep it lean)
    const subscription = await prisma.$transaction(async (tx) => {
      // Create Payment Record
      await tx.payment.create({
        data: {
          userId: user.id,
          subscriptionPlanId: plan.id,
          amount: String(amount),
          reference: fwData.data.tx_ref,
          transactionId: String(transactionId),
          status: "SUCCESS",
        },
      });

      // Create/Update Subscription
      const sub = await tx.subscription.create({
        data: {
          userId: user.id,
          subscriptionPlanId: plan.id,
          startDate: new Date(),
          endDate: new Date(
            Date.now() + Number(plan.durationDays) * 24 * 60 * 60 * 1000,
          ),
          status: "ACTIVE",
        },
      });

      // Create Payout (Ledger Entry)
      await tx.payout.create({
        data: {
          amount: Number(amount),
          fee: 0, // Fee is usually internal or calculated separately
          type: "DEBIT",
          userId: user.id,
          title: `Grabcash ${plan.name} subscription`,
          status: "PAID",
        },
      });

      return sub;
    });

    // 3. LOGGING & EMAILS (Outside the transaction)
    await logActivity({
      type: "USER_UPGRADED",
      description: `${plan.name} plan activated for ${user.name || user.email}`,
      userId: user.id,
      subscriptionId: subscription.id,
    });

    // Send Mailjet Email
    mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: { Email: env.SENDER_EMAIL_ADDRESS, Name: "grabcash" },
            To: [{ Email: user.email, Name: user.name }],
            Subject: `Welcome to grabcash Pro, ${user.name}`,
            HTMLPart: ProSubscriptionEmail({
              name: user.name,
              plan: plan.name,
            }),
          },
        ],
      })
      .catch((e) => console.error("Email failed:", e));

    revalidatePath("/");
    return {
      status: "success",
      message: "Account successfully upgraded",
      data: subscription,
    };
  } catch (error: any) {
    if (error.message === "SUSPENDED")
      return { status: "error", message: "Account suspended" };
    console.error("Subscription Error:", error);
    return { status: "error", message: "Failed to upgrade account." };
  }
};
