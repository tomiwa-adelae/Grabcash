import React from "react";
import { PreviewJob } from "./_components/PreviewJob";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Banner } from "@/components/Banner";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <Banner />
      <PreviewJob user={session?.user.name!} />
    </div>
  );
};

export default page;
