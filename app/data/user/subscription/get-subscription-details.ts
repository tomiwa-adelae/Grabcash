import "server-only";
import { requireUser } from "../require-user";
import { prisma } from "@/lib/db";

export const getSubscriptionDetails = async (id: string) => {
  await requireUser();

  const details = await prisma.subscription.findUnique({
    where: {
      id,
    },
    select: {
      endDate: true,
      plan: {
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
      },
    },
  });

  return details;
};

export type GetSubscriptionDetailsType = Awaited<
  ReturnType<typeof getSubscriptionDetails>
>;
