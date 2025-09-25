import React from "react";
import { PreviewJob } from "./_components/PreviewJob";
import { getUserDetails } from "@/app/data/user/get-user-details";

const page = async () => {
  const user = await getUserDetails();

  return (
    <div>
      <PreviewJob
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
      />
    </div>
  );
};

export default page;
