import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Confetti } from "@/components/Confetti";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="py-16 md:py-32">
      <div className="container">
        <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
          <h1 className="font-semibold text-4xl md:text-5xl">Success</h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Welcome to grabcash, {session?.user.name}. Your account has been
            successfully created and verified. Let's complete a few quick steps
            to unlock your dashboard and start earning.
          </p>
        </div>
        <div className="mt-8 max-w-2xl mx-auto">
          <Button className="w-full" size="md" asChild>
            <Link href="/onboarding">Continue registration</Link>
          </Button>
        </div>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
