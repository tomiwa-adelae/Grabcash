import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getMySubmittedJob } from "@/app/data/user/job/submitted/get-my-submitted-job";
import { Confetti } from "@/components/Confetti";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatMoneyInput, formattedStatus } from "@/lib/utils";
import Link from "next/link";

const page = async ({ searchParams }: { searchParams: any }) => {
  const { id } = await searchParams;

  const job = await getMySubmittedJob(id);

  return (
    <div className="py-16 md:py-32 container">
      <PageHeader title="Nice work! You’ve just submitted your tasks🎉" />
      <p className="text-base text-muted-foreground mt-1.5">
        Thank you for using Earnsphere! Keep going — the more tasks you
        complete, the more you earn.
      </p>
      <Separator className="my-6" />

      <h3 className="font-medium text-lg">Task Summary</h3>
      <p className="mt-2 text-base text-muted-foreground">
        The job poster will review your submission. You’ll be notified when your
        task is approved, rejected, or needs resubmission.
      </p>
      <div className="space-y-4 mt-6 text-base">
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
        <p>Expected Approval Time: 7 days</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button
          size={"md"}
          variant={"outline"}
          className="border-primary hover:bg-primary/10 w-full"
          asChild
        >
          <Link href={`/submitted-jobs/${job.id}`}>View Task Status</Link>
        </Button>
        <Button size="md" asChild className="w-full">
          <Link href="/available-jobs">Return to Jobs</Link>
        </Button>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
