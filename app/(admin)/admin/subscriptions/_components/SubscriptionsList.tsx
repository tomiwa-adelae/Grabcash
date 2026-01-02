"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";
import { loadMoreSubscriptions } from "@/app/data/admin/subscription/load-more-subscriptions";
import { SubscriptionBox } from "@/app/(admin)/_components/SubscriptionBox";
import { GetSubscriptionsType } from "@/app/data/admin/subscription/get-subscriptions";
import { EmptyState } from "@/components/EmptyState";

interface Props {
  initialSubscriptions: GetSubscriptionsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function SubscriptionsList({
  initialSubscriptions,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const [subscriptions, setSubscriptions] =
    useState<GetSubscriptionsType[]>(initialSubscriptions);
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
      const result = await loadMoreSubscriptions(nextPage, query);

      if (result.success && result.data) {
        setSubscriptions((prevSubscriptions) => {
          const combined = [...prevSubscriptions, ...result.data.subscriptions];
          // ✅ Deduplicate by id
          const unique = Array.from(
            new Map(combined.map((u) => [u.id, u])).values()
          );
          return unique;
        });
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more subscriptions");
      }
    } catch (err) {
      setError("Failed to load more subscriptions");
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
    setSubscriptions(initialSubscriptions);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query]); // ✅ not watching initialUsers/initialHasNext

  return (
    <div>
      {subscriptions.length === 0 && (
        <EmptyState title="No subscriptions yet" />
      )}
      {subscriptions.map((subscription, index) => (
        <SubscriptionBox
          amount={subscription.payment?.amount!}
          billingCycle={subscription.plan.billingCycle}
          endDate={subscription.endDate}
          startDate={subscription.startDate}
          image={subscription.user.image!}
          name={subscription.user.name}
          status={subscription.status}
          username={subscription.user.username!}
          index={index}
          key={index}
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
                Loading more subscriptions...
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
                Scroll to load more subscriptions
              </p>
              <Button size={"md"} onClick={loadMore}>
                Load More ({subscriptions.length} of {initialTotal})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
