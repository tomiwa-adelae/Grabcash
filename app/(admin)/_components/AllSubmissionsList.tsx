"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";
import { JobBox } from "./JobBox";
import { GetAllSubmissionsType } from "@/app/data/admin/submission/get-all-submissions";
import { loadMoreSubmissions } from "@/app/data/admin/submission/load-more-submissions";
import { SubmissionBox } from "./SubmissionBox";

interface Props {
  initialSubmissions: GetAllSubmissionsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function AllSubmissionsList({
  initialSubmissions,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const [submissions, setSubmissions] =
    useState<GetAllSubmissionsType[]>(initialSubmissions);
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
      const result = await loadMoreSubmissions(nextPage, query);

      if (result.success && result.data) {
        setSubmissions((prevSubmissions) => {
          const combined = [...prevSubmissions, ...result.data.submissions];
          // ✅ Deduplicate by id
          const unique = Array.from(
            new Map(combined.map((u) => [u.id, u])).values()
          );
          return unique;
        });
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more submissions");
      }
    } catch (err) {
      setError("Failed to load more submissions");
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
    setSubmissions(initialSubmissions);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query]); // ✅ not watching initialUsers/initialHasNext

  return (
    <div>
      {submissions.map((submission, index) => (
        <SubmissionBox
          createdAt={submission.createdAt}
          status={submission.status}
          image={submission.User.image!}
          index={index}
          name={submission.User.name}
          key={submission.id}
          reward={submission.Job.reward!}
          slug={submission.Job.slug!}
          title={submission.Job.title}
          username={submission.User.username!}
          id={submission.id}
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
                Loading more submissions...
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
                Scroll to load more submissions
              </p>
              <Button size={"md"} onClick={loadMore}>
                Load More ({submissions.length} of {initialTotal})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
