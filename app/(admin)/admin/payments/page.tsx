import { PageHeader } from "@/app/(member)/_components/PageHeader";
import React from "react";
import { PaymentCard } from "./_components/PaymentCard";
import { getTotalDeposits } from "@/app/data/admin/job/payment/get-total-deposit";
import { formatMoneyInput } from "@/lib/utils";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
// import { getAllPayments } from "@/app/data/admin/job/payment/get-all-payments";
import { DEFAULT_LIMIT } from "@/constants";
import { PaymentsList } from "../../_components/PaymentsList";
import { getTotalPlatformEarnings } from "@/app/data/admin/job/payment/get-total-platform-earnings";
import { getTotalWithdrawals } from "@/app/data/admin/job/payment/get-total-withdrawals";
import { getAllPayments } from "@/app/data/admin/job/payment/get-all-payments";
import { getTotalTransactionsMade } from "@/app/data/admin/job/payment/get-total-transactions-made";

type SearchParams = Promise<{
  query?: string;
  status?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, status } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const paymentData = await getAllPayments({
    query,
    status,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  const totalDeposits = await getTotalDeposits();
  const totalTransactionsMade = await getTotalTransactionsMade();
  const totalPlatformEarnings = await getTotalPlatformEarnings();
  const totalWithdrawals = await getTotalWithdrawals();

  // Dashboard stats data
  const stats = [
    {
      title: "Total Deposits",
      value: `₦${formatMoneyInput(totalDeposits)}`,
      change: "+12%",
      changeType: "positive" as const,
      icon: "money", // pass string, not component
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Withdrawal",
      value: `₦${formatMoneyInput(totalWithdrawals)}`,
      change: "+8.2%",
      changeType: "positive" as const,
      icon: "activity",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Platform Earnings",
      value: `₦${formatMoneyInput(totalPlatformEarnings)}`,
      change: "+15%",
      changeType: "positive" as const,
      icon: "clock",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Transactions Made",
      value: `${totalTransactionsMade}`,
      change: "-2.4%",
      changeType: "negative" as const,
      icon: "money",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <PageHeader title="Job Payments" />
        <p className="text-muted-foreground text-sm md:text-base">
          Here are all the transactions on the platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <PaymentCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>
      <SearchBar />
      <PaymentsList
        initialPayments={paymentData.payments}
        initialHasNext={paymentData.pagination.hasNext}
        initialTotal={paymentData.pagination.total}
        query={query}
      />
    </div>
  );
};

export default page;
