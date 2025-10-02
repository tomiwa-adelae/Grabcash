import React from "react";
import { PageHeader } from "../../(member)/_components/PageHeader";
import { env } from "@/lib/env";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateAccountButton } from "./_components/CreateAccountButton";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Account deleted - Grabcash",
};

const page = () => {
  return (
    <div className="py-16 md:py-24 container space-y-4">
      <PageHeader title="Your account has been deleted" />
      <div className="space-y-2">
        <p className="text-muted-foreground text-base">
          This account has been permanently removed by an administrator. You
          will no longer be able to log in, access your data, or perform actions
          with this account. If you believe this was a mistake or want more
          details, please reach out to our support team at{" "}
          <a
            href={`mailto:${env.SUPPORT_EMAIL_ADDRESS}`}
            className="hover:underline font-medium text-primary"
          >
            {env.SUPPORT_EMAIL_ADDRESS}
          </a>{" "}
          or via the Help Center.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CreateAccountButton />
        <Button asChild className="w-full" size="md" variant={"secondary"}>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
