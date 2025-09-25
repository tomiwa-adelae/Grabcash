"use server";
import { requireAdmin } from "../../require-admin";
import { prisma } from "@/lib/db";

export const getTotalTransactionsMade = async () => {
  await requireAdmin();

  // Count successful job payments
  const jobPaymentsCount = await prisma.jobPayment.count({
    where: { status: "SUCCESS" },
  });

  // Count subscriptions (assuming all subscriptions are considered a transaction)
  const subscriptionsCount = await prisma.subscription.count({
    where: { status: { not: "CANCELED" } }, // or adjust if you want all subscriptions
  });

  // Count payouts (successful payouts)
  const payoutsCount = await prisma.payout.count({
    where: { status: "PAID", withdrawal: true },
  });

  // Total transactions
  const totalTransactions =
    jobPaymentsCount + subscriptionsCount + payoutsCount;

  return totalTransactions; // e.g., 2000
};
