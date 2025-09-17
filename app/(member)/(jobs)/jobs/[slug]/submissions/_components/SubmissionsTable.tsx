"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formattedStatus } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetJobApplicantsType } from "@/app/data/user/job/submitted/get-job-applicants";
import { Badge } from "@/components/ui/badge";

interface Props {
  applicants: GetJobApplicantsType[];
  slug: string;
}

export function SubmissionsTable({ applicants, slug }: Props) {
  const router = useRouter();

  return (
    <div className="[&>div]:max-h-screen hidden sm:block">
      <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
        <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow className="cursor-pointer" key={applicant.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/${applicant.User.username}`}
                  className="hover:underline hover:text-primary transition-all"
                >
                  {applicant.User.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/${applicant.User.username}`}>
                  @{applicant.User.username}
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    applicant.status === "PENDING"
                      ? "pending"
                      : applicant.status === "APPROVED"
                        ? "default"
                        : applicant.status === "REJECTED"
                          ? "destructive"
                          : "default"
                  }
                >
                  {formattedStatus[applicant.status]}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(applicant.createdAt)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full shadow-none"
                      aria-label="Open edit menu"
                    >
                      <EllipsisIcon size={16} aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/jobs/${slug}/submissions/${applicant.id}`}>
                        View Submission
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Approve submission</DropdownMenuItem>
                    <DropdownMenuItem>Reject submission</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
