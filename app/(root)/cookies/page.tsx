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
            Cookies{" "}
          </h1>
          <p>
            Earnsphere (“we,” “us,” or “our”) may use cookies, web beacons,
            tracking pixels, and other similar tracking technologies when you
            visit our website{" "}
            <Link
              className="text-primary hover:underline"
              href={`${env.BETTER_AUTH_URL}`}
            >
              {env.BETTER_AUTH_URL}
            </Link>
            , including any related media forms, media channels, mobile
            websites, or mobile applications (collectively, the “Site”), to help
            customize your experience and improve our services.
          </p>
          <p>
            By continuing to use our site and services, you consent to the use
            of cookies and similar technologies as described in this policy. If
            you do not agree to this use, please discontinue use of the Site.
          </p>
          <p>
            We reserve the right to update or change this Cookie Policy at any
            time. If changes are made, we will notify you via the email address
            you provided upon registration. All modifications will take effect
            immediately upon posting the updated Cookie Policy on the Site. You
            are encouraged to check this page periodically to stay informed.
            Your continued use of the Site after such changes will signify your
            acceptance of the revised policy.
          </p>
        </div>
        <div className="text-sm md:text-base mt-10 space-y-6">
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              What Are Cookies?{" "}
            </h2>
            <p className="text-sm my-2">
              A “cookie” is a small data file stored on your device that assigns
              you a unique identifier. Your browser uses this identifier to
              communicate with our Site, track your preferences, and improve
              your experience.
            </p>
            <p className="text-sm my-2">We use cookies for purposes such as:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Tracking services you’ve used</li>
              <li>Storing registration and login details</li>
              <li>Keeping you signed in</li>
              <li>Customizing your dashboard</li>
              <li>Facilitating transactions</li>
              <li>Understanding how you navigate the Site</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Types of Cookies We Use{" "}
            </h2>
            <p className="text-sm my-2">
              A “cookie” is a small data file stored on your device that assigns
              you a unique identifier. Your browser uses this identifier to
              communicate with our Site, track your preferences, and improve
              your experience.
            </p>
            <p className="text-sm my-2">We use cookies for purposes such as:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Analytics Cookies - Monitor how users find and interact with the
                Site, helping us identify popular features and areas for
                improvement.
              </li>
              <li>
                First-Party Cookies - These are our own cookies, either
                permanent or temporary, essential for the Site’s basic
                functionality. Disabling them may affect performance.
              </li>
              <li>
                Advertising Cookies - Placed by advertisers and ad networks to
                deliver relevant ads based on your browsing activity. These
                cookies are linked to your device, not your personal identity.
              </li>
              <li>
                Security Cookies - Help detect and prevent fraudulent activity,
                unauthorized access, and data breaches.
              </li>
              <li>
                Site Management Cookies - Maintain your session and prevent
                unexpected logouts.
              </li>
              <li>
                Personalization Cookies - Recognize repeat visitors, remember
                preferences, and enhance your user experience.
              </li>
              <li>
                Third-Party Cookies - Placed by external services integrated
                into our Site. They can be disabled in your browser settings.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Controlling Cookies{" "}
            </h2>
            <p className="text-sm my-2">
              Most browsers are set to accept cookies by default. You can
              disable or remove them via your browser or device settings. Please
              note that this may impact certain features and reduce
              functionality.
            </p>
            <p className="text-sm my-2">
              You may also opt out of targeted advertising cookies via the
              Network Advertising Initiative’s Opt-Out Tool.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Other Tracking Technologies{" "}
            </h2>
            <p className="text-sm my-2">
              In addition to cookies, we may use web beacons and pixel tags to
              gather statistical data such as the number of visitors, page
              views, and email engagement. While these cannot be disabled
              individually, you can limit their effectiveness by controlling
              cookies in your browser.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Privacy and Cookies{" "}
            </h2>
            <p className="text-sm my-2">
              This Cookie Policy works in conjunction with our Privacy Policy to
              explain how we collect, store, and use your data. By using the
              Site, you agree to both policies.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">Contact Us </h2>
            <p className="text-sm my-2">
              For questions, comments or concerns regarding this Cookie Policy,
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
