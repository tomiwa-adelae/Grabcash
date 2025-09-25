import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import { getAllSubmissions } from "@/app/data/admin/submission/get-all-submissions";
import { DEFAULT_LIMIT } from "@/constants";
import { AllSubmissionsList } from "../../_components/AllSubmissionsList";
import { EmptyState } from "@/components/EmptyState";

type SearchParams = Promise<{
  query?: string;
  status?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, status } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const submissionData = await getAllSubmissions({
    query,
    status,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <PageHeader title="All submissions" />
        <p className="text-muted-foreground text-sm md:text-base">
          Manage the all submissions on Earnsphere
        </p>
      </div>
      {submissionData.submissions.length !== 0 && <SearchBar />}
      {submissionData.submissions.length !== 0 && (
        <AllSubmissionsList
          initialSubmissions={submissionData.submissions}
          initialHasNext={submissionData.pagination.hasNext}
          initialTotal={submissionData.pagination.total}
          query={query}
        />
      )}
      {submissionData.submissions.length === 0 && (
        <EmptyState
          title="No submissions found"
          description="Once workers have submitted a job, they would appear here"
        />
      )}
    </div>
  );
};

export default page;
