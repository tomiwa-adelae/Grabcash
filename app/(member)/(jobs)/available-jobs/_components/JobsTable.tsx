import { GetAvailableJobsType } from "@/app/data/job/get-available-jobs";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoneyInput } from "@/lib/utils";
import Link from "next/link";

interface Props {
  jobs: GetAvailableJobsType[];
}

export function JobsTable({ jobs }: Props) {
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
            <TableRow key={job.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/available-jobs/${job.slug}`}
                  className="hover:underline hover:text-primary transition-all"
                >
                  {job.title}
                </Link>
              </TableCell>
              <TableCell>{job.category}</TableCell>
              <TableCell>tomiwa</TableCell>
              <TableCell>
                <NairaIcon />
                {formatMoneyInput(job.reward)}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild size="md" variant={"link"}>
                  <Link href={`/available-jobs/${job.slug}`}>View job</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
