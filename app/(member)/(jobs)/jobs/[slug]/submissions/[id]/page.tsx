import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getSubmittedJobDetails } from "@/app/data/user/job/my-job/get-submitted-job-details";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { Separator } from "@/components/ui/separator";
import { formatMoneyInput } from "@/lib/utils";
import Link from "next/link";
import { SubmissionCTA } from "../_components/SubmissionCTA";
import { Screenshots } from "@/components/Screenshots";
import { SubmissionApprovedBanner } from "@/components/SubmissionApprovedBanner";
import { SubmissionRejectedBanner } from "@/components/SubmissionRejectedBanner";
import { SubmissionPendingBanner } from "@/components/SubmissionPendingBanner";

type Params = Promise<{
  id: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const details = await getSubmittedJobDetails(id);
  return (
    <div className="py-16 md:py-32 container space-y-6">
      <PageHeader
        title={`${details.Job.title} - ₦${formatMoneyInput(details.Job.reward)}`}
      />
      <p className="text-base text-muted-foreground mt-1.5">
        Kindly review the work {details.User.name} did and approve or reject it.
      </p>
      {details.status === "APPROVED" && <SubmissionApprovedBanner />}
      {details.status === "REJECTED" && <SubmissionRejectedBanner />}
      {details.status === "PENDING" && <SubmissionPendingBanner />}
      <Separator className="my-6" />
      <div className="space-y-4 mt-6 text-base">
        <p>
          Application ID: {details.applicationID}
          <CopyToClipboard text={details.applicationID!} />
        </p>
        <Link
          href={`/${details.User.username}`}
          className="inline-block hover:underline hover:text-primary"
        >
          Applicant Name: {details.User.name}
          <CopyToClipboard text={details.applicationID!} />
        </Link>
        <p>Job title: {details.Job.title}</p>
        <p>
          Job ID: {details.Job.jobID}
          <CopyToClipboard text={details.Job.jobID!} />
        </p>
        <p>
          Reward: <NairaIcon />
          {formatMoneyInput(details.Job.reward)}
        </p>
      </div>
      <Separator className="my-6" />
      <div className="mt-6">
        <h2 className="font-semibold text-xl md:text-2xl">Proof</h2>
        <Screenshots screenshots={details.screenshots} />
      </div>
      <div className="mt-6">
        <SubmissionCTA
          status={details.status}
          slug={details.Job.slug!}
          id={details.id}
          JobTitle={details.Job.title}
          applicantName={details.User.name}
        />
      </div>
    </div>
  );
};

export default page;
