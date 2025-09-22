import React from "react";
import { PreviewJob } from "./_components/PreviewJob";
import { Banner } from "@/components/Banner";
import { getUserDetails } from "@/app/data/user/get-user-details";

const page = async () => {
  const user = await getUserDetails();

  return (
    <div>
      <Banner text="Here’s how your job will appear to potential applicants. Review all details before posting to ensure accuracy." />
      <PreviewJob
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
      />
    </div>
  );
};

export default page;
