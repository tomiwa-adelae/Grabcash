import { Separator } from "@/components/ui/separator";
import { EMAIL_ADDRESS } from "@/constants";
import { env } from "@/lib/env";
import { Lobster_Two } from "next/font/google";
import Link from "next/link";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const page = () => {
  return (
    <div>
      <div className="container py-16 md:py-32">
        <div className="space-y-2">
          <p
            className={`${lobster.className} text-lg md:text-2xl text-primary font-normal`}
          >
            Legal
          </p>
          <h1 className="font-semibold text-4xl md:text-4xl lg:text-6xl">
            Refund Policy{" "}
          </h1>
          <p>
            This Refund Policy is part of, and should be read together with, our{" "}
            <Link
              className="text-primary hover:underline"
              href={`/terms-of-use`}
            >
              Terms of Use.
            </Link>{" "}
            grabcash reserves the right to update or modify this Refund Policy
            at any time without prior notice.
          </p>
          <p>Full Refund Guarantee</p>
          <p>
            If a service, micro-job, bounty campaign, or purchased product is
            not delivered within the agreed time frame, we offer a 100% refund
            to the Client.
          </p>
          <p>
            In our commitment to ensuring member satisfaction, you can contact
            us for a refund request or to resolve any related issue via email:{" "}
            <a
              className="text-primary hover:underline"
              href={`mailto:${EMAIL_ADDRESS}`}
            >
              {EMAIL_ADDRESS}
            </a>
            .
          </p>
          <p className="font-semibold">
            NOTE: Membership or subscription fees, once paid, are
            non-refundable.
          </p>
        </div>
        <div className="text-sm md:text-base mt-10 space-y-6">
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              We Will Issue Refunds in the Following Cases:{" "}
            </h2>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Duplicate Payment: If you accidentally made a duplicate payment
                due to a technical glitch or any other error.
              </li>
              <li>
                Policy-Based Refund: If we process a refund according to the
                provisions of our latest refund policy updates.
              </li>
              <li>
                Discretionary Refund: If our customer support team determines
                that a refund is justified at our sole discretion.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              How to Request a Refund{" "}
            </h2>
            <p className="text-sm my-2">Our process is straightforward:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Email us at{" "}
                <a
                  className="text-primary hover:underline"
                  href={`mailto:${EMAIL_ADDRESS}`}
                >
                  {EMAIL_ADDRESS}
                </a>{" "}
                stating your order details and reason for the request.
              </li>
              <li>Our back-office team will review your case</li>
              <li>
                If your request is approved, your refund will be processed
                according to the method outlined below.
              </li>
            </ul>
            <p className="text-sm my-2">
              We aim to make this process smooth and fair for all members.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Unethical Orders & Cancellation Policy{" "}
            </h2>
            <p className="text-sm my-2">
              grabcash has a zero-tolerance policy for unethical activities. Any
              micro-job, bounty campaign, or order obtained by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Exploiting technical glitches,</li>
              <li>Misusing offer terms, guidelines, or codes,</li>
              <li>Engaging in fraudulent activity,</li>
            </ul>
            <p className="text-sm my-2">
              …will be canceled immediately and no refund will be provided in
              such cases.{" "}
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Methods of Payment & Refund
            </h2>
            <p className="text-sm my-2">
              Refunds will be issued to the original payment method used at the
              time of transaction.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Refund Processing Timeline
            </h2>
            <p className="text-sm my-2">
              The complete refund process usually takes 5–15 working days from
              the date of refund confirmation.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Contact Us</h2>
            <p className="text-sm my-2">
              For questions, comments or concerns regarding this Refund Policy,
              reach us at{" "}
              <a
                className="text-primary hover:underline"
                href={`mailto:${EMAIL_ADDRESS}`}
              >
                {EMAIL_ADDRESS}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
