import { Separator } from "@/components/ui/separator";
import { EMAIL_ADDRESS } from "@/constants";
import { env } from "@/lib/env";
import { Lobster_Two } from "next/font/google";
import Link from "next/link";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
});

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Partner Agreement - Grabcash",
};

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
            Partner Agreement{" "}
          </h1>
          <p>
            This Agreement outlines the terms, conditions, and benefits of
            acting as a Business Partner on{" "}
            <Link
              className="text-primary hover:underline"
              href={`${env.BETTER_AUTH_URL}`}
            >
              {env.BETTER_AUTH_URL}
            </Link>{" "}
            (“the Website”). You are required to read and accept this Agreement
            before using this service.
          </p>
        </div>
        <div className="text-sm md:text-base mt-10 space-y-6">
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Terms and Definitions{" "}
            </h2>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                “Affiliate” refers to persons promoting and selling the
                products/services of business partners through the grabcash
                platform.
              </li>
              <li>
                “Business partners” means the businesses, brands, and creators
                of products or services who list and promote their offers on the
                grabcash marketplace.
              </li>
              <li>“Parties” refers to grabcash and the Business Partner.</li>
              <li>
                “Partner” refers to the undersigned business partner to this
                Agreement.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Scope of Partnership{" "}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                grabcash provides businesses, brands, and creators the
                opportunity to list their products or services on the Website as
                Business Partners.
              </li>
              <li>
                Business Partners may include creators of digital products,
                developers of software and SaaS tools, course creators,
                designers of templates, and other entrepreneurs with viable
                products or services.
              </li>
              <li>
                The Partner named in this Agreement has applied for a
                partnership to list their products or services on the Website,
                making them available for Affiliates to promote and earn
                commissions from sales to new customers.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Relationship Between Parties{" "}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                The relationship under this Agreement is a partnership for the
                limited purpose described in the scope above. Nothing in this
                Agreement creates an employment relationship, joint venture,
                agency, or franchise.
              </li>
              <li>
                The Partner is responsible for their own taxes and related
                obligations, and no tax or other statutory payments will be
                withheld from amounts earned.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Business Partner’s Responsibilities To grabcash{" "}
            </h2>
            <p className="text-sm my-2">
              The Partner shall, in addition to following the Website’s Terms of
              Use and other applicable policies:{" "}
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                List accurate and complete product or service information for
                promotion.
              </li>
              <li>
                Purchase credits (if applicable) for listing or promotional
                purposes.
              </li>
              <li>
                Provide accurate sales and product reporting; refrain from false
                advertising.{" "}
              </li>
              <li>
                Direct all support-related inquiries to grabcash’s official
                support channels.{" "}
              </li>
              <li>
                Provide timely feedback to grabcash and to customers regarding
                listed offers.{" "}
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              grabcash’s Responsibilities To Business Partners{" "}
            </h2>
            <p className="text-sm my-2">grabcash shall:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                List the Partner’s products or services on the marketplace.
              </li>
              <li>
                Facilitate affiliate promotion and customer engagement for
                listed offers.
              </li>
              <li>Provide customer support for marketplace transactions.</li>
              <li>Provide timely updates on the status of live deals.</li>
              <li>
                Offer technical support, maintenance, and accurate reporting.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Responsibilities To Users{" "}
            </h2>
            <p className="text-sm my-2">
              Both Parties shall individually and jointly provide high-quality
              products or services, support, and customer care to users. All
              warranties made by grabcash in its Terms of Use apply to users
              interacting with the Partner.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Restrictions{" "}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                The Partner is an independent contractor and may not assume or
                create any obligation on behalf of grabcash without prior
                written authorization.
              </li>
              <li>
                The Partner shall not collect funds directly on behalf of
                grabcash.
              </li>
              <li>
                If the Partner operates a physical location, it must comply with
                all relevant licensing requirements and restrictions.{" "}
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Payments </h2>
            <p className="text-sm my-2">
              grabcash will be responsible for receiving payments directly from
              users and remitting due amounts to the Partner in accordance with
              the agreed payout schedule.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">Refunds </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Users may request refunds for goods or services that do not meet
                the seller’s specifications or assured quality.
              </li>
              <li>
                Refund requests must be made no later than 14 days from the date
                of purchase.
              </li>
              <li>
                Refunds are not available for products or services already
                accessed or activated by the user.
              </li>
              <li>
                The Partner agrees to cooperate fully in processing refunds and
                will bear the liabilities for any refund resulting from their
                products or services.{" "}
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Intellectual Property{" "}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Nothing in this Agreement transfers ownership of grabcash’s
                intellectual property to the Partner.
              </li>
              <li>
                grabcash retains all rights to trademarks, designs, and other
                marketing materials shared with the Partner for promotional
                purposes.
              </li>
              <li>
                Subject to this Agreement, grabcash grants the Partner a
                limited, non-exclusive, non-transferable license to use its
                brand name, logo, and marketing materials for the purposes of
                fulfilling obligations under this Agreement. This license
                expires upon termination of the Agreement.
              </li>
              <li>
                The license applies only to branding and promotional assets, not
                to any offers, products, or services themselves.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Term And Termination{" "}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                This Agreement commences upon execution and remains in effect
                until the Partner terminates their subscription to the Partner
                package.
              </li>
              <li>
                grabcash may suspend or terminate this Agreement if the Partner
                violates the Terms of Use or any provision herein.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Governing Law</h2>
            <p className="text-sm my-2">
              This Agreement is governed by and construed in accordance with the
              laws of the Federal Republic of Nigeria.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Force Majeure</h2>
            <p className="text-sm my-2">
              Neither Party will be liable for any failure to fulfill
              obligations under this Agreement if performance is delayed,
              hindered, or prevented by events beyond reasonable control,
              including but not limited to natural disasters, strikes, or
              government actions.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Indemnification
            </h2>
            <p className="text-sm my-2">
              The Partner agrees to indemnify and hold harmless grabcash and its
              agents against all claims, damages, or expenses (including
              reasonable attorney’s fees) arising from the Partner’s actions or
              products.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Severability</h2>
            <p className="text-sm my-2">
              If any provision of this Agreement is found unenforceable, the
              remainder shall remain in full force and effect.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Dispute Resolution{" "}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Any dispute that cannot be resolved amicably shall be referred
                to arbitration in accordance with the Arbitration and
                Conciliation Act, Cap A18, Laws of the Federation of Nigeria
                2004.
              </li>
              <li>
                Disputes will be settled before a sole arbitrator jointly
                appointed by the Parties or, failing agreement within 14 days,
                by the Chairman of the Chartered Institute of Arbitrators, UK
                (Nigeria Branch). Arbitration shall be conducted in Lagos State
                in accordance with the Arbitration Law of Lagos State 2009, and
                the arbitrator’s award shall be final and binding.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Contact Us</h2>
            <p className="text-sm my-2">
              For questions, comments or concerns regarding this Partner
              Agreement, reach us at{" "}
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
