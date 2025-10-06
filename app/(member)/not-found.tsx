import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Metadata } from "next";
import { Header } from "./_components/Header";
import { PageHeader } from "./_components/PageHeader";
export const metadata: Metadata = {
  title: "404 - Grabcash",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <div className="relative">
        {session === null && <Header />}
        <div className="container space-y-6">
          <PageHeader title="404 - Page not Found" />
          <div className="space-y-2">
            <p className="text-muted-foreground text-base">
              It looks like you followed a broken link or mistyped a URL. Don’t
              worry, let’s get you back on track.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button asChild className="w-full" size="md">
              <Link href="/">Go back home</Link>
            </Button>
            <Button asChild className="w-full" size="md" variant={"secondary"}>
              <Link href="/available-jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
