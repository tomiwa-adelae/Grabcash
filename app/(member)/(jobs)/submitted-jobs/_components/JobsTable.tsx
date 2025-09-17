import { GetMySubmittedJobsType } from "@/app/data/user/job/submitted/get-my-submitted-jobs";
import { NairaIcon } from "@/components/NairaIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoneyInput, formattedStatus } from "@/lib/utils";
import Link from "next/link";

interface Props {
  jobs: GetMySubmittedJobsType[];
}

export function JobsTable({ jobs }: Props) {
  return (
    <div className="[&>div]:max-h-screen hidden sm:block">
      <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
        <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
          <TableRow className="hover:bg-transparent">
            <TableHead>Job Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rewards</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/available-jobs/${job.Job.slug}`}
                  className="hover:underline hover:text-primary transition-all"
                >
                  {job.Job.title}
                </Link>
              </TableCell>
              <TableCell>{job.Job.category}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    job.status === "PENDING"
                      ? "pending"
                      : job.status === "APPROVED"
                        ? "default"
                        : job.status === "REJECTED"
                          ? "destructive"
                          : "default"
                  }
                >
                  {formattedStatus[job.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <NairaIcon />
                {formatMoneyInput(job.Job.reward)}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild size="md" variant={"link"}>
                  <Link href={`/submitted-jobs/${job.id}`}>View job</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
