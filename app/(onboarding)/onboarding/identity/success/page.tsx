import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Confetti } from "@/components/Confetti";

const page = () => {
  return (
    <div>
      <div className="pt-12 pb-8">
        <div className="container">
          <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
            <h1 className="font-semibold text-4xl md:text-5xl">Success</h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              Thanks! Your details have been submitted. We’ll verify your
              account within 24–48 hours, and notify you once it's complete.
            </p>
          </div>
          <div className="mt-8 max-w-2xl mx-auto">
            <Button className="w-full" size="md" asChild>
              <Link href="/dashboard">Proceed to dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
