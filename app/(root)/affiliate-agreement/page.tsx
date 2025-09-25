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
            Affiliate Agreement{" "}
          </h1>
          <p>
            This Agreement outlines the terms, conditions, and benefits of
            acting as an affiliate marketer on{" "}
            <Link
              className="text-primary hover:underline"
              href={`${env.BETTER_AUTH_URL}`}
            >
              {env.BETTER_AUTH_URL}
            </Link>{" "}
            (“the Website”). grabcash business partners may provide additional
            conditions for working with them. You are required to read and
            accept this Agreement before using this service.
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
              <li>“Parties” refers to grabcash and the Affiliate.</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Appointment and Engagement{" "}
            </h2>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                The Affiliate agrees to promote and advertise the products and
                services of business partners who use the Website in exchange
                for the compensation described in this Agreement and subject to
                the terms contained herein.
              </li>
              <li>
                The Affiliate shall pay the sum of ₦8,000 to register as an
                grabcash+ member. This grants access to all membership features,
                learning resources, and affiliate tools for training and
                promotion.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Affiliate’s Duties{" "}
            </h2>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                The Affiliate shall use their best efforts, skill, and
                professionalism to promote the products and services of
                grabcash’s partners both physically and on online marketplaces.
                Such promotion must comply with all rules and regulations
                governing the Website and any other platforms used.
              </li>
              <li>
                The Affiliate agrees not to engage in any actions or make
                remarks that may damage the grabcash brand or harm the public
                perception of its business partners.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Restrictions{" "}
            </h2>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                The Affiliate operates as an independent contractor and may not
                assume or create any obligation on behalf of grabcash without
                express written authorization.
              </li>
              <li>
                The Affiliate shall not receive or collect any funds on behalf
                of grabcash.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Independent Contractor Status{" "}
            </h2>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                The Affiliate is engaged solely as an independent contractor and
                is not entitled to any employment benefits or welfare packages
                provided to grabcash employees.
              </li>
              <li>
                Nothing in this Agreement creates an employer-employee
                relationship, partnership, joint venture, or agency between the
                Parties.{" "}
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              grabcash’s Obligations{" "}
            </h2>
            <p className="text-sm my-2">
              grabcash shall provide the Affiliate with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                All necessary information and materials to enable the Affiliate
                to perform their duties.
              </li>
              <li>Customer support.</li>
              <li>
                Data protection in accordance with the Website’s Privacy
                Policy.{" "}
              </li>
              <li>Technical support and maintenance. </li>
              <li>Accurate reporting on transactions and performance. </li>
            </ul>
            <p className="text-sm my-2">
              Rewards and Commission: The commission earned by the Affiliate for
              each product or offer shall be determined by the business partner
              who owns the product or offer.
            </p>
            <p className="text-sm my-2">Intellectual Property Ownership:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                No intellectual property rights in the business partners’
                products or offers are transferred to the Affiliate.
              </li>
              <li>
                grabcash and its partners retain all rights to intellectual
                property, including trademarks, literary works, and designs..
              </li>
              <li>
                Subject to this Agreement, grabcash grants the Affiliate a
                limited license to use its brand name, logo, and marketing
                assets for promotional purposes. This license expires upon
                termination of this Agreement.
              </li>
              <li>
                The license does not extend to any products, services, or offers
                themselves.{" "}
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Term and Termination{" "}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                This Agreement commences on the date of execution and continues
                until the Affiliate terminates their subscription to the
                Affiliate package.
              </li>
              <li>
                grabcash may suspend or terminate this Agreement if the
                Affiliate violates the Terms of Use or any provision of this
                Agreement.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Governing Law{" "}
            </h2>
            <p className="text-sm my-2">
              This Agreement shall be governed by and construed in accordance
              with the laws of the Federal Republic of Nigeria, including all
              matters of validity, performance, and interpretation.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Force Majeure{" "}
            </h2>
            <p className="text-sm my-2">
              Neither Party shall be liable for any delay or failure to perform
              obligations under this Agreement caused by circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>beyond their reasonable control;</li>
              <li>which could not have been reasonably avoided; and</li>
              <li>not attributable to the other Party. </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Indemnification{" "}
            </h2>
            <p className="text-sm my-2">
              The Affiliate agrees to defend and indemnify grabcash and its
              agents, and hold them harmless against all claims, damages, and
              expenses (including reasonable attorney’s fees) arising from the
              Affiliate’s actions, conduct, or interactions with business
              partners or third parties.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Severability{" "}
            </h2>
            <p className="text-sm my-2">
              If any provision of this Agreement is deemed unenforceable, that
              provision will be severed and the remainder of the Agreement will
              remain in full effect.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Dispute Resolution{" "}
            </h2>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Any dispute arising from this Agreement that cannot be resolved
                amicably shall be referred to arbitration in accordance with the
                Arbitration and Conciliation Act, Cap A18, Laws of the
                Federation of Nigeria 2004.
              </li>
              <li>
                Disputes shall be settled before a sole arbitrator appointed
                jointly by the Parties, or, if the Parties cannot agree within
                14 days, by the Chairman of the Chartered Institute of
                Arbitrators, UK (Nigeria Branch). Arbitration will be held in
                Lagos State in accordance with the Arbitration Law of Lagos
                State 2009. The arbitrator’s award shall be final and binding.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Contact Us{" "}
            </h2>
            <p className="text-sm my-2">
              For questions, comments or concerns regarding this Affiliate
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
