import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { env } from "@/lib/env";
import { formatMoneyInput } from "@/lib/utils";
import { PageHeader } from "@/app/(member)/_components/PageHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileUser, Pen } from "lucide-react";
import { getJobDetails } from "@/app/data/admin/job/get-job-details";
import { Banner } from "@/components/Banner";
import { IconCreditCard, IconEyeClosed } from "@tabler/icons-react";

type Params = Promise<{
  slug: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const job = await getJobDetails(slug);

  const applicantLeft = Number(job.noOfWorkers) - job._count.applicants;

  return (
    <div className="space-y-6">
      <PageHeader title={`${job.title} - ₦${formatMoneyInput(job.reward)}`} />
      {!job.jobOpen && (
        <Banner text="Job is closed" variant="primary" icon={IconEyeClosed} />
      )}
      {!job.paymentVerified && (
        <Banner
          text="Payment unverified"
          variant="pending"
          icon={IconCreditCard}
        />
      )}
      <div className="space-y-4 mt-4">
        <p className="text-base">
          Job title: <span className="text-muted-foreground">{job.title}</span>
        </p>
        <p className="text-base">
          Job ID:{" "}
          <span className="text-muted-foreground">
            {job.jobID}
            <CopyToClipboard text={job.jobID!} />
          </span>
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
            {job.type?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>
        </p>
        <p className="text-base">
          Job Category:{" "}
          <span className="text-muted-foreground">{job.category}</span>
        </p>
        <p className="text-base">
          Job Poster:{" "}
          <Link
            href={`/${job.User.username}`}
            className="text-primary underline hover:text-primary"
          >
            {job.User.name}
          </Link>
        </p>
        <p className="text-base">
          Job Link:{" "}
          <span className="text-primary hover:underline hover:text-primary">
            <a
              href={`${env.BETTER_AUTH_URL}/available-jobs/${job.slug}`}
              target={"_blank"}
            >{`${env.BETTER_AUTH_URL}/available-jobs/${job.slug}`}</a>
            <CopyToClipboard
              text={`${env.BETTER_AUTH_URL}/available-jobs/${job.slug}`}
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
          Available Slots:{" "}
          <span className="text-muted-foreground">
            {applicantLeft} remaining
          </span>
        </p>
        <p className="text-base">
          Job status:{" "}
          <span className="text-primary">
            {job.jobOpen ? "Open" : "Closed"}
          </span>
        </p>
        <p className="text-base">
          Payment verified:{" "}
          <span className="text-primary">
            {job.paymentVerified ? "Verified" : "Not verified"}
          </span>
        </p>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-xl md:text-2xl">Instructions</h2>
        <RenderDescription json={job.instructions} />
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-xl md:text-2xl">
          Proof of Completion
        </h2>
        <RenderDescription json={job.proofOfCompletion} />
      </div>
      <div className="mt-6">
        <p className="text-base text-muted-foreground">
          Some editing is closed because there are applicants on the job already
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Button asChild size="md" className="w-full">
            <Link href={`/admin/jobs/${job.slug}/edit`}>
              <Pen />
              Edit Job
            </Link>
          </Button>
          <Button asChild size="md" variant={"outline"} className="w-full">
            <Link href={`/admin/jobs/${job.slug}/submissions`}>
              <FileUser />
              View submissions ({job._count.applicants})
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
