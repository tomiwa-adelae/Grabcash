"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";
import { GetActiveJobsType } from "@/app/data/admin/job/get-active-jobs";
import { loadMoreActiveJobs } from "@/app/data/admin/job/load-more-active-jobs";
import { JobBox } from "./JobBox";

interface Props {
  initialJobs: GetActiveJobsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function ActiveJobsList({
  initialJobs,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const [jobs, setJobs] = useState<GetActiveJobsType[]>(initialJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Observer refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const result = await loadMoreActiveJobs(nextPage, query);

      if (result.success && result.data) {
        setJobs((prevJobs) => {
          const combined = [...prevJobs, ...result.data.jobs];
          // ✅ Deduplicate by id
          const unique = Array.from(
            new Map(combined.map((u) => [u.id, u])).values()
          );
          return unique;
        });
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
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!hasNext || !sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNext && !isLoading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasNext, isLoading]);

  // Reset only when query changes
  useEffect(() => {
    setJobs(initialJobs);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query]); // ✅ not watching initialUsers/initialHasNext

  return (
    <div>
      {jobs.map((job, index) => (
        <JobBox
          applicants={job._count.applicants}
          createdAt={job.createdAt}
          image={job.User.image!}
          index={index}
          jobOpen={job.jobOpen}
          name={job.User.name}
          noOfWorkers={job.noOfWorkers!}
          slug={job.slug!}
          title={job.title}
          username={job.User.username!}
          key={job.id}
          id={job.id}
          reward={job.reward!}
          paymentVerified={job.paymentVerified}
        />
      ))}

      {/* Observer sentinel */}
      {hasNext && (
        <div
          ref={sentinelRef}
          className="group hover:bg-accent/50 rounded-lg p-4 transition-colors items-center text-center text-muted-foreground text-sm"
        >
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
              <Button size={"md"} variant={"destructive"} onClick={loadMore}>
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
        </div>
      )}

      {!hasNext && jobs.length > 0 && (
        <div className="group hover:bg-accent/50 rounded-lg p-4 transition-colors items-center text-center text-muted-foreground text-sm">
          All jobs loaded ({jobs.length} total)
        </div>
      )}
    </div>
  );
}
