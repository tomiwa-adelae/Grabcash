import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { JobCTAs } from "./_components/JobCTAs";
import { ProofForm } from "./_components/ProofForm";
import { EMAIL_ADDRESS } from "@/constants";
import { getJobDetails } from "@/app/data/job/get-job-details";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { env } from "@/lib/env";
import { formatMoneyInput } from "@/lib/utils";
import { PageHeader } from "@/app/(member)/_components/PageHeader";
import Link from "next/link";
import { getAlreadyApplied } from "@/app/data/job/get-already-applied";
import { AlreadyAppliedBanner } from "@/components/AlreadyAppliedBanner";
import { getUserDetails } from "@/app/data/user/get-user-details";
import { Banner } from "@/components/Banner";
import { IconMoodX, IconUserSquareRounded } from "@tabler/icons-react";

type Params = Promise<{
  slug: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const job = await getJobDetails(slug);
  const user = await getUserDetails();
  const alreadyApplied = await getAlreadyApplied(job.id);

  const applicantLeft = Number(job.noOfWorkers) - job._count.applicants;
  const jobOpen = applicantLeft > 0 && job.jobOpen; // job.isOpen = manual flag
  const isOwner = job.User.id === user.id;

  return (
    <div className="py-16 md:py-24 container space-y-6">
      <PageHeader title="Job Details" />
      {!job.jobOpen && (
        <Banner
          text="This job is already closed"
          variant="destructive"
          icon={IconMoodX}
        />
      )}
      {isOwner && (
        <Banner
          text="This is your job"
          variant="primary"
          icon={IconUserSquareRounded}
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
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-xl md:text-2xl">Instructions</h2>
        <RenderDescription json={job.instructions} />
      </div>
      <div className="mt-6">
        {!alreadyApplied && (
          <p className="text-base text-muted-foreground">
            Clicking on Start Job indicates your interest in the task and you
            will be counted in as an applicant.{" "}
          </p>
        )}
        {alreadyApplied && <AlreadyAppliedBanner id={alreadyApplied.id} />}
        <JobCTAs
          isOwner={isOwner}
          jobLink={job.jobLink!}
          alreadyApplied={alreadyApplied}
        />
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-xl md:text-2xl">
          Proof of Completion
        </h2>
        <RenderDescription json={job.proofOfCompletion} />
        {applicantLeft >= 1 && !alreadyApplied && !isOwner && (
          <ProofForm
            submissionType={job.submissionType!}
            id={job.id}
            slug={job.slug!}
          />
        )}
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
    </div>
  );
};

export default page;
