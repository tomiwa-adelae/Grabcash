import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getJobDetails } from "@/app/data/user/job/get-job-details";
import { SubmissionCards } from "./_components/SubmissionCards";
import {
  getApprovedApplicantsCount,
  getJobApplicants,
  getPendingApplicantsCount,
  getRejectedApplicantsCount,
  getTotalApplicantsCount,
} from "@/app/data/user/job/submitted/get-job-applicants";
import { SubmissionsTable } from "./_components/SubmissionsTable";
import { EmptyState } from "@/components/EmptyState";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import { DEFAULT_LIMIT } from "@/constants";
import { SubmissionsCard } from "./_components/SubmissionsCard";

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
    <div className="py-16 md:py-32 container space-y-6">
      <PageHeader title={`Submission for ${job.title}`} />
      {applicants.applicantsData.length !== 0 && !query && (
        <SubmissionCards
          total={totalApplicantsCount}
          rejected={rejectedApplicantsCount}
          approved={approvedApplicantsCount}
          pending={pendingApplicantsCount}
        />
      )}
      {applicants.applicantsData.length !== 0 && <SearchBar />}
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
          description="Workers who take your job will appear here once they submit"
          buttonSlug={`/jobs/${slug}`}
          buttonText="Go back"
        />
      )}
    </div>
  );
};

export default page;
