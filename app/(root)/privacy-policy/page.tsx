import { Separator } from "@/components/ui/separator";
import { EMAIL_ADDRESS } from "@/constants";
import { Lobster_Two } from "next/font/google";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
});

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy - Grabcash",
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
            Privacy Policy{" "}
          </h1>
          <p>
            This privacy policy ("Policy") explains how grabcash Limited (“the
            site”, “grabcash.com”, “we”, “our”, “us”) collects, uses, and
            protects your information when you visit or use our website. It also
            describes how we handle personal data and device information to
            support our platform’s features and services.
          </p>
          <p>
            By continuing to use our site, you confirm that you have read this
            Privacy Policy, agree to its terms, and consent to the collection
            and use of your information, including personal data and device
            information, as described here.
          </p>
        </div>
        <div className="text-sm md:text-base mt-10 space-y-6">
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              The Data We Collect{" "}
            </h2>
            <p className="text-sm my-2">
              You are not required to provide personal data when simply visiting
              our website without using our services.  When you choose to use
              our services or features, you will need to create an account, and
              we will collect information necessary to provide our services and
              improve existing features.
            </p>
            <p className="text-sm my-2">You may be required to provide:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Country & state of residence</li>
              <li>Bank account details</li>
              <li>A profile photograph</li>
            </ul>
            <p className="text-sm my-2">
              We also collect certain device-related information when you visit
              the site, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Browser type</li>
              <li>IP address</li>
              <li>Time zone and location</li>
              <li>Cookies installed on your device</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Why We Collect Your Data{" "}
            </h2>
            <p className="text-sm my-2">
              We collect your data for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                To create and maintain your user dashboard on our marketplace
              </li>
              <li>To better understand your needs and usage patterns</li>
              <li>To improve our services and features</li>
              <li>
                To send promotional emails with content we believe will interest
                you
              </li>
              <li>
                To request feedback via surveys and market research activities
              </li>
              <li>
                To personalize your experience according to your preferences and
                behavior
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              How We Collect Your Data{" "}
            </h2>
            <p className="text-sm my-2">
              We use the following technologies to collect your information:{" "}
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Cookies – We use cookies to personalize your experience, track
                usage, and improve our services. Cookies assign unique,
                anonymous identifiers to your device so we can understand how
                you interact with our site. For more details on cookies, see
                Cookie Policy{" "}
              </li>
              <li>
                Log Files – We store information about your activities in log
                files, including IP addresses, browser type, ISP, referring/exit
                pages, operating system, timestamps, and clickstream data.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Safeguarding Your Data{" "}
            </h2>
            <p className="text-sm my-2">
              grabcash is committed to keeping your data secure and
              confidential. We take measures to prevent unauthorized access,
              theft, or disclosure by using modern technologies and best
              practices.
            </p>
            <p className="text-sm my-2">Your personal data will be:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Adequate, accurate, and respectful of your rights</li>
              <li>Stored only for as long as it is reasonably needed</li>
              <li>
                Protected from foreseeable hazards such as cyberattacks, data
                leaks, and damage from environmental factors{" "}
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Our Cookie Policy{" "}
            </h2>
            <p className="text-sm my-2">
              When you accept cookies on our site, you agree to allow us to
              collect data about your online activity, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Pages you visit most often</li>
              <li>Websites you visit before or after grabcash</li>
              <li>How you interact with our features</li>
            </ul>
            <p className="text-sm my-2">
              We use this data to improve your experience and remove it from our
              systems after statistical analysis. Cookies do not give us access
              to your computer.
            </p>
            <p className="text-sm my-2">
              If you wish to disable cookies, you can do so in your browser
              settings.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Links To Other Websites{" "}
            </h2>
            <p className="text-sm my-2">
              Our website may contain links to third-party sites. Once you leave
              grabcash.com, we are not responsible for the protection or privacy
              of your information on other sites. Please review the privacy
              policies of any third-party websites you visit.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Your Rights To Restrict Data Collection{" "}
            </h2>
            <p className="text-sm my-2">
              You can restrict the collection or use of your personal data by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Leaving optional information fields blank during registration or
                form submissions
              </li>
              <li>Contacting us to withdraw previously given consent</li>
            </ul>
            <p className="text-sm my-2">
              grabcash will not sell, lease, or distribute your personal
              information to third parties without your permission, except where
              required by law. Promotional materials will only be sent with your
              consent.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Access To Your Data{" "}
            </h2>
            <p className="text-sm my-2">
              You can view and edit your personal data at any time via your user
              dashboard. For information you cannot change directly, you may
              contact our support team for assistance.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Third-Party Access To Data{" "}
            </h2>
            <p className="text-sm my-2">
              To enhance our services, we may share certain data with trusted
              partners such as Google and affiliate business partners. This data
              may be used to:{" "}
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Improve advertising targeting</li>
              <li>Develop new services</li>
              <li>Personalize recommendations</li>
            </ul>
            <p className="text-sm my-2">
              All third-party access will be supervised by grabcash and used
              only for the purposes described here.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Remedy For Violation{" "}
            </h2>
            <p className="text-sm my-2">
              If you believe we have violated this policy, you may contact us to
              report the issue. We will investigate promptly and take corrective
              action if necessary. Resolutions will be provided within 30 days
              of receiving your complaint.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Contact Us </h2>
            <p className="text-sm my-2">
              If you believe we have violated this policy, you may contact us to
              report the issue. We will investigate promptly and take corrective
              action if necessary. Resolutions will be provided within 30 days
              of receiving your complaint.For any questions, comments, or
              concerns regarding this Privacy Policy, contact us at{" "}
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
