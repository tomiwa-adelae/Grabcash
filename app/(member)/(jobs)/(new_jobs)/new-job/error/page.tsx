import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { Confetti } from "@/components/Confetti";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import Link from "next/link";
import { RetryPaymentButton } from "./_components/RetryPaymentButton";
import { DEFAULT_COMMISSION } from "@/constants";
import { PaymentFailedBanner } from "@/components/PaymentFailedBanner";
import { getJobDetails } from "@/app/data/user/job/get-job-details";
import { getUserDetails } from "@/app/data/user/get-user-details";

const page = async ({ searchParams }: { searchParams: any }) => {
  const { slug } = await searchParams;

  const user = await getUserDetails();

  const job = await getJobDetails(slug);

  const baseTotal = Number(job.reward) * Number(job.noOfWorkers);
  const totalWithFee = (
    baseTotal +
    (baseTotal * DEFAULT_COMMISSION) / 100
  ).toFixed(); // Add 10%

  return (
    <div className="space-y-6">
      <div>
        <PageHeader title="Oops! Your payment failed" />
        <p className="text-base text-muted-foreground mt-1.5">
          We couldn’t complete your payment for {job.title}. The job has not
          been published.
        </p>
      </div>
      <PaymentFailedBanner
        totalWithFee={totalWithFee}
        id={job.id}
        slug={job.slug!}
        title={job.title}
        email={user.email}
        name={user.name}
        phoneNumber={user.phoneNumber}
      />
      <Separator className="my-6" />
      <h3 className="font-medium text-lg">Job Summary</h3>
      <div className="space-y-4 mt-6 text-base">
        <p>Job title: {job.title}</p>
        <p>
          Job ID: {job.jobID}
          <CopyToClipboard text={job.jobID!} />
        </p>
        <p>Category: {job.category}</p>
        <p>
          Amount: <NairaIcon />
          {formatMoneyInput(totalWithFee)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <RetryPaymentButton
          totalWithFee={totalWithFee}
          id={job.id}
          slug={job.slug!}
          title={job.title}
          email={user.email}
          name={user.name}
          phoneNumber={user.phoneNumber}
        />
        <Button variant={"outline"} size="md" asChild className="w-full">
          <Link href={`/jobs/${job.slug}/edit`}>Edit Job</Link>
        </Button>
      </div>
      <Button className="mt-4 w-full" size="md" asChild variant={"black"}>
        <Link href="/new-job">Post Another Job</Link>
      </Button>
      <p className="mt-6 text-center text-sm md:text-base text-muted-foreground">
        If the issue persists, please{" "}
        <Link href="/contact" className="underline hover:text-primary">
          contact support
        </Link>
        .
      </p>
    </div>
  );
};

export default page;
