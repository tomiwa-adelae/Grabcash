"use client";

import { GetAvailableJobsType } from "@/app/data/job/get-available-jobs";
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
import { loadMoreAvailableJobs } from "@/app/data/job/load-more-available-jobs";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";

interface Props {
  initialJobs: GetAvailableJobsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function AvailableJobsTable({
  initialJobs,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const router = useRouter();

  const [jobs, setJobs] = useState<GetAvailableJobsType[]>(initialJobs);
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
      const result = await loadMoreAvailableJobs(nextPage, query);

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
    <div className=" hidden sm:block">
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
          {jobs.map((job, index) => (
            <TableRow
              onClick={() => router.push(`/available-jobs/${job.slug}`)}
              className="cursor-pointer"
              key={`${job.id}-${index}`}
            >
              <TableCell className="font-medium">
                <Link
                  href={`/available-jobs/${job.slug}`}
                  className="hover:underline hover:text-primary transition-all"
                >
                  {job.title}
                </Link>
                <p className="text-xs text-muted-foreground">{job.jobID}</p>
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
                <Button asChild size="md" variant={"link"}>
                  <Link target="_blank" href={`/available-jobs/${job.slug}`}>
                    View job
                  </Link>
                </Button>
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
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">
                      Scroll to load more jobs
                    </p>
                    <Button size="md" onClick={loadMore}>
                      Load More ({jobs.length} of {initialTotal})
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
