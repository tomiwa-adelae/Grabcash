import React from "react";
import { getAvailableJobs } from "@/app/data/job/get-available-jobs";
import { PageHeader } from "../../_components/PageHeader";
import { SearchBar } from "../../_components/SearchBar";
import { AvailableJobsTable } from "./_components/AvailableJobsTable";
import { AvailableJobsCard } from "./_components/AvailableJobsCard";
import { DEFAULT_LIMIT } from "@/constants";
import { EmptyState } from "@/components/EmptyState";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Available jobs - Grabcash",
};

type SearchParams = Promise<{
  query?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await searchParams;

  // Get initial data with pagination
  const jobsData = await getAvailableJobs({
    query,
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  return (
    <div className="py-16 md:py-24 container space-y-6">
      <PageHeader title="Available Jobs and Campaigns" />
      <SearchBar />
      {jobsData.jobs.length !== 0 && (
        <>
          <AvailableJobsTable
            initialJobs={jobsData.jobs}
            initialHasNext={jobsData.pagination.hasNext}
            initialTotal={jobsData.pagination.total}
            query={query}
          />
          <AvailableJobsCard
            initialJobs={jobsData.jobs}
            initialHasNext={jobsData.pagination.hasNext}
            initialTotal={jobsData.pagination.total}
            query={query}
          />
        </>
      )}
      {jobsData.jobs.length === 0 && (
        <EmptyState
          title="No jobs."
          description="There are no available jobs at the moment. They would appear here once"
        />
      )}
    </div>
  );
};

export default page;
