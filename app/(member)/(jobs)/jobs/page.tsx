import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { SearchBar } from "../../_components/SearchBar";
import { JobsTable } from "./_components/JobsTable";
import { JobsCard } from "./_components/JobsCard";
import { getMyJobs } from "@/app/data/user/job/my-job/get-my-jobs";
import { DEFAULT_LIMIT } from "@/constants";
import { EmptyState } from "@/components/EmptyState";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My jobs - Grabcash",
};

type SearchParams = Promise<{
  query?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const jobsData = await getMyJobs({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="py-16 md:py-24 container space-y-6">
      <PageHeader title="My Jobs and Campaigns" />
      <SearchBar />
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
  );
};

export default page;
