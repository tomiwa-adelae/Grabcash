import React from "react";
import { ChangePasswordForm } from "../_components/ChangePasswordForm";
import { getUserDetails } from "@/app/data/user/get-user-details";

const page = async () => {
  const user = await getUserDetails();
  return (
    <div className="py-16 md:py-24 container">
      <div className="text-center">
        <h1 className="text-center text-4xl font-semibold lg:text-5xl">
          Change Password
        </h1>
        <p className="mt-2.5 text-muted-foreground">
          Create a strong new password for your grabcash account.
        </p>
      </div>
      <ChangePasswordForm
        password={user.accounts[user.accounts.length - 1].password}
      />
    </div>
  );
};

export default page;
