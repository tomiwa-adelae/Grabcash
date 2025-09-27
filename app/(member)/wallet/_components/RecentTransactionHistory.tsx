"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { PayoutBox } from "./PayoutBox";
import { GetMyPayoutsType } from "@/app/data/user/wallet/get-my-payouts";
import { loadMoreMyPayouts } from "@/app/data/user/wallet/load-more-my-payouts";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { SearchBar } from "../../_components/SearchBar";
import { EmptyState } from "@/components/EmptyState";

interface Props {
  initialPayouts: GetMyPayoutsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export const RecentTransactionHistory = ({
  initialPayouts,
  initialHasNext,
  initialTotal,
  query,
}: Props) => {
  const [payouts, setPayouts] = useState<GetMyPayoutsType[]>(initialPayouts);
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
      const result = await loadMoreMyPayouts(nextPage, query);

      if (result.success && result.data) {
        setPayouts((prevPayouts) => [...prevPayouts, ...result.data.payouts]);
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more payouts");
      }
    } catch (err) {
      setError("Failed to load more payouts");
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
    setPayouts(initialPayouts);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query, initialPayouts, initialHasNext]);

  return (
    <div
      className="border-border bg-card/40 rounded-xl border p-6"
      id="history"
    >
      <h3 className="mb-4 text-xl font-semibold">Transaction History</h3>
      <SearchBar />
      {payouts.length === 0 && (
        <EmptyState
          title="No history"
          description="Once you've made a transactions, they would appear here"
        />
      )}
      <div className="mt-4 space-y-3">
        {payouts.map((payout, index) => (
          <PayoutBox
            key={payout.id}
            index={index}
            status={payout.status}
            createdAt={payout.createdAt}
            amount={payout.amount}
            type={payout.type!}
            title={payout.title || "Withdrawal"}
          />
        ))}
        {/* Observer sentinel row - this is what gets watched */}
        {hasNext && (
          <div
            className="group hover:bg-accent/50 flex cursor-pointer items-start gap-4 rounded-lg p-2 transition-colors sm:items-center"
            ref={sentinelRef}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader text="" />
                <span className="text-sm text-muted-foreground">
                  Loading more payouts...
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
                  Scroll to load more payouts
                </p>
                <Button size={"md"} onClick={loadMore}>
                  Load More ({payouts.length} of {initialTotal})
                </Button>
              </div>
            )}
          </div>
        )}

        {/* End state */}
        {!hasNext && payouts.length > 0 && (
          <div className="flex items-center text-xs justify-center space-x-2">
            All payouts loaded ({payouts.length} total)
          </div>
        )}
      </div>
    </div>
  );
};
