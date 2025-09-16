import React from "react";
import { JobCard } from "./JobCard";
import { GetAvailableJobsType } from "@/app/data/job/get-available-jobs";

interface Props {
  jobs: GetAvailableJobsType[];
}

export const JobsCard = ({ jobs }: Props) => {
  return (
    <div className="sm:hidden grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
