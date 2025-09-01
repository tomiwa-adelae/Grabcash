"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";

export const activateSubscription = async (planId: string, response: any) => {
  const { user } = await requireUser();

  try {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) return { status: "error", message: "Oops! Invalid plan" };

    await prisma.payment.create({
      data: {
        userId: user.id,
        subscriptionPlanId: plan.id,
        amount: `${response.amount}`,
        reference: response.tx_ref,
        transactionId: `${response.transaction_id}`,
        status:
          response.status === "successful" || response.status === "completed"
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

    return {
      status: "success",
      message: "Account successfully upgraded",
      data: subscription,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message:
        "Failed to upgrade account. Please reach out to out support team",
    };
  }
};
