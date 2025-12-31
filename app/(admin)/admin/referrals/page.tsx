import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import { getReferralAudit } from "@/app/data/admin/referral/get-referral-audit";
import { ReferralAuditList } from "./_components/ReferralAuditList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoneyInput } from "@/lib/utils";

export default async function ReferralAuditPage({ searchParams }: any) {
  const { query } = await searchParams;
  const data = await getReferralAudit({ query });

  // 1. Calculate Stats
  const totalBonusPaid = data.payouts.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalCount = data.pagination.total;

  // Calculate "Today's" stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaysReferrals = data.payouts.filter(
    (p) => new Date(p.createdAt) >= today
  ).length;
  const todaysBonus = todaysReferrals * 500;

  // Calculate unique referrers (to see how many unique people are inviting)
  const uniqueReferrers = new Set(data.payouts.map((p) => p.userId)).size;

  const stats = [
    {
      title: "Total Bonuses",
      value: `₦${formatMoneyInput(totalBonusPaid)}`,
      description: "Total platform spend",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Successful Referrals",
      value: totalCount,
      description: "Total users invited",
      color: "bg-card text-card-foreground border",
    },
    {
      title: "Active Referrers",
      value: uniqueReferrers,
      description: "Unique users inviting",
      color: "bg-card text-card-foreground border",
    },
    {
      title: "Today's Growth",
      value: `+${todaysReferrals}`,
      description: `₦${formatMoneyInput(todaysBonus)} earned today`,
      color: "bg-green-500/10 text-green-600 border border-green-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <PageHeader title="Referral Audit" />
        <p className="text-muted-foreground text-sm">
          Monitor and verify referral bonus distributions.
        </p>
      </div>
      {/* 4-Box Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className={stat.color}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase opacity-70 font-bold">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-[10px] mt-1 opacity-80">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <SearchBar placeholder="Search by referrer name or code..." />

      <ReferralAuditList
        initialData={data.payouts}
        hasNext={data.pagination.hasNext}
      />
    </div>
  );
}
