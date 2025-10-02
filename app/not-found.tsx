import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHeader } from "./(member)/_components/PageHeader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Header } from "./(root)/_components/Header";
import { Header as MemberHeader } from "./(member)/_components/Header";
import { Footer } from "./(root)/_components/Footer";
import { PageGradient } from "@/components/PageGradient";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "404 - Grabcash",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <div className="pt-20 relative">
        <PageGradient />
        {session === null ? <Header /> : <MemberHeader />}
        <div className="py-16 md:py-24 container space-y-6">
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
      <Footer />
    </div>
  );
};

export default page;
