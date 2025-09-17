"use client";
import { GetMyJobsType } from "@/app/data/user/job/get-my-jobs";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatMoneyInput } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  jobs: GetMyJobsType[];
}

export function JobsTable({ jobs }: Props) {
  const router = useRouter();

  return (
    <div className="[&>div]:max-h-screen hidden sm:block">
      <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
        <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
          <TableRow className="hover:bg-transparent">
            <TableHead>Job Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Rewards</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow className="cursor-pointer" key={job.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/available-jobs/${job.slug}`}
                  className="hover:underline hover:text-primary transition-all"
                >
                  {job.title}
                </Link>
              </TableCell>
              <TableCell>{job.category}</TableCell>
              <TableCell>
                <div className="flex flex-col items-start justify-center gap-1">
                  {job._count.applicants}/{job.noOfWorkers}
                  <Progress
                    value={
                      (job._count.applicants / Number(job.noOfWorkers)) * 100
                    }
                    className={cn("h-1")}
                  />
                </div>
              </TableCell>
              <TableCell>
                <NairaIcon />
                {formatMoneyInput(job.reward)}
              </TableCell>
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
                      <Link href={`/jobs/${job.slug}`}>View job</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/jobs/${job.slug}/submissions`}>
                        View submissions
                      </Link>
                    </DropdownMenuItem>
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
