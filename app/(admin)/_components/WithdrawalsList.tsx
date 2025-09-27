"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";
import { SubmissionBox } from "./SubmissionBox";
import { PaymentBox } from "./PaymentBox";
import { GetAllWithdrawalsType } from "@/app/data/admin/job/payment/get-all-withdrawals";
import { loadMoreAllWithdrawals } from "@/app/data/admin/job/payment/load-more-all-withdrawals";
import { WithdrawalBox } from "./WithdrawalBox";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";

interface Props {
  initialWithdrawals: GetAllWithdrawalsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function WithdrawalsList({
  initialWithdrawals,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const [withdrawals, setWithdrawals] =
    useState<GetAllWithdrawalsType[]>(initialWithdrawals);
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
      const result = await loadMoreAllWithdrawals(nextPage, query);

      if (result.success && result.data) {
        setWithdrawals((prevWithdrawals) => {
          const combined = [...prevWithdrawals, ...result.data.withdrawals];
          // ✅ Deduplicate by id
          const unique = Array.from(
            new Map(combined.map((u) => [u.id, u])).values()
          );
          return unique;
        });
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more withdrawals");
      }
    } catch (err) {
      setError("Failed to load more withdrawals");
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
    setWithdrawals(initialWithdrawals);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query]); // ✅ not watching initialUsers/initialHasNext

  return (
    <div>
      {withdrawals.map((withdrawal, index) => (
        <WithdrawalBox
          key={withdrawal.id}
          index={index}
          status={withdrawal.status}
          createdAt={withdrawal.createdAt}
          amount={withdrawal.amount}
          image={withdrawal.User.image || DEFAULT_PROFILE_PICTURE}
          name={withdrawal.User.name}
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
                Loading more withdrawals...
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
                Scroll to load more withdrawals
              </p>
              <Button size={"md"} onClick={loadMore}>
                Load More ({withdrawals.length} of {initialTotal})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
