import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getMySubmittedJob } from "@/app/data/user/job/submitted/get-my-submitted-job";
import { Confetti } from "@/components/Confetti";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { SubmissionApprovedBanner } from "@/components/SubmissionApprovedBanner";
import { SubmissionPendingBanner } from "@/components/SubmissionPendingBanner";
import { SubmissionRejectedBanner } from "@/components/SubmissionRejectedBanner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatMoneyInput, formattedStatus } from "@/lib/utils";
import Link from "next/link";

type Params = Promise<{
  id: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const job = await getMySubmittedJob(id);

  return (
    <div className="py-16 md:py-32 container space-y-6">
      <PageHeader
        title={`${job.Job.title} - ₦${formatMoneyInput(job.Job.reward)}`}
      />
      <p className="text-base text-muted-foreground mt-1.5">
        The job poster will review your submission. You’ll be notified when your
        task is approved, rejected, or needs resubmission.
      </p>
      {job.status === "APPROVED" && <SubmissionApprovedBanner />}
      {job.status === "REJECTED" && <SubmissionRejectedBanner />}
      {job.status === "PENDING" && <SubmissionPendingBanner />}
      <Separator className="my-6" />
      <div className="space-y-4 mt-6 text-base">
        <p>
          Application ID: {job.applicationID}
          <CopyToClipboard text={job.applicationID!} />
        </p>
        <p>Job title: {job.Job.title}</p>
        <p>
          Job ID: {job.Job.jobID}
          <CopyToClipboard text={job.Job.jobID!} />
        </p>
        <p>Job Category: {job.Job.category}</p>
        <p>Status: {formattedStatus[job.status]}</p>
        <p>
          Reward: <NairaIcon />
          {formatMoneyInput(job.Job.reward)}
        </p>
        <div>
          <p>General Reminder</p>
          <ul className="list-inside list-disc space-y-2 ml-2 md:ml-6 mt-2">
            <li>
              You don’t need to take any action right now, but you can cancel
              your submission if you choose to.
            </li>
            <li>You’ll be notified once the client makes a decision.</li>
            <li>
              If additional information is needed, the client may contact you.
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Button
          size={"md"}
          variant={"outline"}
          className="border-primary hover:bg-primary/10 w-full"
          asChild
        >
          <Link href={`/available-jobs/${job.Job.slug}`}>View Job details</Link>
        </Button>
        <Button size="md" asChild className="w-full">
          <Link href="/available-jobs">Browse more Jobs</Link>
        </Button>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
