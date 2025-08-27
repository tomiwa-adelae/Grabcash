import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Confetti } from "@/components/Confetti";

const page = () => {
  return (
    <div>
      <div className="pt-12 pb-8">
        <div className="container">
          <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
            <h1 className="font-semibold text-4xl md:text-5xl">
              Password reset successful
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              You can now log in with your new password.
            </p>
          </div>
          <div className="mt-8 max-w-2xl mx-auto">
            <Button className="w-full" size="md" asChild>
              <Link href="/login">Proceed to login</Link>
            </Button>
          </div>
        </div>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
