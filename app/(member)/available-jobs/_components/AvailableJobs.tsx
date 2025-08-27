import React from "react";
import JobsTable from "./JobsTable";
import { PaginationComponent } from "@/components/Pagination";
import { JobsCard } from "./JobsCard";

export const AvailableJobs = () => {
  return (
    <div className="mt-4">
      <JobsTable />
      <JobsCard />
      <PaginationComponent totalPages={10} />
    </div>
  );
};
