import { Button } from "@/components/ui/button";
import { BookmarkCheck, Flag, Share } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  jobLink: string;
  isOwner: boolean;
  alreadyApplied: any;
}

export const JobCTAs = ({ jobLink, alreadyApplied, isOwner }: Props) => {
  return (
    <div className="flex items-center justify-start gap-4 flex-wrap flex-col sm:flex-row mt-4">
      {alreadyApplied && (
        <Button size="md" disabled>
          Start Job
        </Button>
      )}
      {!alreadyApplied && !isOwner && (
        <Button asChild size="md" className="w-full sm:w-auto">
          <a target="_blank" href={jobLink}>
            Start Job
          </a>
        </Button>
      )}
      {/* {!alreadyApplied && (
        <Button size="md" variant={"outline"} className="w-full sm:w-auto">
          <BookmarkCheck />
          Save for later
        </Button>
      )} */}
      {/* <Button
        size="md"
        variant={"outline"}
        className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
      >
        <Share />
        Share Job
      </Button> */}
      {/* <Button
        size="md"
        variant={"outline"}
        className="border-destructive text-destructive hover:bg-destructive/5 hover:text-destructive w-full sm:w-auto"
      >
        <Flag />
        Report Job
      </Button> */}
    </div>
  );
};
