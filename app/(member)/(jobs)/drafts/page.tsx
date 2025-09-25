import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { DEFAULT_LIMIT } from "@/constants";
import { getDraftedJobs } from "@/app/data/user/job/draft/get-drafted-jobs";
import { DraftedJobsTable } from "./_components/DraftedJobTable";
import { EmptyState } from "@/components/EmptyState";
import { DraftedJobsCard } from "./_components/DraftedJobsCard";
import { SearchBar } from "../../_components/SearchBar";

type SearchParams = Promise<{
  query?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const jobsData = await getDraftedJobs({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="py-16 md:py-32 container space-y-6">
      <PageHeader title="My Drafts" />
      {jobsData.jobs.length !== 0 && <SearchBar />}
      {jobsData.jobs.length !== 0 && (
        <>
          <DraftedJobsTable
            initialJobs={jobsData.jobs}
            initialHasNext={jobsData.pagination.hasNext}
            initialTotal={jobsData.pagination.total}
            query={query}
          />
          <DraftedJobsCard
            jobs={jobsData.jobs}
            hasNext={jobsData.pagination.hasNext}
            query={query}
          />
        </>
      )}
      {jobsData.jobs.length === 0 && (
        <EmptyState
          title="No jobs found"
          description="Once you've drafted a job, they would appear here"
        />
      )}
    </div>
  );
};

export default page;
