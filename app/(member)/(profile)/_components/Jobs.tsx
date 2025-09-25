import { getMyJobs } from "@/app/data/user/job/my-job/get-my-jobs";
import { DEFAULT_LIMIT } from "@/constants";
import { SearchBar } from "../../_components/SearchBar";
import { JobsTable } from "../../(jobs)/jobs/_components/JobsTable";
import { JobsCard } from "../../(jobs)/jobs/_components/JobsCard";
import { EmptyState } from "@/components/EmptyState";

interface Props {
  query: string;
}

export const Jobs = async ({ query }: Props) => {
  // Get initial data - change limit back to 10 for production
  const jobsData = await getMyJobs({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });
  return (
    <div className="bg-muted py-8 rounded-lg">
      <div className="container">
        {jobsData.jobs.length !== 0 && <SearchBar />}
        {jobsData.jobs.length !== 0 && (
          <>
            <JobsTable
              initialJobs={jobsData.jobs}
              initialHasNext={jobsData.pagination.hasNext}
              initialTotal={jobsData.pagination.total}
              query={query}
            />
            <JobsCard
              initialJobs={jobsData.jobs}
              initialHasNext={jobsData.pagination.hasNext}
              initialTotal={jobsData.pagination.total}
              query={query}
            />
          </>
        )}
        {jobsData.jobs.length === 0 && (
          <EmptyState
            title="No jobs found"
            description="Once you've created a job, they would appear here"
            buttonSlug="/new-job"
            buttonText="Create a job"
          />
        )}
      </div>
    </div>
  );
};
