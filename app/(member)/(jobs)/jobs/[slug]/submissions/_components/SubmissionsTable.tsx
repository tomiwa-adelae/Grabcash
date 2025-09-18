"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formattedStatus } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetJobApplicantsType } from "@/app/data/user/job/submitted/get-job-applicants";
import { Badge } from "@/components/ui/badge";
import { loadMoreApplicants } from "@/app/data/user/job/submitted/load-more-applicants";
import { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  applicants: GetJobApplicantsType[];
  slug: string;
  hasNext: boolean;
  query?: string;
  initialPage?: number;
  totalCount?: number; // Add this for debugging
}

export function SubmissionsTable({
  applicants: initialApplicants,
  slug,
  hasNext: initialHasNext,
  query,
  initialPage = 1,
  totalCount = 0,
}: Props) {
  const router = useRouter();

  const [applicants, setApplicants] =
    useState<GetJobApplicantsType[]>(initialApplicants);
  const [page, setPage] = useState(initialPage);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLTableRowElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const result = await loadMoreApplicants(slug, nextPage, query, 2); // Explicit limit of 2

      if (result.success && result.data) {
        setApplicants((prev) => {
          const newApplicants = [...prev, ...result.data.applicantsData];
          return newApplicants;
        });
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

  // Scroll-based loading as primary method
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage > 0.9 && hasNext && !isLoading) {
        loadMore();
      }
    },
    [loadMore, hasNext, isLoading]
  );

  // Intersection Observer as backup
  useEffect(() => {
    if (!hasNext || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNext && !isLoading) {
          loadMore();
        }
      },
      {
        rootMargin: "50px",
        threshold: [0, 0.1, 0.5, 1.0], // Multiple thresholds for better debugging
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

  // Reset state when query changes
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
    <div className="[&>div]:max-h-screen hidden sm:block">
      <div
        ref={tableContainerRef}
        className="overflow-auto max-h-96"
        onScroll={handleScroll}
      >
        <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant, index) => (
              <TableRow
                className="cursor-pointer"
                key={`${applicant.id}-${page}-${index}`}
                ref={index === applicants.length - 1 ? observerRef : null}
              >
                <TableCell className="font-medium">
                  <Link
                    href={`/${applicant.User.username}`}
                    className="hover:underline hover:text-primary transition-all"
                  >
                    {applicant.User.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    className="hover:underline hover:text-primary transition-all"
                    href={`/${applicant.User.username}`}
                  >
                    @{applicant.User.username}
                  </Link>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{formatDate(applicant.createdAt)}</TableCell>
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
                        <Link
                          href={`/jobs/${slug}/submissions/${applicant.id}`}
                        >
                          View Submission
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Approve submission</DropdownMenuItem>
                      <DropdownMenuItem>Reject submission</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {/* Loading/More button row */}
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-600">
                      Loading more submissions...
                    </span>
                  </div>
                ) : hasNext ? (
                  <Button
                    size={"md"}
                    onClick={() => {
                      loadMore();
                    }}
                  >
                    Load More ({applicants.length} of {totalCount})
                  </Button>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    You've reached the end ({applicants.length} submissions)
                  </div>
                )}
              </TableCell>
            </TableRow>

            {/* Error row */}
            {error && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  <p className="text-red-600 text-sm">{error}</p>
                  <Button
                    size={"md"}
                    onClick={loadMore}
                    className="mt-2"
                    disabled={isLoading}
                  >
                    Try Again
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
