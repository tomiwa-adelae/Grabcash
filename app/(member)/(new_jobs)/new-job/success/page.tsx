import { PageHeader } from "@/app/(member)/_components/PageHeader";
import {
  getJobDetails,
  GetJobDetailsType,
} from "@/app/data/job/get-job-details";
import { Confetti } from "@/components/Confetti";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const { slug } = await searchParams;

  const job: GetJobDetailsType = await getJobDetails(slug);

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
          <p>Job title: {job.title}</p>
          <p>Job ID: {job.id}</p>
          <p>Category: {job.category}</p>
          <p>
            Reward: <NairaIcon />
            {formatMoneyInput(job.reward)}
          </p>
          <p>Deadline: {formatDate(job.deadline)}</p>
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
            <Link href={`/available-jobs/${job.slug}`}>View Job Listing</Link>
          </Button>
        </div>
        <Button className="mt-4 w-full" size="md" asChild variant={"black"}>
          <Link href="/new-job">Post Another Job</Link>
        </Button>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
