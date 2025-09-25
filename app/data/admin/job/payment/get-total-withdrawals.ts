import "server-only";
import { requireAdmin } from "../../require-admin";
import { prisma } from "@/lib/db";

export const getTotalWithdrawals = async () => {
  await requireAdmin();

  const withdrawals = await prisma.payout.findMany({
    where: {
      withdrawal: true,
    },
    select: {
      amount: true,
    },
  });

  const total = withdrawals.reduce((sum, p) => sum + Number(p.amount), 0);

  return total;
};
