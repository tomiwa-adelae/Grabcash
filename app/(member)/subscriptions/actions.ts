"use server";

import { logActivity } from "@/app/data/admin/activity/log-activity";
import { getUserDetails } from "@/app/data/user/get-user-details";
import { requireUser } from "@/app/data/user/require-user";
import { ProSubscriptionEmail } from "@/emails/pro-subscription-email";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";

import Mailjet from "node-mailjet";
const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export const activateSubscription = async ({
  amount,
  planId,
  status,
  reference,
  transactionId,
}: {
  amount: string;
  planId: string;
  status: string;
  reference: string;
  transactionId: string;
}) => {
  const { user } = await requireUser();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) return { status: "error", message: "Oops! Invalid plan" };

    await prisma.payment.create({
      data: {
        userId: user.id,
        subscriptionPlanId: plan.id,
        amount,
        reference,
        transactionId,
        status:
          status === "successful" ||
          status === "completed" ||
          status === "success"
            ? "SUCCESS"
            : "FAILED",
      },
    });

    const subscription = await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        subscriptionPlanId: plan.id,
        startDate: new Date(),
        endDate: new Date(
          Date.now() + Number(plan.durationDays) * 24 * 60 * 60 * 1000
        ),
        status: "ACTIVE",
      },
      create: {
        userId: user.id,
        subscriptionPlanId: plan.id,
        startDate: new Date(),
        endDate: new Date(
          Date.now() + Number(plan.durationDays) * 24 * 60 * 60 * 1000
        ),
        status: "ACTIVE",
      },
    });

    await prisma.payout.create({
      data: {
        amount: Number(amount),
        fee: Number(amount),
        type: "DEBIT",
        userId: user.id,
        title: `Grabcash ${plan.name} subscription`,
        status: "PAID",
      },
    });

    // Log the activity
    await logActivity({
      type: "USER_UPGRADED",
      description: `${plan.name} plan was activated for ${
        user.name || user.email
      }`,
      userId: user.id,
      subscriptionId: subscription.id,
      metadata: {
        planName: plan.name,
        price: plan.price,
        durationDays: plan.durationDays,
      },
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "grabcash",
          },
          To: [{ Email: user.email, Name: user.name }],
          Subject: `Welcome to grabcash Pro, ${user.name}`,
          HTMLPart: ProSubscriptionEmail({ name: user.name, plan: plan.name }),
        },
      ],
    });

    return {
      status: "success",
      message: "Account successfully upgraded",
      data: subscription,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        "Failed to upgrade account. Please reach out to out support team",
    };
  }
};
