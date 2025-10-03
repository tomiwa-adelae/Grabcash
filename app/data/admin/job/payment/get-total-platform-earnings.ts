import "server-only";
import { requireAdmin } from "../../require-admin";
import { prisma } from "@/lib/db";

export const getTotalPlatformEarnings = async () => {
  await requireAdmin();

  // 1. Payout fees
  const payouts = await prisma.payout.findMany({
    where: { status: "PAID", jobPayment: true },
    select: { fee: true },
  });
  const totalPayoutFees = payouts.reduce(
    (sum, p) => sum + Number(p.fee ?? 0),
    0
  );

  // 2. Subscription payments
  const subscriptions = await prisma.payment.findMany({
    where: { status: "SUCCESS" },
    select: { amount: true },
  });

  const totalSubscriptions = subscriptions.reduce(
    (sum, s) => sum + Number(s.amount ?? 0),
    0
  );

  // 3. Total = payout fees + subscriptions
  const total = totalPayoutFees + totalSubscriptions;

  return total;
};
