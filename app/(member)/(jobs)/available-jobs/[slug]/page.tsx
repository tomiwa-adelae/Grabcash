import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { JobCTAs } from "./_components/JobCTAs";
import { ProofForm } from "./_components/ProofForm";
import { EMAIL_ADDRESS } from "@/constants";
import {
  getJobDetails,
  GetJobDetailsType,
} from "@/app/data/job/get-job-details";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { env } from "@/lib/env";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { PageHeader } from "@/app/(member)/_components/PageHeader";

type Params = Promise<{
  slug: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const job: GetJobDetailsType = await getJobDetails(slug);

  return (
    <div className="py-12 container">
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
            {job.type?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>
        </p>
        <p className="text-base">
          Job Category:{" "}
          <span className="text-muted-foreground">{job.category}</span>
        </p>
        <p className="text-base">
          Job Poster:{" "}
          <span className="text-blue-400 underline hover:text-primary">
            {job.User.name}
          </span>
        </p>
        <p className="text-base">
          Job Link:{" "}
          <span className="text-blue-400 hover:underline hover:text-primary">
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
    </div>
  );
};

export default page;
