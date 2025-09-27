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
import { useTransition } from "react";
import { tryCatch } from "@/hooks/use-try-catch";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { approveApplication } from "@/app/(admin)/admin/actions";

interface Props {
  id: string;
  slug: string;
  onReject?: () => void; // Callback to handle reject modal
}

export const SubmissionActions = ({ slug, id, onReject }: Props) => {
  const [pending, startTransition] = useTransition();

  const handleApproveSubmission = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        approveApplication(id, slug)
      );

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
          <EllipsisIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem asChild>
          <Link
            href={`/admin/jobs/${slug}/submissions/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            View Submission
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={pending}
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleApproveSubmission();
          }}
        >
          {pending ? <Loader text="Approving..." /> : "Approve submission"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onReject?.(); // Call the parent's reject handler
          }}
        >
          Reject submission
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
