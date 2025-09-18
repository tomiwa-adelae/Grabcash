"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { NairaIcon } from "@/components/NairaIcon";
import Link from "next/link";
import { formatMoneyInput } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GetMyJobsType } from "@/app/data/user/job/my-job/get-my-jobs";
import { loadMoreMyJobs } from "@/app/data/user/job/my-job/load-more-my-jobs";
import { Loader } from "@/components/Loader";

interface Props {
  initialJobs: GetMyJobsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export const JobsCard = ({
  initialJobs,
  initialHasNext,
  initialTotal,
  query,
}: Props) => {
  const [jobs, setJobs] = useState<GetMyJobsType[]>(initialJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Observer refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    console.log("📱 MOBILE LOAD MORE TRIGGERED:", {
      currentPage,
      hasNext,
      isLoading,
    });

    if (isLoading || !hasNext) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const result = await loadMoreMyJobs(nextPage, query);

      if (result.success && result.data) {
        console.log("📱 MOBILE ADDING NEW JOBS:", result.data.jobs.length);

        setJobs((prevJobs) => [...prevJobs, ...result.data.jobs]);
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more jobs");
      }
    } catch (err) {
      console.error("📱 MOBILE LOAD MORE ERROR:", err);
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

    console.log("📱 MOBILE SETTING UP OBSERVER");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log("📱 MOBILE OBSERVER EVENT:", {
          isIntersecting: entry.isIntersecting,
          hasNext,
          isLoading,
        });

        if (entry.isIntersecting && hasNext && !isLoading) {
          console.log("📱 MOBILE OBSERVER TRIGGERED LOAD MORE");
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

  // Reset when query changes
  useEffect(() => {
    setJobs(initialJobs);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query, initialJobs, initialHasNext]);

  return (
    <div className="sm:hidden grid gap-4">
      {jobs.map((job, index) => (
        <div
          key={`${job.id}-${index}`}
          className="relative mx-auto w-full rounded-lg border border-dashed border-zinc-300 px-4 sm:px-6 md:px-8 dark:border-zinc-800"
        >
          <div className="absolute top-4 left-0 -z-0 h-px w-full bg-zinc-400 sm:top-6 md:top-8 dark:bg-zinc-700" />
          <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 sm:bottom-6 md:bottom-8 dark:bg-zinc-700" />
          <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
            <div className="absolute z-0 grid h-full w-full items-center">
              <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
                <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
              </section>
            </div>
            <div className="relative z-20 mx-auto py-8">
              <div className="px-6">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="mb-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100 hover:underline hover:text-primary transition-all"
                >
                  {job.title}
                </Link>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {job.category}
                </p>

                {/* Progress indicator */}
                <div className="mt-2 mb-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {job._count.applicants}/{job.noOfWorkers} applicants
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((job._count.applicants / Number(job.noOfWorkers)) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <h4 className="font-medium text-lg mt-1.5 mb-2">
                  <NairaIcon />
                  {formatMoneyInput(job.reward)}
                </h4>
                <Button asChild size="md" className="w-full">
                  <Link href={`/jobs/${job.slug}`}>View job</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Observer sentinel with original card design */}
      {hasNext && (
        <div
          ref={sentinelRef}
          className="relative mx-auto w-full rounded-lg border border-dashed border-zinc-300 px-4 sm:px-6 md:px-8 dark:border-zinc-800"
        >
          <div className="absolute top-4 left-0 -z-0 h-px w-full bg-zinc-400 sm:top-6 md:top-8 dark:bg-zinc-700" />
          <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 sm:bottom-6 md:bottom-8 dark:bg-zinc-700" />
          <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
            <div className="absolute z-0 grid h-full w-full items-center">
              <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
                <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
              </section>
            </div>
            <div className="relative z-20 mx-auto py-8">
              <div className="px-6 text-center">
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
                      size="md"
                      variant={"destructive"}
                      onClick={loadMore}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">
                      Scroll to load more
                    </p>
                    <Button size="md" onClick={loadMore}>
                      Load More ({jobs.length} of {initialTotal})
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End state with card design */}
      {!hasNext && jobs.length > 0 && (
        <div className="relative mx-auto w-full rounded-lg border border-dashed border-gray-300 px-4 sm:px-6 md:px-8 dark:border-gray-700">
          <div className="absolute top-4 left-0 -z-0 h-px w-full bg-gray-400 sm:top-6 md:top-8 dark:bg-gray-600" />
          <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-gray-400 sm:bottom-6 md:bottom-8 dark:bg-gray-600" />
          <div className="relative w-full border-x border-gray-400 dark:border-gray-600">
            <div className="relative z-20 mx-auto py-8">
              <div className="px-6 text-center">
                <span className="text-sm text-muted-foreground">
                  All jobs loaded ({jobs.length} total)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
