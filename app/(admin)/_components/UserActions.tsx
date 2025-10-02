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
import { activateUser, promoteUser, suspendUser } from "../admin/actions";
import { useConfetti } from "@/hooks/use-confetti";
import { UserStatus } from "@/lib/generated/prisma";

interface Props {
  onDelete?: () => void; // Callback to handle reject modal
  username: string;
  id: string;
  status: UserStatus;
  isAdmin: boolean;
}

export const UserActions = ({
  username,
  onDelete,
  isAdmin,
  status,
  id,
}: Props) => {
  const [suspendPending, startSuspendTransition] = useTransition();
  const [activatePending, startActivateTransition] = useTransition();
  const [promotePending, startPromoteTransition] = useTransition();
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

  const handleActivateUser = () => {
    startActivateTransition(async () => {
      const { data: result, error } = await tryCatch(activateUser(id));

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

  const handlePromoteUser = () => {
    startPromoteTransition(async () => {
      const { data: result, error } = await tryCatch(promoteUser(id));

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
            href={`/admin/${username}`}
            onClick={(e) => e.stopPropagation()}
          >
            View profile
          </Link>
        </DropdownMenuItem>
        {status === "ACTIVE" ? (
          <DropdownMenuItem
            disabled={suspendPending}
            onSelect={(e) => {
              e.preventDefault();
              handleSuspendUser();
            }}
          >
            {suspendPending ? <Loader text="Suspending..." /> : "Suspend user"}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            disabled={activatePending}
            onSelect={(e) => {
              e.preventDefault();
              handleActivateUser();
            }}
          >
            {activatePending ? (
              <Loader text="Activating..." />
            ) : (
              "Activate user"
            )}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            onDelete?.(); // Call the parent's reject handler
          }}
        >
          Delete account
        </DropdownMenuItem>
        {!isAdmin && (
          <DropdownMenuItem
            disabled={promotePending}
            onSelect={(e) => {
              e.preventDefault();
              handlePromoteUser();
            }}
          >
            {promotePending ? (
              <Loader text="Promoting..." />
            ) : (
              "Promote to admin"
            )}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
