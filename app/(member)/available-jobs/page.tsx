import React from "react";
import { PageHeader } from "../_components/PageHeader";
import { SearchBar } from "../_components/SearchBar";
import { AvailableJobs } from "./_components/AvailableJobs";

const page = () => {
  return (
    <div className="container py-12">
      <PageHeader title="Available Jobs and Campaigns" />
      <SearchBar />
      <AvailableJobs />
    </div>
  );
};

export default page;
