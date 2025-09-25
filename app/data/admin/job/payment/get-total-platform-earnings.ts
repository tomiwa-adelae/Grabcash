import "server-only";
import { requireAdmin } from "../../require-admin";
import { prisma } from "@/lib/db";

export const getTotalPlatformEarnings = async () => {
  await requireAdmin();

  const earnings = await prisma.payout.findMany({
    where: {
      status: "PAID",
    },
    select: {
      fee: true,
    },
  });

  const total = earnings.reduce((sum, p) => sum + Number(p.fee), 0);

  return total;
};
