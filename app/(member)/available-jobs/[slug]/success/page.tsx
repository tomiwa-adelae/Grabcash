import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { Confetti } from "@/components/Confetti";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const page = () => {
  return (
    <div>
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
        <p>Job title: App store review</p>
        <p>Job ID: ES21089</p>
        <p>Job Category: App Promotion</p>
        <p>Status: Pending</p>
        <p>
          Reward: <NairaIcon />
          200.00
        </p>
        <p>Expected Approval Time: 7 days</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button
          size={"md"}
          variant={"outline"}
          className="border-primary hover:bg-primary/10 w-full"
        >
          View Task Status
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
