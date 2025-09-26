import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Confetti } from "@/components/Confetti";

const page = () => {
  return (
    <div className="py-16 md:py-24 container">
      <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-4xl md:text-5xl">
          {" "}
          Password Updated Successfully🎉
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          Your password has been changed. Please use your new password the next
          time you log in.
        </p>
      </div>
      <div className="mt-8 max-w-2xl mx-auto">
        <Button className="w-full" size="md" asChild>
          <Link href="/settings">Go back to settings</Link>
        </Button>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
