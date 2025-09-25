import "server-only";
import { requireAdmin } from "../../require-admin";
import { prisma } from "@/lib/db";

export const getTotalDeposits = async () => {
  await requireAdmin();

  const payments = await prisma.jobPayment.findMany({
    where: {
      status: "SUCCESS",
    },
    select: {
      amount: true,
    },
  });

  const total = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return total;
};
