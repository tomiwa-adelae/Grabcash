import React from "react";
import { getAvailableJobs } from "@/app/data/job/get-available-jobs";
import { PageHeader } from "../../_components/PageHeader";
import { SearchBar } from "../../_components/SearchBar";
import { JobsTable } from "./_components/JobsTable";
import { JobsCard } from "./_components/JobsCard";
import { PaginationComponent } from "@/components/Pagination";

const page = async () => {
  const jobs = await getAvailableJobs();
  return (
    <div className="py-16 md:py-32 container">
      <PageHeader title="Available Jobs and Campaigns" />
      <SearchBar />
      <div className="mt-4">
        <JobsTable jobs={jobs} />
        <JobsCard jobs={jobs} />
        <PaginationComponent totalPages={10} />
      </div>
    </div>
  );
};

export default page;
