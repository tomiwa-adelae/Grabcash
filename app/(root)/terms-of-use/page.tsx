import { Separator } from "@/components/ui/separator";
import { EMAIL_ADDRESS } from "@/constants";
import { Lobster_Two } from "next/font/google";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const page = () => {
  return (
    <div>
      <div className="container py-16 md:py-24">
        <div className="space-y-2">
          <p
            className={`${lobster.className} text-lg md:text-2xl text-primary font-normal`}
          >
            Legal
          </p>
          <h1 className="font-semibold text-4xl md:text-4xl lg:text-6xl">
            Terms of Use
          </h1>
          <p>
            Thank you for visiting grabcash.com. Please read, understand and
            agree to these Terms of Use before accessing or using our services.
          </p>
        </div>
        <div className="text-sm md:text-base mt-10 space-y-6">
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Terms and Definitions
            </h2>
            <p className="text-sm my-2">For the purpose of this Agreement:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                "The Company" refers to grabcash Limited (the parent company of
                grabcash.com).
              </li>
              <li>"This website" refers to grabcash.com.</li>
              <li>"Us", "We" refer to grabcash.com and its parent company.</li>
              <li>
                "User Content" refers to all data, materials, and media provided
                by users on the marketplace, including but not limited to
                photos, videos, text, graphics, and proof submissions, for use
                in connection with our services.
              </li>
              <li>
                "Written notice" means any official communication sent by the
                Company via e-mail, courier, postal service, or directly through
                the website’s notification system. A written notice from a user
                is considered valid if sent by e-mail, courier, postal service,
                or through our official support channels.
              </li>
              <li>
                "Authorized Person" means any individual or legal entity to whom
                the Company delegates authority under this Agreement.
              </li>
              <li>
                "Services" refers to all services provided by the Company under
                this Agreement, including micro-jobs, bounty campaigns,
                influencer marketing, and related activities.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Acceptance</h2>
            <p className="text-sm my-2">
              By using our platform, you confirm that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>You are at least 18 years of age.</li>
              <li>
                You have read, understood, and agreed to these Terms of Use.
              </li>
              <li>
                If you disagree with any part of these Terms, you must
                immediately stop using our services.
              </li>
            </ul>
            <p className="text-sm my-2">
              These conditions take effect the moment you first access the site
              and constitute a legally binding agreement between you and
              grabcash.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Personal Data</h2>
            <p className="text-sm my-2">
              We collect certain personal and device-related information from
              users. Please see our Privacy Policy for details on how this data
              is collected, stored, and used.{" "}
            </p>
            <p className="text-sm my-2">Minimum membership requirements:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Must be 18 years or older.</li>
              <li>
                Must have a valid means of identification and an active bank
                account.{" "}
              </li>
              <li>
                Must not use the platform to promote fraudulent, illegal, or
                misleading activities.
              </li>
              <li>Must not impersonate any individual or organization. </li>
            </ul>
            <p className="text-sm my-2">
              grabcash will not be liable for fraudulent activity conducted by
              users.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Links To Third-Party Websites
            </h2>
            <p className="text-sm my-2">
              Our website may contain links to third-party sites. These are
              provided for convenience and do not constitute endorsement. We are
              not responsible for the content, policies, or security of these
              sites. You are advised to read the Terms of Use and Privacy
              Policies of any linked site you visit.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">User Accounts</h2>
            <p className="text-sm my-2">
              To use certain features, you may be required to create an account.
              You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Providing accurate information.</li>
              <li>Keeping your login credentials secure.</li>
              <li>All activities that occur under your account.</li>
            </ul>
            <p className="text-sm my-2">
              If you suspect unauthorized access, you must notify us
              immediately. We reserve the right to suspend or terminate accounts
              that violate these Terms.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Restrictions</h2>
            <p className="text-sm my-2">You may not:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Copy, republish, or create derivative works from our services.
              </li>
              <li>Remove or alter any proprietary notices.</li>
              <li>
                Use the platform for criminal, fraudulent, or harassing
                activities.
              </li>
              <li>Spam users or post irrelevant links.</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Suspension And Restriction Of Accounts
            </h2>
            <p className="text-sm my-2">
              We may suspend accounts found to be engaging in:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Fraud or criminal activity.</li>
              <li>Submitting fake proofs for micro-jobs or bounty tasks.</li>
              <li>False advertising.</li>
              <li>Posting spam or misleading links.</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Delisting Of Products/Jobs
            </h2>
            <p className="text-sm my-2">
              A job or product listing may be removed if:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Requested by the user.</li>
              <li>Found to contain false or misleading information.</li>
              <li>Reported for poor quality or customer dissatisfaction. </li>
              <li>Involves fake reviews or engagement.</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Refunds </h2>
            <p className="text-sm my-2">
              Refunds are available only for purchases that do not meet the
              agreed quality or specification, and must be requested within 14
              days of purchase.{" "}
            </p>
            <p className="text-sm my-2">Refunds are not available for: </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Services already delivered or activated.</li>
              <li>Non-refundable digital products.</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Warranties And Representations{" "}
            </h2>
            <p className="text-sm my-2">We warrant that:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Registered users will have access to our marketplace, subject to
                membership type.
              </li>
              <li>
                We will maintain user accounts and provide reasonable support.
              </li>
            </ul>
            <p className="text-sm my-2">
              We do not guarantee uninterrupted service, accuracy, or fitness
              for a specific purpose.{" "}
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Disclaimer And Limitation Of Liability
            </h2>
            <p className="text-sm my-2">
              All services are provided “as is.” grabcash is not responsible
              for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Misrepresentation by job posters or sellers.</li>
              <li>
                Quality issues with products or services listed by third
                parties.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Capacity To Contract{" "}
            </h2>
            <p className="text-sm my-2">
              By using our services, you confirm that you have the legal
              capacity to enter into agreements.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Changes To Terms{" "}
            </h2>
            <p className="text-sm my-2">
              We may modify these Terms at any time, with 30 days’ notice for
              significant changes. Continued use after changes indicates
              acceptance.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Intellectual Property{" "}
            </h2>
            <p className="text-sm my-2">
              All site content is owned by grabcash or its licensors. You may
              not reproduce or redistribute without permission.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Termination </h2>
            <p className="text-sm my-2">
              This Agreement remains in effect until terminated:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>By grabcash, if you violate these Terms.</li>
              <li>By you, by ceasing use and requesting account deletion.</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Governing Law{" "}
            </h2>
            <p className="text-sm my-2">
              These Terms are governed by the laws of the Federal Republic of
              Nigeria.{" "}
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Dispute Resolution{" "}
            </h2>
            <p className="text-sm my-2">
              Disputes will first be resolved amicably, then by mediation or
              arbitration. Failing that, matters may be taken to Nigerian
              courts.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Indemnification{" "}
            </h2>
            <p className="text-sm my-2">
              You agree to indemnify and hold harmless grabcash against any
              claims arising from your misuse of our services.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">General </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Clause headings are for convenience only.</li>
              <li>
                Failure to enforce any provision is not a waiver of rights.
              </li>
              <li>
                Invalid provisions will be removed without affecting the rest.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Contact Us </h2>
            <p className="text-sm my-2">
              Email:{" "}
              <a
                className="text-primary hover:underline"
                href={`mailto:${EMAIL_ADDRESS}`}
              >
                {EMAIL_ADDRESS}
              </a>
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Credits </h2>
            <p className="text-sm my-2">
              Credits is the sole currency for posting jobs and campaigns.
              Earnings will be credited to user wallets.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Payouts </h2>
            <p className="text-sm my-2">
              Withdrawals are processed in 5 working days. Minimum payout:
              ₦5,000.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Reported Submissions{" "}
            </h2>
            <p className="text-sm my-2">
              Fake or unrelated submissions will incur a ₦50 penalty per
              incident. Repeat offenders risk blacklisting or submission
              restrictions.{" "}
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Giftcards </h2>
            <p className="text-sm my-2">
              grabcash is the only authorized dealer of giftcards. Credits are
              non-refundable and cannot be converted back to cash.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
