import { Button } from "@/components/ui/button";
import { IconBan, IconCheck } from "@tabler/icons-react";
import React from "react";

export const SubmissionCTA = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <Button
        size="md"
        variant={"outline"}
        className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
      >
        <IconCheck />
        Approve Job
      </Button>
      <Button
        size="md"
        variant={"outline"}
        className="border-destructive text-destructive hover:bg-destructive/5 hover:text-destructive w-full sm:w-auto"
      >
        <IconBan />
        Reject Job
      </Button>
    </div>
  );
};
