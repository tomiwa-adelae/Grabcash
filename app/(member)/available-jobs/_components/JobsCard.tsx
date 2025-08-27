import React from "react";
import { JobCard } from "./JobCard";

export const JobsCard = () => {
  return (
    <div className="sm:hidden grid gap-4">
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
    </div>
  );
};
