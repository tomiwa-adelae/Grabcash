"use client";
import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { EMAIL_ADDRESS } from "@/constants";
import { env } from "@/lib/env";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConfirmPostingModal } from "../../_components/ConfirmPostingModal";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { JobCTAs } from "@/app/(member)/(jobs)/available-jobs/[slug]/_components/JobCTAs";
import { ProofForm } from "@/app/(member)/(jobs)/available-jobs/[slug]/_components/ProofForm";

export const PreviewJob = ({ user }: { user: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("jobPreview");
    if (saved) {
      setJob(JSON.parse(saved));
    }
  }, []);

  if (!job) {
    return <Loader text="Loading details..." />;
  }

  return (
    <div className="mt-6">
      <PageHeader title="Job Details" />
      <div className="space-y-4 mt-4">
        <p className="text-base">
          Job title: <span className="text-muted-foreground">{job.title}</span>
        </p>
        <p className="text-base">
          Job ID: <span className="text-muted-foreground">{job.id}</span>
        </p>
        <p className="text-base">
          Job Description:
          <span className="text-muted-foreground">
            <RenderDescription json={job?.description} />
          </span>
        </p>
        <p className="text-base">
          Job Type:{" "}
          <span className="text-primary hover:underline">
            {job.type
              ?.toLowerCase()
              .replace(/\b\w/g, (l: any) => l.toUpperCase())}
          </span>
        </p>
        <p className="text-base">
          Job Category:{" "}
          <span className="text-muted-foreground">{job.category}</span>
        </p>
        <p className="text-base">
          Job Poster:{" "}
          <span className="text-blue-400 underline hover:text-primary">
            {user}
          </span>
        </p>
        <p className="text-base">
          Job Link:{" "}
          <span className="text-blue-400 hover:underline hover:text-primary">
            <a
              href={`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/available-jobs/${job.slug}`}
              target={"_blank"}
            >{`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/available-jobs/${job.slug}`}</a>
            <CopyToClipboard
              text={`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/available-jobs/${job.slug}`}
            />
          </span>
        </p>
        <p className="text-base">
          Reward:{" "}
          <span className="text-muted-foreground">
            <NairaIcon />
            {formatMoneyInput(job.reward)}
          </span>
        </p>
        <p className="text-base">
          Time Estimate:{" "}
          <span className="text-muted-foreground">
            {job.estimatedTime} {job.estimatedTimeUnit}
            {job.estimatedTime !== "1" && "s"}
          </span>
        </p>
        <p className="text-base">
          Available Slots:{" "}
          <span className="text-muted-foreground">49 remaining</span>
        </p>
        <p className="text-base">
          Status: <span className="text-primary">Open</span>
        </p>
        <p className="text-base">
          Submission Deadline: {formatDate(job.deadline)}
        </p>
      </div>
      <div className="mt-6">
        <p className="text-base text-muted-foreground">
          Clicking on Start Job indicates your interest in the task and you will
          be counted in as an applicant.{" "}
        </p>
        <JobCTAs />
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-xl md:text-2xl">Instructions</h2>
        <RenderDescription json={job.instructions} />
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-xl md:text-2xl">
          Proof of Completion
        </h2>
        <p className="text-base text-muted-foreground">You must upload:</p>
        <RenderDescription json={job.proofOfCompletion} />
        <ProofForm />
      </div>
      <div className="mt-10 space-y-2.5 text-base">
        <p>Please follow instructions exactly as stated.</p>
        <p>
          Only complete the task as described—no extras. Submit the required
          proof once done. Job posters will review your submissions within 7
          days. Wrong or incomplete entries affect your rating and may lead to
          blacklisting.
        </p>
        <p>
          Respect all job posters and fellow users. If you notice suspicious
          activity or are asked to do more than what’s listed, report it
          immediately with the job ID to:{" "}
          <a
            className="text-primary hover:underline"
            href={`mailto:${EMAIL_ADDRESS}`}
          >
            {EMAIL_ADDRESS}
          </a>
        </p>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-end gap-4">
        <Button
          size="md"
          variant={"outline"}
          className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
          onClick={() => window.close()}
        >
          Edit details
        </Button>
        <Button
          onClick={() => setOpenModal(true)}
          size="md"
          className="w-full sm:w-auto"
        >
          Post Job Now
        </Button>
      </div>
      {openModal && (
        <ConfirmPostingModal
          open={openModal}
          closeModal={() => {
            setOpenModal(false);
          }}
          data={job}
        />
      )}
    </div>
  );
};
