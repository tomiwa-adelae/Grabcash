import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";

export const getReferralAudit = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: { query?: string; page?: number; limit?: number } = {}) => {
  await requireAdmin();
  const skip = (page - 1) * limit;

  const whereConditions: any = {
    // Look for Payouts that are Referral Bonuses
    title: { contains: "Referral Bonus", mode: "insensitive" },
  };

  if (query) {
    whereConditions.OR = [
      { User: { name: { contains: query, mode: "insensitive" } } },
      { User: { username: { contains: query, mode: "insensitive" } } },
      { title: { contains: query, mode: "insensitive" } },
    ];
  }

  const [payouts, totalCount] = await Promise.all([
    prisma.payout.findMany({
      where: whereConditions,
      include: {
        User: {
          select: {
            name: true,
            username: true,
            email: true,
            image: true,
            // Check sessions to find matching IPs (Fraud Detection)
            sessions: { select: { ipAddress: true }, take: 1 },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.payout.count({ where: whereConditions }),
  ]);

  return {
    payouts,
    pagination: {
      total: totalCount,
      hasNext: page < Math.ceil(totalCount / limit),
    },
  };
};
