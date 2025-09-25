"use server";

import "server-only";
import { prisma } from "@/lib/db";
import { requireAdmin } from "../../require-admin";

/**
 * Helper: format a Date into YYYY-MM
 */
function formatToMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Helper: safely parse amount (handles string or number)
 */
function parseAmount(val: any): number {
  if (val == null) return 0;
  if (typeof val === "number") return val;
  if (typeof val === "string") return parseFloat(val) || 0;
  return 0;
}

export type AnalyticsDataPoint = {
  month: string;
  value: number;
};

export type PlatformAnalytics = {
  jobPaymentsByMonth: AnalyticsDataPoint[];
  subscriptionsByMonth: AnalyticsDataPoint[];
  payoutsByMonth: AnalyticsDataPoint[];
  totals: {
    jobPayments: number;
    subscriptions: number;
    payouts: number;
  };
};

export async function getPlatformAnalytics(): Promise<PlatformAnalytics> {
  await requireAdmin();

  // --- JOB PAYMENTS (money in from job owners) ---
  const jobPayments = await prisma.jobPayment.findMany({
    where: { status: "SUCCESS" },
    orderBy: { createdAt: "asc" },
    select: { amount: true, createdAt: true },
  });

  const jobPaymentsByMonthMap: Record<string, number> = {};
  jobPayments.forEach((jp) => {
    const month = formatToMonth(jp.createdAt);
    jobPaymentsByMonthMap[month] =
      (jobPaymentsByMonthMap[month] || 0) + parseAmount(jp.amount);
  });

  const jobPaymentsByMonth = Object.entries(jobPaymentsByMonthMap).map(
    ([month, value]) => ({ month, value })
  );

  // --- SUBSCRIPTIONS (money in from recurring plans) ---
  const subscriptions = await prisma.payment.findMany({
    where: { status: "SUCCESS" },
    orderBy: { createdAt: "asc" },
    select: { amount: true, createdAt: true },
  });

  const subscriptionsByMonthMap: Record<string, number> = {};
  subscriptions.forEach((sub) => {
    const month = formatToMonth(sub.createdAt);
    subscriptionsByMonthMap[month] =
      (subscriptionsByMonthMap[month] || 0) + parseAmount(sub.amount);
  });

  const subscriptionsByMonth = Object.entries(subscriptionsByMonthMap).map(
    ([month, value]) => ({ month, value })
  );

  // --- PAYOUTS (money out to workers) ---
  const payouts = await prisma.payout.findMany({
    where: { status: "PAID", withdrawal: true },
    orderBy: { createdAt: "asc" },
    select: { amount: true, createdAt: true },
  });

  const payoutsByMonthMap: Record<string, number> = {};
  payouts.forEach((po) => {
    const month = formatToMonth(po.createdAt);
    payoutsByMonthMap[month] =
      (payoutsByMonthMap[month] || 0) + parseAmount(po.amount);
  });

  const payoutsByMonth = Object.entries(payoutsByMonthMap).map(
    ([month, value]) => ({ month, value })
  );

  // --- Totals ---
  const totals = {
    jobPayments: jobPayments.reduce(
      (acc, jp) => acc + parseAmount(jp.amount),
      0
    ),
    subscriptions: subscriptions.reduce(
      (acc, sub) => acc + parseAmount(sub.amount),
      0
    ),
    payouts: payouts.reduce((acc, po) => acc + parseAmount(po.amount), 0),
  };

  return {
    jobPaymentsByMonth,
    subscriptionsByMonth,
    payoutsByMonth,
    totals,
  };
}
