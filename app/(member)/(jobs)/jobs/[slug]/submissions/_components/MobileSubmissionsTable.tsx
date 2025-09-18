"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate, formattedStatus } from "@/lib/utils";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { GetJobApplicantsType } from "@/app/data/user/job/submitted/get-job-applicants";
import { loadMoreApplicants } from "@/app/data/user/job/submitted/load-more-applicants";
import { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  applicants: GetJobApplicantsType[];
  slug: string;
  hasNext: boolean;
  query?: string;
  initialPage?: number;
}

export function MobileSubmissionsTable({
  applicants: initialApplicants,
  slug,
  hasNext: initialHasNext,
  query,
  initialPage = 1,
}: Props) {
  const [applicants, setApplicants] =
    useState<GetJobApplicantsType[]>(initialApplicants);
  const [page, setPage] = useState(initialPage);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const result = await loadMoreApplicants(slug, nextPage, query);

      if (result.success && result.data) {
        setApplicants((prev) => [...prev, ...result.data.applicantsData]);
        setPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more applicants");
      }
    } catch (err) {
      setError("Failed to load more applicants");
      console.error("Error loading applicants:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug, page, query, hasNext, isLoading]);

  useEffect(() => {
    if (!hasNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNext && !isLoading) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [loadMore, hasNext, isLoading]);

  useEffect(() => {
    setApplicants(initialApplicants);
    setPage(initialPage);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query, initialApplicants, initialHasNext, initialPage]);

  if (applicants.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="sm:hidden space-y-4">
      {applicants.map((applicant, index) => (
        <div
          key={`${applicant.id}-${index}`}
          className="border rounded-lg p-4 space-y-3"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-medium">
                <Link
                  href={`/${applicant.User.username}`}
                  className="hover:underline hover:text-primary transition-all"
                >
                  {applicant.User.name}
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                <Link href={`/${applicant.User.username}`}>
                  @{applicant.User.username}
                </Link>
              </div>
            </div>
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
          </div>

          <div className="flex items-center justify-between">
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
            <span className="text-sm text-muted-foreground">
              {formatDate(applicant.createdAt)}
            </span>
          </div>
        </div>
      ))}

      {/* Loading trigger */}
      {hasNext && (
        <div ref={observerRef} className="flex justify-center py-6">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">
                Loading more submissions...
              </span>
            </div>
          ) : (
            <button
              onClick={loadMore}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Load more submissions
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={loadMore}
            className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            Try Again
          </button>
        </div>
      )}

      {!hasNext && applicants.length > 0 && (
        <div className="text-center py-4 text-sm text-gray-500">
          You've reached the end ({applicants.length} submissions)
        </div>
      )}
    </div>
  );
}
