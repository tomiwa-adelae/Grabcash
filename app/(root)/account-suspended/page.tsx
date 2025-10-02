import React from "react";
import { PageHeader } from "../../(member)/_components/PageHeader";
import { env } from "@/lib/env";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Account suspended - Grabcash",
};

const page = () => {
  return (
    <div className="py-16 md:py-24 container space-y-6">
      <PageHeader title="Your account has been suspended" />
      <div className="space-y-2">
        <p className="text-muted-foreground text-base">
          We've detected a violation of Grabcash's policies, and your account
          has been temporarily or permanently suspended. If you believe this was
          a mistake, you can appeal the suspension. Contact our support team at{" "}
          <a
            href={`mailto:${env.SUPPORT_EMAIL_ADDRESS}`}
            className="hover:underline font-medium text-primary"
          >
            {env.SUPPORT_EMAIL_ADDRESS}
          </a>{" "}
          or via the Help Center.
        </p>
        <div>
          <p className="text-base">While suspended, you won't be able to:</p>
          <ul className="list-inside list-disc space-y-2 ml-2 md:ml-6 mt-2">
            <li>Withdraw earnings</li>
            <li>Apply to jobs</li>
            <li>Create new jobs</li>
            <li>Upgrade your subscription</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button asChild className="w-full" size="md">
          <Link href="/privacy-policy">View Policy Guidelines</Link>
        </Button>
        <Button asChild className="w-full" size="md" variant={"secondary"}>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
