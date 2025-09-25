import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import { DEFAULT_LIMIT } from "@/constants";
import { AllJobsList } from "../../_components/AllJobsList";
import { getAllJobs } from "@/app/data/admin/job/get-all-jobs";
import { getSubscriptions } from "@/app/data/admin/subscription/get-subscriptions";
import { SubscriptionsList } from "./_components/SubscriptionsList";
import { EmptyState } from "@/components/EmptyState";

type SearchParams = Promise<{
  query?: string;
  status?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, status } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const subscriptionData = await getSubscriptions({
    query,
    status,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <PageHeader title="Subscriptions" />
        <p className="text-muted-foreground text-sm md:text-base">
          Manage the all subscriptions on Earnsphere
        </p>
      </div>
      {subscriptionData.subscriptions.length !== 0 && <SearchBar />}
      {subscriptionData.subscriptions.length !== 0 && (
        <SubscriptionsList
          initialSubscriptions={subscriptionData.subscriptions}
          initialHasNext={subscriptionData.pagination.hasNext}
          initialTotal={subscriptionData.pagination.total}
          query={query}
        />
      )}
      {subscriptionData.subscriptions.length === 0 && (
        <EmptyState
          title="No subscriptions found"
          description="Once users have made subscriptions, they would appear here"
        />
      )}
    </div>
  );
};

export default page;
