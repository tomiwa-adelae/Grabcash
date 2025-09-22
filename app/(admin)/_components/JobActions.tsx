"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { GetJobApplicantsType } from "@/app/data/user/job/submitted/get-job-applicants";
import { tryCatch } from "@/hooks/use-try-catch";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { IconDots } from "@tabler/icons-react";
import {
  activateUser,
  closeJob,
  openJob,
  promoteUser,
  suspendUser,
} from "../admin/actions";
import { useConfetti } from "@/hooks/use-confetti";
import { UserStatus } from "@/lib/generated/prisma";

interface Props {
  id: string;
  slug: string;
  jobOpen: boolean;
  name: string;
}

export const JobActions = ({ jobOpen, slug, id, name }: Props) => {
  const [suspendPending, startSuspendTransition] = useTransition();
  const [closePending, startCloseTransition] = useTransition();
  const [openPending, startOpenTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  const handleSuspendUser = () => {
    startSuspendTransition(async () => {
      const { data: result, error } = await tryCatch(suspendUser(id));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleCloseJob = () => {
    startCloseTransition(async () => {
      const { data: result, error } = await tryCatch(closeJob(id));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleOpenJob = () => {
    startOpenTransition(async () => {
      const { data: result, error } = await tryCatch(openJob(id));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <IconDots size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem asChild>
          <Link
            href={`/admin/jobs/${slug}`}
            onClick={(e) => e.stopPropagation()}
          >
            View details
          </Link>
        </DropdownMenuItem>
        {jobOpen ? (
          <DropdownMenuItem
            disabled={closePending}
            onSelect={(e) => {
              e.preventDefault();
              handleCloseJob();
            }}
          >
            {closePending ? <Loader text="Closing..." /> : "Force Close job"}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            disabled={openPending}
            onSelect={(e) => {
              e.preventDefault();
              handleOpenJob();
            }}
          >
            {openPending ? <Loader text="Reopening..." /> : "Reopen Job"}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          disabled={suspendPending}
          onSelect={(e) => {
            e.preventDefault();
            handleSuspendUser();
          }}
        >
          {suspendPending ? <Loader /> : `Suspend ${name}`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
