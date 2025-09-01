import "server-only";
import { requireUser } from "../require-user";
import { prisma } from "@/lib/db";

export const getSubscriptionPlans = async () => {
  await requireUser();

  const plans = await prisma.subscriptionPlan.findMany({
    select: {
      badge: true,
      name: true,
      id: true,
      billingCycle: true,
      durationDays: true,
      description: true,
      features: true,
      price: true,
      createdAt: true,
    },
  });

  return plans;
};

export type GetSubscriptionPlansType = Awaited<
  ReturnType<typeof getSubscriptionPlans>
>[0];
