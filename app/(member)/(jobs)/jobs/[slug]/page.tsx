import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { env } from "@/lib/env";
import { formatMoneyInput } from "@/lib/utils";
import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getJobDetails } from "@/app/data/user/job/get-job-details";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileUser, Pen } from "lucide-react";
import { PaymentFailedBanner } from "@/components/PaymentFailedBanner";
import { DEFAULT_COMMISSION } from "@/constants";
import { getUserDetails } from "@/app/data/user/get-user-details";
import { RetryPaymentButton } from "../../(new_jobs)/new-job/error/_components/RetryPaymentButton";

type Params = Promise<{
  slug: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const user = await getUserDetails();

  const job = await getJobDetails(slug);

  const baseTotal = Number(job.reward) * Number(job.noOfWorkers);
  const totalWithFee = (
    baseTotal +
    (baseTotal * DEFAULT_COMMISSION) / 100
  ).toFixed(); // Add 10%

  return (
    <div className="py-16 md:py-24 container space-y-6">
      <PageHeader title="Job Details" />
      {!job.paymentVerified && (
        <PaymentFailedBanner
          totalWithFee={totalWithFee}
          id={job.id}
          slug={job.slug!}
          title={job.title}
          email={user.email}
          name={user.name}
          phoneNumber={user.phoneNumber}
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
            {Number(job.noOfWorkers) - job._count.applicants} remaining
          </span>
        </p>
        <p className="text-base">
          Status: <span className="text-primary">Open</span>
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
          {job.paymentVerified ? (
            <Button asChild size="md" className="w-full">
              <Link href={`/jobs/${job.slug}/submissions`}>
                <FileUser />
                View submissions ({job._count.applicants})
              </Link>
            </Button>
          ) : (
            <RetryPaymentButton
              totalWithFee={totalWithFee}
              id={job.id}
              slug={job.slug!}
              title={job.title}
              email={user.email}
              name={user.name}
              phoneNumber={user.phoneNumber}
            />
          )}
          <Button asChild size="md" className="w-full" variant={"secondary"}>
            <Link href={`/jobs/${job.slug}/edit`}>
              <Pen />
              Edit Job
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
