import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";

export const getSubscriptions = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: Params = {}) => {
  await requireAdmin();

  const skip = (page - 1) * limit;

  const whereConditions: any = {};

  if (query) {
    whereConditions.OR = [
      // { status: { contains: query, mode: "insensitive" } },
      {
        user: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { username: { contains: query, mode: "insensitive" } },
          ],
        },
      },
      {
        plan: {
          OR: [{ name: { contains: query, mode: "insensitive" } }],
        },
      },
    ];
  }

  const [subscriptions, totalCount] = await Promise.all([
    prisma.subscription.findMany({
      where: whereConditions,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
          },
        },
        plan: {
          select: { id: true, name: true, billingCycle: true, price: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.subscription.count({ where: whereConditions }),
  ]);

  // 🔑 Fetch latest payment for each subscription
  const subscriptionsWithPayment = await Promise.all(
    subscriptions.map(async (sub) => {
      const payment = await prisma.payment.findFirst({
        where: {
          userId: sub.userId,
          subscriptionPlanId: sub.subscriptionPlanId,
          status: "SUCCESS",
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          amount: true,
          transactionId: true,
          reference: true,
          createdAt: true,
        },
      });

      return {
        ...sub,
        payment, // may be null if no successful payment
      };
    })
  );

  const totalPages = Math.ceil(totalCount / limit);

  return {
    subscriptions: subscriptionsWithPayment,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

export type GetSubscriptionsResponse = Awaited<
  ReturnType<typeof getSubscriptions>
>;
export type GetSubscriptionsType = GetSubscriptionsResponse["subscriptions"][0];
