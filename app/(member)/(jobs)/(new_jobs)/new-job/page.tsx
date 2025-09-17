import React from "react";
import { NewJobForm } from "./_components/NewJobForm";
import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getUserDetails } from "@/app/data/user/get-user-details";

const page = async () => {
  const user = await getUserDetails();

  return (
    <div>
      <PageHeader title="Post a New Job" />
      <p className="text-base text-muted-foreground mt-1.5">
        Posting a new job requires 5 credits.
      </p>
      <NewJobForm
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
      />
    </div>
  );
};

export default page;
