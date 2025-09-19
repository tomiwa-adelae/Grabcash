"use client";

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
import { cn, formatMoneyInput, formattedStatus } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetMyJobsType } from "@/app/data/user/job/my-job/get-my-jobs";
import { loadMoreMyJobs } from "@/app/data/user/job/my-job/load-more-my-jobs";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";
import { Badge } from "@/components/ui/badge";

interface Props {
  initialJobs: GetMyJobsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function JobsTable({
  initialJobs,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const router = useRouter();

  const [jobs, setJobs] = useState<GetMyJobsType[]>(initialJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Observer refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLTableRowElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const result = await loadMoreMyJobs(nextPage, query);

      if (result.success && result.data) {
        setJobs((prevJobs) => [...prevJobs, ...result.data.jobs]);
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more jobs");
      }
    } catch (err) {
      setError("Failed to load more jobs");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasNext, isLoading, query]);

  // Set up intersection observer
  useEffect(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Only set up observer if there are more items to load
    if (!hasNext || !sentinelRef.current) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNext && !isLoading) {
          loadMore();
        }
      },
      {
        root: null, // Use viewport
        rootMargin: "200px", // Start loading 200px before element comes into view
        threshold: 0, // Trigger as soon as element is visible
      }
    );

    observerRef.current.observe(sentinelRef.current);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasNext, isLoading]);

  // Reset when query changes
  useEffect(() => {
    setJobs(initialJobs);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query, initialJobs, initialHasNext]);

  return (
    <div className="[&>div]:max-h-screen hidden sm:block">
      <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
        <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
          <TableRow className="hover:bg-transparent">
            <TableHead>Job Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Rewards</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow className="cursor-pointer" key={`${job.id}-${index}`}>
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
              <TableCell>
                <Badge variant={job.jobOpen ? "default" : "pending"}>
                  {job.jobOpen ? "Active" : "Closed"}
                </Badge>
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
                      <Link href={`/jobs/${job.slug}`}>View Job</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/jobs/${job.slug}/edit`}>Edit Job</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/jobs/${job.slug}/submissions`}>
                        View Submissions
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {/* Observer sentinel row - this is what gets watched */}
          {hasNext && (
            <TableRow ref={sentinelRef}>
              <TableCell colSpan={5} className="text-center py-6">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader text="" />
                    <span className="text-sm text-muted-foreground">
                      Loading more jobs...
                    </span>
                  </div>
                ) : error ? (
                  <div>
                    <p className="text-red-600 text-sm mb-2">{error}</p>
                    <Button
                      size={"md"}
                      variant={"destructive"}
                      onClick={loadMore}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">
                      Scroll to load more jobs
                    </p>
                    <Button size={"md"} onClick={loadMore}>
                      Load More ({jobs.length} of {initialTotal})
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}

          {/* End state */}
          {!hasNext && jobs.length > 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-4 text-sm text-muted-foreground"
              >
                All jobs loaded ({jobs.length} total)
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
