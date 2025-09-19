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
import { JobStatus } from "@/lib/generated/prisma";

interface Props {
  status: JobStatus;
  slug: string;
  onDelete?: () => void; // Callback to handle reject modal
}

export const DraftedJobActions = ({ slug, status, onDelete }: Props) => {
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
            href={`/jobs/${slug}/edit`}
            onClick={(e) => e.stopPropagation()}
          >
            Continue Editing
          </Link>
        </DropdownMenuItem>
        {status === "DRAFT" && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onDelete?.(); // Call the parent's reject handler
            }}
          >
            Delete job
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
