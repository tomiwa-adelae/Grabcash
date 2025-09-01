import { getUserDetails } from "@/app/data/user/get-user-details";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserDetails();

  if (user.subscription?.plan.name === "Basic")
    return redirect("/subscriptions");

  return <div>{children}</div>;
};

export default layout;
