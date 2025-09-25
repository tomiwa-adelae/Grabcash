"use client";

import { getPlatformAnalytics } from "@/app/data/admin/job/payment/get-revenue-analytics";
import { memo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { getLastMonths, mergeAnalytics } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface Props {
  analytics: Awaited<ReturnType<typeof getPlatformAnalytics>>;
}

function calcPercentageChange(current: number, prev: number) {
  if (prev === 0) return current > 0 ? 100 : 0;
  return ((current - prev) / prev) * 100;
}

export const AreaChartAnalytics = ({ analytics }: Props) => {
  const last6Months = getLastMonths(3);

  const merged = mergeAnalytics(
    last6Months,
    analytics.jobPaymentsByMonth,
    analytics.subscriptionsByMonth,
    analytics.payoutsByMonth
  );

  const data = merged.map((d) => ({
    ...d,
    month: new Date(d.month + "-01").toLocaleString("default", {
      month: "short",
    }),
  }));

  const latest = merged[merged.length - 1];
  const prev = merged[merged.length - 2];

  const jobPaymentsChange = calcPercentageChange(
    latest.jobPayments,
    prev?.jobPayments || 0
  );
  const subscriptionsChange = calcPercentageChange(
    latest.subscriptions,
    prev?.subscriptions || 0
  );
  const payoutsChange = calcPercentageChange(
    latest.payouts,
    prev?.payouts || 0
  );

  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" />
          <Tooltip
            formatter={(value: number) => `₦${value.toLocaleString()}`}
          />
          <Legend />

          {/* Multiple areas with transparency */}
          <Area
            type="monotone"
            dataKey="jobPayments"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.3}
            name="Job Payments"
          />
          <Area
            type="monotone"
            dataKey="subscriptions"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            name="Subscriptions"
          />
          <Area
            type="monotone"
            dataKey="payouts"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.3}
            name="Payouts (outflow)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Totals with % change */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StatCard
          title="Total Job Payments"
          value={analytics.totals.jobPayments}
          change={jobPaymentsChange}
          color="green"
        />
        <StatCard
          title="Total Subscriptions"
          value={analytics.totals.subscriptions}
          change={subscriptionsChange}
          color="blue"
        />
        <StatCard
          title="Total Payouts"
          value={analytics.totals.payouts}
          change={payoutsChange}
          color="red"
        />
      </div>
    </>
  );
};

function StatCard({
  title,
  value,
  change,
  color,
}: {
  title: string;
  value: number;
  change: number;
  color: "green" | "blue" | "red";
}) {
  const isIncrease = change >= 0;
  const Icon = isIncrease ? ArrowUpIcon : ArrowDownIcon;
  const colorClasses =
    color === "green"
      ? "text-green-500"
      : color === "blue"
        ? "text-blue-500"
        : "text-red-500";

  return (
    <div className="text-center">
      <div className={`text-lg md:text-2xl font-semibold ${colorClasses}`}>
        ₦{value.toLocaleString()}
      </div>
      <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
      <div
        className={`flex items-center justify-center text-xs md:text-sm font-medium mt-1 ${
          isIncrease ? "text-green-500" : "text-red-500"
        }`}
      >
        <Icon className="w-4 h-4 mr-1" />
        {Math.abs(change).toFixed(1)}%
      </div>
    </div>
  );
}
