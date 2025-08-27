import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { Confetti } from "@/components/Confetti";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="py-12">
      <div className="container">
        <PageHeader title="Your job is now live on Earnsphere🎉" />
        <p className="text-base text-muted-foreground mt-1.5">
          We’ve notified relevant freelancers and partners.
        </p>
        <Separator className="my-6" />
        <h3 className="font-medium text-lg">Job Summary</h3>
        <div className="space-y-4 mt-6 text-base">
          <p>Job title: App store review</p>
          <p>Job ID: ES21089</p>
          <p>Category: App Promotion</p>
          <p>
            Reward: <NairaIcon />
            200.00
          </p>
          <p>Deadline: 23rd November, 2025</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            size={"md"}
            variant={"outline"}
            className="border-primary hover:bg-primary/10 w-full"
          >
            Track Applicants
          </Button>
          <Button size="md" asChild className="w-full">
            <Link href="/available-jobs">View Job Listing</Link>
          </Button>
        </div>
        <Button className="mt-4 w-full" size="md" variant={"black"}>
          <Link href="/new-job">Post Another Job</Link>
        </Button>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
