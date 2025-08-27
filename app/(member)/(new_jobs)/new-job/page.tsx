import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { NewJobForm } from "./_components/NewJobForm";

const page = () => {
  return (
    <div className="py-12">
      <div className="container">
        <PageHeader title="Post a New Job" />
        <p className="text-base text-muted-foreground mt-1.5">
          Posting a new job requires 5 credits.
        </p>
        <NewJobForm />
      </div>
    </div>
  );
};

export default page;
