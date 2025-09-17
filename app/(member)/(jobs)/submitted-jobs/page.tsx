import React from "react";
import { getAvailableJobs } from "@/app/data/job/get-available-jobs";
import { PageHeader } from "../../_components/PageHeader";
import { SearchBar } from "../../_components/SearchBar";
import { PaginationComponent } from "@/components/Pagination";
import { JobsTable } from "./_components/JobsTable";
import { JobsCard } from "./_components/JobsCard";
import { getMyJobs } from "@/app/data/user/job/get-my-jobs";
import { getMySubmittedJobs } from "@/app/data/user/job/submitted/get-my-submitted-jobs";

const page = async () => {
  const jobs = await getMySubmittedJobs();
  return (
    <div className="py-16 md:py-32 container">
      <PageHeader title="Finished Jobs" />
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
