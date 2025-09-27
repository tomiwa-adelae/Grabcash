import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import { DEFAULT_LIMIT } from "@/constants";
import { SubmissionCards } from "./_components/SubmissionCards";
import { SubmissionsTable } from "./_components/SubmissionsTable";
import { SubmissionsCard } from "./_components/SubmissionsCard";
import {
  getApprovedApplicantsCount,
  getJobApplicants,
  getPendingApplicantsCount,
  getRejectedApplicantsCount,
  getTotalApplicantsCount,
} from "@/app/data/admin/job/submission/get-job-applicants";
import { getJobDetails } from "@/app/data/admin/job/get-job-details";

type Params = Promise<{
  slug: string;
}>;

const page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: any;
}) => {
  const { slug } = await params;
  const { query } = await searchParams;

  const applicants = await getJobApplicants({
    slug,
    query,
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const totalApplicantsCount = await getTotalApplicantsCount(slug);
  const rejectedApplicantsCount = await getRejectedApplicantsCount(slug);
  const approvedApplicantsCount = await getApprovedApplicantsCount(slug);
  const pendingApplicantsCount = await getPendingApplicantsCount(slug);
  const job = await getJobDetails(slug);

  return (
    <div className="space-y-6">
      <PageHeader title={`Submission for ${job.title}`} />
      {applicants.applicantsData.length !== 0 && !query && (
        <SubmissionCards
          total={totalApplicantsCount}
          rejected={rejectedApplicantsCount}
          approved={approvedApplicantsCount}
          pending={pendingApplicantsCount}
        />
      )}
      <SearchBar />
      {applicants.applicantsData.length !== 0 && (
        <>
          <SubmissionsTable
            applicants={applicants.applicantsData}
            slug={job.slug!}
            hasNext={applicants.pagination.hasNext}
            query={query}
            totalCount={applicants.pagination.total}
          />
          <SubmissionsCard
            applicants={applicants.applicantsData}
            slug={job.slug!}
            hasNext={applicants.pagination.hasNext}
            query={query}
          />
        </>
      )}
      {applicants.applicantsData.length === 0 && (
        <EmptyState
          title="No submissions yet."
          description="Workers who take the job will appear here once they submit"
          buttonSlug={`/admin/jobs/${slug}`}
          buttonText="Go back"
        />
      )}
    </div>
  );
};

export default page;
