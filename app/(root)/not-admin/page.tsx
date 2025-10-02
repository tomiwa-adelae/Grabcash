import React from "react";
import { PageHeader } from "../../(member)/_components/PageHeader";
import { env } from "@/lib/env";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Access restricted - Grabcash",
};

const page = () => {
  return (
    <div className="py-16 md:py-24 container space-y-6">
      <PageHeader title="Access Restricted" />
      <div className="space-y-2">
        <p className="text-muted-foreground text-base">
          You don’t have permission to access this page. This section is
          reserved for Grabcash administrators. If you believe this is an error
          or you require admin access, please contact support team at{" "}
          <a
            href={`mailto:${env.SUPPORT_EMAIL_ADDRESS}`}
            className="hover:underline font-medium text-primary"
          >
            {env.SUPPORT_EMAIL_ADDRESS}
          </a>
          .
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button asChild className="w-full" size="md">
          <Link href="/">Go back home</Link>
        </Button>
        <Button asChild className="w-full" size="md" variant={"secondary"}>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
