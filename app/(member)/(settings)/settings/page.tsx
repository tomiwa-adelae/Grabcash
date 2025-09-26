import { InAppNotificationBox } from "../_components/InAppNotificationBox";
import { EmailNotificationBox } from "../_components/EmailNotificationBox";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LoginActivities } from "../_components/LoginActivities";
import { SessionsSettings } from "../_components/SessionsSettings";
import { PrivacySettings } from "../_components/PrivacySettings";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
  const sessions = await auth.api.listSessions({ headers: await headers() });

  return (
    <div className="py-16 md:py-24 container">
      <h1 className="text-center text-4xl font-semibold lg:text-5xl">
        Settings
      </h1>
      <div className="mt-4">
        <h2 className="font-medium text-xl md:text-2xl">Notifications</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Stay updated on your jobs, campaigns, and account activity. Choose how
          you'd like to receive updates.
        </p>
        <div className="space-y-1 mt-2">
          <InAppNotificationBox />
          <EmailNotificationBox />
        </div>
      </div>
      <Separator className="my-10" />
      <div className="mt-4 space-y-8">
        <h2 className="font-medium text-xl md:text-2xl">Security & Logins</h2>
        <LoginActivities sessions={sessions} />
        <SessionsSettings />
      </div>
      <Separator className="my-10" />
      <Button asChild size="md">
        <Link href="/change-password">Change Password</Link>
      </Button>
      {/* <Separator className="my-10" />
      <div className="mt-4">
        <h2 className="font-medium text-xl md:text-2xl mb-2">
          Privacy Settings
        </h2>
        <PrivacySettings />
      </div> */}
    </div>
  );
};

export default page;
