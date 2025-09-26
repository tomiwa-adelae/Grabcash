import { DashboardCard } from "@/app/(admin)/_components/sidebar/dashboard-card";
import { SystemStatus } from "@/app/(admin)/_components/sidebar/system-status";
import { RecentActivity } from "@/app/(admin)/_components/sidebar/recent-activity";
import { getActiveJobs } from "@/app/data/admin/job/get-active-jobs";
import { getTotalUsers } from "@/app/data/admin/user/get-total-users";
import { getPendingJobSubmissions } from "@/app/data/admin/job/submission/get-pending-job-submissions";
import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { RecentUsers } from "../../_components/RecentUsers";
import { formatMoneyInput } from "@/lib/utils";
import { getTotalPlatformEarnings } from "@/app/data/admin/job/payment/get-total-platform-earnings";
import { getPlatformAnalytics } from "@/app/data/admin/job/payment/get-revenue-analytics";
import { PlatformRevenueChart } from "../../_components/sidebar/revenue-chart";
import { getAllActivities } from "@/app/data/admin/activity/get-all-activities";
import { DEFAULT_LIMIT } from "@/constants";
import { getTopMembers } from "@/app/data/user/get-top-members";
import { TopMembersList } from "../../_components/TopMembersList";

type SearchParams = Promise<{
  query?: string;
  status?: string;
}>;

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query, status } = await searchParams;

  const activeJobs = await getActiveJobs();
  const totalUsers = await getTotalUsers();
  const pendingSubmissions = await getPendingJobSubmissions();
  const totalPlatformEarnings = await getTotalPlatformEarnings();

  const totalPayments = await getPlatformAnalytics();

  // Get initial data - change limit back to 10 for production
  const activitiesData = await getAllActivities({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  // Get initial data - change limit back to 10 for production
  const membersData = await getTopMembers({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  // Dashboard stats data
  const stats = [
    {
      title: "Total Users",
      value: totalUsers.users.length,
      change: "+12%",
      changeType: "positive" as const,
      icon: "users", // pass string, not component
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Jobs",
      value: activeJobs.jobs.length,
      change: "+8.2%",
      changeType: "positive" as const,
      icon: "activity",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Pending Submissions",
      value: pendingSubmissions.jobs.length,
      change: "+15%",
      changeType: "positive" as const,
      icon: "clock",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
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
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <PageHeader title="Welcome Admin" />
        <p className="text-muted-foreground text-sm md:text-base">
          Here&apos;s what&apos;s happening with grabcash today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <DashboardCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        {/* Charts Section */}
        <div className="space-y-4 sm:space-y-6 xl:col-span-2">
          <PlatformRevenueChart analytics={totalPayments} />
          {/* <PlatformRevenueChart analytics={sampleAnalytics} /> */}
          <RecentUsers />
        </div>

        {/* Sidebar Section */}
        <div className="space-y-4 sm:space-y-6">
          {/* <QuickActions /> */}
          <SystemStatus />
          <RecentActivity
            initialActivities={activitiesData.activities}
            initialHasNext={activitiesData.pagination.hasNext}
            initialTotal={activitiesData.pagination.total}
            query={query}
          />
          <TopMembersList
            initialMembers={membersData.members}
            initialHasNext={membersData.pagination.hasNext}
            initialTotal={membersData.pagination.total}
            query={query}
          />
        </div>
      </div>
    </div>
  );
}
