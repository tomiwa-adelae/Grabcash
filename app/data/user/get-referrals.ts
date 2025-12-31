import { prisma } from "@/lib/db";

export const getReferralStats = async (userId: string) => {
  const referrals = await prisma.recentActivity.findMany({
    where: {
      userId: userId,
      type: "DEPOSIT_RECEIVED",
      description: { contains: "Referral bonus" },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalEarnings = referrals.length * 500;

  return {
    referrals,
    totalEarnings,
    count: referrals.length,
  };
};
