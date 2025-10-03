import React from "react";
import { PageHeader } from "../../(member)/_components/PageHeader";
import { env } from "@/lib/env";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Subscription Expired - Grabcash",
};

const page = () => {
  return (
    <div className="py-16 md:py-24 container space-y-6">
      <PageHeader title="Your subscription has expired" />
      <div className="space-y-2">
        <p className="text-muted-foreground text-base">
          Your Grabcash premium benefits are no longer active. You’ve lost
          access to unlimited job postings, higher earning limits, and exclusive
          opportunities. Don't miss out! Renew now to unlock your premium
          features again.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button asChild className="w-full" size="md">
          <Link href="/subscriptions">Renew Subscription</Link>
        </Button>
        <Button asChild className="w-full" size="md" variant={"secondary"}>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
