"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formattedStatus } from "@/lib/utils";
import Link from "next/link";
import { GetJobApplicantsType } from "@/app/data/user/job/submitted/get-job-applicants";
import { useRef, useState, useEffect, useCallback } from "react";
import { SubmissionActions } from "./SubmissionActions";
import { RejectSubmissionModal } from "./RejectSubmissionModal";
import { loadMoreApplicants } from "@/app/data/admin/job/submission/load-more-applicants";

interface Props {
  applicants: GetJobApplicantsType[];
  slug: string;
  hasNext: boolean;
  query?: string;
  initialPage?: number;
}

export function SubmissionsCard({
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

  const [selectedApplicant, setSelectedApplicant] =
    useState<GetJobApplicantsType>();
  const [openRejectModal, setOpenRejectModal] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const result = await loadMoreApplicants(slug, nextPage, query, 2);

      if (result.success && result.data) {
        setApplicants((prev) => [...prev, ...result.data.applicantsData]);
        setPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more applicants");
      }
    } catch (err) {
      setError("Failed to load more applicants");
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
    <div className="sm:hidden grid gap-4">
      {applicants.map((applicant, index) => (
        <div
          key={`${applicant.id}-${index}`}
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
                {/* Header with name and actions */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Link
                      href={`/admin/${applicant.User.username}`}
                      className="text-lg font-semibold block hover:underline hover:text-primary transition-all"
                    >
                      {applicant.User.name}
                    </Link>
                    <Link
                      href={`/admin/${applicant.User.username}`}
                      className="hover:underline inline-block hover:text-primary transition-all text-muted-foreground text-sm"
                    >
                      @{applicant.User.username}
                    </Link>
                  </div>
                  <SubmissionActions
                    status={applicant.status}
                    slug={slug}
                    id={applicant.id}
                    onReject={() => {
                      setSelectedApplicant(applicant);
                      setOpenRejectModal(true);
                    }}
                  />
                </div>

                {/* Status and date */}
                <div className="flex items-center justify-between mb-4">
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(applicant.createdAt)}
                  </span>
                </div>

                {/* Application ID */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  ID: {applicant.applicationID}
                </p>

                {/* Action button */}
                <Button className="w-full" asChild size="md">
                  <Link
                    href={`/admin/jobs/${slug}/submissions/${applicant.id}`}
                  >
                    View Submission
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Loading trigger with same card design */}
      {hasNext && (
        <div
          ref={observerRef}
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
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-600">
                      Loading more submissions...
                    </span>
                  </div>
                ) : (
                  <Button size="md" onClick={loadMore}>
                    Load more submissions
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error card */}
      {error && (
        <div className="relative mx-auto w-full rounded-lg border border-dashed border-red-300 px-4 sm:px-6 md:px-8 dark:border-red-800">
          <div className="absolute top-4 left-0 -z-0 h-px w-full bg-red-400 sm:top-6 md:top-8 dark:bg-red-700" />
          <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-red-400 sm:bottom-6 md:bottom-8 dark:bg-red-700" />
          <div className="relative w-full border-x border-red-400 dark:border-red-700">
            <div className="relative z-20 mx-auto py-8">
              <div className="px-6 text-center">
                <p className="text-red-600 text-sm mb-2">{error}</p>
                <Button size="md" onClick={loadMore} disabled={isLoading}>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal rendered outside the table */}
      {openRejectModal && selectedApplicant && (
        <RejectSubmissionModal
          open={openRejectModal}
          closeModal={() => setOpenRejectModal(false)}
          applicantName={selectedApplicant.User.name}
          jobTitle={selectedApplicant.Job.title}
          slug={slug}
          applicantId={selectedApplicant.id}
        />
      )}
    </div>
  );
}
