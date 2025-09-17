import React from "react";
import { GetAvailableJobsType } from "@/app/data/job/get-available-jobs";
import { NairaIcon } from "@/components/NairaIcon";
import Link from "next/link";
import { formatMoneyInput, formattedStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GetMyJobsType } from "@/app/data/user/job/get-my-jobs";
import { GetMySubmittedJobsType } from "@/app/data/user/job/submitted/get-my-submitted-jobs";
import { Badge } from "@/components/ui/badge";

interface Props {
  jobs: GetMySubmittedJobsType[];
}

export const JobsCard = ({ jobs }: Props) => {
  return (
    <div className="sm:hidden grid gap-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="relative mx-auto w-full rounded-lg border border-dashed border-zinc-300 px-4 sm:px-6 md:px-8 dark:border-zinc-800"
        >
          <div className="absolute top-4 left-0 -z-0 h-px w-full bg-zinc-400 sm:top-6 md:top-8 dark:bg-zinc-700" />
          <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 sm:bottom-6 md:bottom-8 dark:bg-zinc-700" />
          <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
            <div className="absolute z-0 grid h-full w-full items-center">
              <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
                <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
              </section>
            </div>
            <div className="relative z-20 mx-auto py-8">
              <div className="px-6">
                <Link
                  href={`/jobs/${job.Job.slug}`}
                  className="mb-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100 hover:underline hover:text-primary transition-all"
                >
                  {job.Job.title}{" "}
                  <Badge
                    variant={
                      job.status === "PENDING"
                        ? "pending"
                        : job.status === "APPROVED"
                          ? "default"
                          : job.status === "REJECTED"
                            ? "destructive"
                            : "default"
                    }
                  >
                    {formattedStatus[job.status]}
                  </Badge>
                </Link>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {job.Job.category}
                </p>
                <h4 className="font-medium text-lg mt-1.5 mb-2">
                  <NairaIcon />
                  {formatMoneyInput(job.Job.reward)}
                </h4>
                <Button asChild size="md">
                  <Link href={`/submitted-jobs/${job.id}`}>View job</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
