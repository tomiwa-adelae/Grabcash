import React from "react";
import { JobsTable } from "./JobsTable";
import { PaginationComponent } from "@/components/Pagination";
import { JobsCard } from "./JobsCard";
import { GetAvailableJobsType } from "@/app/data/job/get-available-jobs";

interface Props {
  jobs: GetAvailableJobsType[];
}

export const AvailableJobs = ({ jobs }: Props) => {
  return (
    <div className="mt-4">
      <JobsTable jobs={jobs} />
      <JobsCard jobs={jobs} />
      <PaginationComponent totalPages={10} />
    </div>
  );
};
