import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getJobDetails } from "@/app/data/user/job/get-job-details";
import React from "react";
import { EditJobForm } from "./_components/EditJobForm";
import { getUserDetails } from "@/app/data/user/get-user-details";

type Params = Promise<{
  slug: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const job = await getJobDetails(slug);

  const user = await getUserDetails();

  return (
    <div className="container py-16 md:py-32">
      <PageHeader title={`Edit - ${job.title}`} />
      <EditJobForm
        name={user.name}
        email={user.email}
        job={job}
        phoneNumber={user.phoneNumber}
      />
    </div>
  );
};

export default page;
