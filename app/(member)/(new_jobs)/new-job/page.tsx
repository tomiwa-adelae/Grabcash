import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { NewJobForm } from "./_components/NewJobForm";

const page = () => {
  return (
    <div>
      <PageHeader title="Post a New Job" />
      <p className="text-base text-muted-foreground mt-1.5">
        Posting a new job requires 5 credits.
      </p>
      <NewJobForm />
    </div>
  );
};

export default page;
