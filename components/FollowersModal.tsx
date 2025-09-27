"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserBox } from "./UserBox";
import { FollowersType } from "@/app/data/follow/followers";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import { loadMoreFollowers } from "@/app/data/follow/load-more-followers";
import { useRef, useState, useEffect, useCallback } from "react";
import { Loader } from "./Loader";

interface Props {
  open: boolean;
  closeModal: () => void;
  followers: FollowersType[];
  userId: string;
  hasNext: boolean;
  query?: string;
}

export function FollowersModal({
  open,
  closeModal,
  followers: initialFollowers,
  userId,
  hasNext: initialHasNext,
  query,
}: Props) {
  const [followers, setFollowers] = useState<FollowersType[]>(initialFollowers);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const result = await loadMoreFollowers(userId, nextPage, query);

      if (result.success && result.data) {
        setFollowers((prev) => {
          const newFollowers = [...prev, ...result.data.followers];
          return newFollowers;
        });
        setPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more followers");
      }
    } catch (err) {
      setError("Failed to load more followers");
    } finally {
      setIsLoading(false);
    }
  }, [userId, page, query, hasNext, isLoading]);

  // Intersection Observer setup
  useEffect(() => {
    if (!open || !hasNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNext && !isLoading) {
          loadMore();
        }
      },
      {
        root: scrollContainerRef.current,
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
  }, [loadMore, hasNext, isLoading, open]);

  // Alternative scroll-based approach as fallback
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && hasNext && !isLoading) {
        loadMore();
      }
    },
    [loadMore, hasNext, isLoading]
  );

  // Reset state when modal opens/closes or query changes
  useEffect(() => {
    if (open) {
      setFollowers(initialFollowers);
      setPage(1);
      setHasNext(initialHasNext);
      setError(null);
      setIsLoading(false);
    }
  }, [open, initialFollowers, initialHasNext, query]);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="overflow-hidden flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Followers ({followers.length})
          </DialogTitle>
          <div className="py-2 border-b">
            <div className="container">
              <SearchBar />
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto flex-1 max-h-96"
            onScroll={handleScroll}
          >
            {followers.map((follower, index) => (
              <UserBox
                key={`${follower.id}-${index}`} // Better key to handle duplicates
                image={follower.image}
                name={follower.name}
                username={follower.username}
                id={follower.id}
                isFollowing={follower.isFollowing}
                isSelf={follower.isSelf}
              />
            ))}
            {/* Loading trigger element */}
            {hasNext && (
              <div
                ref={observerRef}
                className="flex justify-center py-6"
                style={{ minHeight: "60px" }}
              >
                {isLoading ? (
                  <Loader text="" />
                ) : (
                  <Button
                    size="md"
                    onClick={loadMore}
                    className="text-sm underline"
                  >
                    Load more followers
                  </Button>
                )}
              </div>
            )}

            {error && (
              <div className="text-center py-4">
                <p className="text-destructive text-sm">{error}</p>
                <Button
                  size="md"
                  onClick={loadMore}
                  className="mt-2"
                  disabled={isLoading}
                >
                  Try Again
                </Button>
              </div>
            )}

            {followers.length === 0 && !isLoading && (
              <div className="text-center py-8 text-muted-foreground">
                No followers found
              </div>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
