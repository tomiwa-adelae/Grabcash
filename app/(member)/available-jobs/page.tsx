import React from "react";
import { PageHeader } from "../_components/PageHeader";
import { SearchBar } from "../_components/SearchBar";
import { AvailableJobs } from "./_components/AvailableJobs";
import { getAvailableJobs } from "@/app/data/job/get-available-jobs";

const page = async () => {
  const jobs = await getAvailableJobs();
  return (
    <div>
      <PageHeader title="Available Jobs and Campaigns" />
      <SearchBar />
      <AvailableJobs jobs={jobs} />
    </div>
  );
};

export default page;
