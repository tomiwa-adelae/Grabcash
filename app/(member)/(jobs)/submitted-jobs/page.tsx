import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { SearchBar } from "../../_components/SearchBar";
import { SubmittedJobsTable } from "./_components/SubmittedJobsTable";
import { SubmittedJobsCard } from "./_components/SubmittedJobsCard";
import { getMySubmittedJobs } from "@/app/data/user/job/submitted/get-my-submitted-jobs";
import { EmptyState } from "@/components/EmptyState";
import { DEFAULT_LIMIT } from "@/constants";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Submitted jobs - Grabcash",
};

type SearchParams = Promise<{
  query?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await searchParams;

  // Get initial data with pagination
  const jobsData = await getMySubmittedJobs({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Adjust this as needed
  });

  return (
    <div className="py-16 md:py-24 container space-y-6">
      <PageHeader title={`Submitted Jobs`} />
      <SearchBar />
      {jobsData.jobs.length !== 0 && (
        <>
          <SubmittedJobsTable
            initialJobs={jobsData.jobs}
            initialHasNext={jobsData.pagination.hasNext}
            initialTotal={jobsData.pagination.total}
            query={query}
          />
          <SubmittedJobsCard
            initialJobs={jobsData.jobs}
            initialHasNext={jobsData.pagination.hasNext}
            initialTotal={jobsData.pagination.total}
            query={query}
          />
        </>
      )}
      {jobsData.jobs.length === 0 && (
        <EmptyState
          title="No submitted jobs found"
          description="Once you've submitted a job, they would appear here"
        />
      )}
    </div>
  );
};

export default page;
