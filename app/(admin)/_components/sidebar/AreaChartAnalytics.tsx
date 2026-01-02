"use client";

import { getPlatformAnalytics } from "@/app/data/admin/job/payment/get-revenue-analytics";
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
  const allMonths = getLastMonths(12);

  const merged = mergeAnalytics(
    allMonths,
    analytics.jobPaymentsByMonth,
    analytics.subscriptionsByMonth,
    analytics.payoutsByMonth
  );

  // Only keep months that have data
  const filtered = merged.filter(
    (m) => m.jobPayments || m.subscriptions || m.payouts
  );

  // Use all available months, but at least show 3
  const visibleData =
    filtered.length < 3
      ? merged.slice(-3) // show last 3 months even if empty
      : filtered;

  const data = visibleData.map((d) => ({
    ...d,
    month: new Date(d.month + "-01").toLocaleString("default", {
      month: "short",
    }),
  }));

  const latest = data[data.length - 1];
  const prev = data[data.length - 2] ?? {
    jobPayments: 0,
    subscriptions: 0,
    payouts: 0,
  };

  const jobPaymentsChange = calcPercentageChange(
    latest.jobPayments,
    prev.jobPayments
  );
  const subscriptionsChange = calcPercentageChange(
    latest.subscriptions,
    prev.subscriptions
  );
  const payoutsChange = calcPercentageChange(latest.payouts, prev.payouts);

  // Dynamic chart spacing
  const smallData = data.length <= 3;

  return (
    <>
      <ResponsiveContainer width="100%" height={smallData ? 250 : 350}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: smallData ? 50 : 20,
            left: smallData ? 20 : 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: smallData ? 12 : 14 }}
            interval={0}
            padding={
              smallData ? { left: 50, right: 50 } : { left: 10, right: 10 }
            }
          />
          <YAxis hide={smallData} />
          <Tooltip formatter={(v: number) => `₦${v.toLocaleString()}`} />
          <Legend />

          <Area
            type="monotone"
            dataKey="jobPayments"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.3}
            name="Job Payments"
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="subscriptions"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            name="Subscriptions"
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="payouts"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.3}
            name="Payouts"
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6">
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
