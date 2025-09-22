import { DashboardCard } from "@/app/(admin)/_components/sidebar/dashboard-card";
import { RevenueChart } from "@/app/(admin)/_components/sidebar/revenue-chart";
import { QuickActions } from "@/app/(admin)/_components/sidebar/quick-actions";
import { SystemStatus } from "@/app/(admin)/_components/sidebar/system-status";
import { RecentActivity } from "@/app/(admin)/_components/sidebar/recent-activity";
import {
  IconActivityHeartbeat,
  IconClock,
  IconMoneybag,
  IconUsersGroup,
} from "@tabler/icons-react";
import { getActiveJobs } from "@/app/data/admin/job/get-active-jobs";
import { getTotalUsers } from "@/app/data/admin/user/get-total-users";
import { getPendingJobSubmissions } from "@/app/data/admin/job/submission/get-pending-job-submissions";
import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { RecentUsers } from "../../_components/RecentUsers";

export default async function page() {
  const activeJobs = await getActiveJobs();
  const totalUsers = await getTotalUsers();
  const pendingSubmissions = await getPendingJobSubmissions();

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
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Payout Requests",
      value: 40,
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
        <PageHeader title="Welcome Admin" />
        <p className="text-muted-foreground text-sm md:text-base">
          Here&apos;s what&apos;s happening with Earnsphere today.
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
          <RevenueChart />
          <RecentUsers />
        </div>

        {/* Sidebar Section */}
        <div className="space-y-4 sm:space-y-6">
          <QuickActions />
          <SystemStatus />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
