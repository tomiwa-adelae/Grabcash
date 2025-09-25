"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";
import { SubmissionBox } from "./SubmissionBox";
import { GetAllPaymentsType } from "@/app/data/admin/job/payment/get-all-payments";
import { loadMoreAllPayments } from "@/app/data/admin/job/payment/load-more-all-payments";
import { PaymentBox } from "./PaymentBox";

interface Props {
  initialPayments: GetAllPaymentsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function PaymentsList({
  initialPayments,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const [payments, setPayments] =
    useState<GetAllPaymentsType[]>(initialPayments);
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
      const result = await loadMoreAllPayments(nextPage, query);

      if (result.success && result.data) {
        setPayments((prevPayments) => {
          const combined = [...prevPayments, ...result.data.payments];
          // ✅ Deduplicate by id
          const unique = Array.from(
            new Map(combined.map((u) => [u.id, u])).values()
          );
          return unique;
        });
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more payments");
      }
    } catch (err) {
      setError("Failed to load more payments");
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
    setPayments(initialPayments);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query]); // ✅ not watching initialUsers/initialHasNext

  return (
    <div>
      {payments.map((payment, index) => (
        <PaymentBox
          title={payment.Job.title}
          amount={payment.amount}
          createdAt={payment.createdAt}
          image={payment.User.image!}
          index={index}
          name={payment.User.name}
          slug={payment.Job.slug!}
          key={index}
          status={payment.status}
          username={payment.User.username!}
          id={payment.id}
          paymentVerified={payment.Job.paymentVerified}
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
                Loading more payments...
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
                Scroll to load more payments
              </p>
              <Button size={"md"} onClick={loadMore}>
                Load More ({payments.length} of {initialTotal})
              </Button>
            </div>
          )}
        </div>
      )}

      {!hasNext && payments.length > 0 && (
        <div className="group hover:bg-accent/50 rounded-lg p-4 transition-colors items-center text-center text-muted-foreground text-sm">
          All payments loaded ({payments.length} total)
        </div>
      )}
    </div>
  );
}
