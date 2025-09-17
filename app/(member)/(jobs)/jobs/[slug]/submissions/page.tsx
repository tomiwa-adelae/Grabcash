import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getJobDetails } from "@/app/data/user/job/get-job-details";
import { SubmissionCards } from "./_components/SubmissionCards";
import { getJobApplicants } from "@/app/data/user/job/submitted/get-job-applicants";
import { SubmissionsTable } from "./_components/SubmissionsTable";
import { EmptyState } from "@/components/EmptyState";

type Params = Promise<{
  slug: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const applicants = await getJobApplicants(slug);
  const job = await getJobDetails(slug);

  return (
    <div className="py-16 md:py-32 container">
      <PageHeader title={`Submission for ${job.title}`} />
      <SubmissionCards total={applicants.length} />
      {applicants.length !== 0 && (
        <SubmissionsTable applicants={applicants} slug={job.slug!} />
      )}
      {applicants.length === 0 && (
        <EmptyState
          title="No submissions yet."
          description="Workers who take your job will appear here once they submit"
          buttonSlug="/jobs"
          buttonText="Go back"
        />
      )}
    </div>
  );
};

export default page;
