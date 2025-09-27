import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
// import { getAllWithdrawals } from "@/app/data/admin/job/payment/get-all-withdrawals";
import { DEFAULT_LIMIT } from "@/constants";
import { WithdrawalsList } from "../../_components/WithdrawalsList";
import { getAllWithdrawals } from "@/app/data/admin/job/payment/get-all-withdrawals";
import { EmptyState } from "@/components/EmptyState";

type SearchParams = Promise<{
  query?: string;
  status?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, status } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const withdrawalsData = await getAllWithdrawals({
    query,
    status,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <PageHeader title="Withdrawals" />
        <p className="text-muted-foreground text-sm md:text-base">
          Here are all the withdrawals on the platform
        </p>
      </div>
      <SearchBar />
      {withdrawalsData.withdrawals.length !== 0 && (
        <WithdrawalsList
          initialWithdrawals={withdrawalsData.withdrawals}
          initialHasNext={withdrawalsData.pagination.hasNext}
          initialTotal={withdrawalsData.pagination.total}
          query={query}
        />
      )}
      {withdrawalsData.withdrawals.length === 0 && (
        <EmptyState
          title="No withdrawals yet"
          description="Once workers have withdrawn from their earnings, they would appear here"
        />
      )}
    </div>
  );
};

export default page;
