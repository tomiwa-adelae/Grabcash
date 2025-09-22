import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import { DEFAULT_LIMIT } from "@/constants";
import { ClosedJobsList } from "@/app/(admin)/_components/ClosedJobsList";
import { getClosedJobs } from "@/app/data/admin/job/get-closed-jobs";

type SearchParams = Promise<{
  query?: string;
  status?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, status } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const jobData = await getClosedJobs({
    query,
    status,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <PageHeader title="Closed jobs" />
        <p className="text-muted-foreground text-sm md:text-base">
          Manage the closed jobs on Earnsphere
        </p>
      </div>
      <SearchBar />
      <ClosedJobsList
        initialJobs={jobData.jobs}
        initialHasNext={jobData.pagination.hasNext}
        initialTotal={jobData.pagination.total}
        query={query}
      />
    </div>
  );
};

export default page;
