import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { getPaymentDetails } from "@/app/data/admin/job/payment/get-payment-details";
import { getMySubmittedJob } from "@/app/data/user/job/submitted/get-my-submitted-job";
import { Banner } from "@/components/Banner";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { env } from "@/lib/env";
import { formatDate, formatMoneyInput, formattedStatus } from "@/lib/utils";
import { IconBan, IconClock, IconFolderCheck } from "@tabler/icons-react";
import Link from "next/link";
import { PaymentCTA } from "./_components/PaymentCTA";

type Params = Promise<{
  id: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const details = await getPaymentDetails(id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Payment for ${details.Job.title} - ₦${formatMoneyInput(details.amount)}`}
      />
      {details.status === "SUCCESS" && (
        <Banner
          text="Payment was successful"
          variant="primary"
          icon={IconFolderCheck}
        />
      )}
      {details.status === "FAILED" && (
        <Banner
          text="Payment was failed"
          variant="destructive"
          icon={IconBan}
        />
      )}
      {details.status === "PENDING" && (
        <Banner
          text="Payment is still pending"
          variant="pending"
          icon={IconClock}
        />
      )}
      <Separator className="my-6" />
      <div className="space-y-4 mt-6 text-base">
        <p>
          Transaction ID: {details.transactionId}
          <CopyToClipboard text={details.transactionId} />
        </p>
        <p>
          TRXREF: {details.txRef}
          <CopyToClipboard text={details.txRef} />
        </p>
        <p>Payment status: {formattedStatus[details.status]}</p>
        <p>
          Amount paid: <NairaIcon />
          {formatMoneyInput(details.amount)}
        </p>
        <p>Payment date: {formatDate(details.createdAt)}</p>
        <p>
          User:{" "}
          <Link
            href={`/admin/${details.User.username}`}
            className="hover:underline text-primary"
          >
            {details.User.name}
          </Link>
        </p>
        <p>
          Job link:{" "}
          <span className="text-primary hover:underline hover:text-primary">
            <a
              href={`${env.BETTER_AUTH_URL}/available-jobs/${details.Job.slug}`}
              target={"_blank"}
            >{`${env.BETTER_AUTH_URL}/available-jobs/${details.Job.slug}`}</a>
            <CopyToClipboard
              text={`${env.BETTER_AUTH_URL}/available-jobs/${details.Job.slug}`}
            />
          </span>
        </p>
      </div>
      {!details.Job.paymentVerified && <PaymentCTA id={details.id} />}
    </div>
  );
};

export default page;
