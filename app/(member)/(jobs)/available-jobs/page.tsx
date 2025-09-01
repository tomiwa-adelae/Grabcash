import React from "react";
import { AvailableJobs } from "./_components/AvailableJobs";
import { getAvailableJobs } from "@/app/data/job/get-available-jobs";
import { PageHeader } from "../../_components/PageHeader";
import { SearchBar } from "../../_components/SearchBar";

const page = async () => {
  const jobs = await getAvailableJobs();
  return (
    <div className="py-12 container">
      <PageHeader title="Available Jobs and Campaigns" />
      <SearchBar />
      <AvailableJobs jobs={jobs} />
    </div>
  );
};

export default page;
