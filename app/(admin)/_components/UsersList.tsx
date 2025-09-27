"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";
import { UserBox } from "./UserBox";
import { GetTotalUsersType } from "@/app/data/admin/user/get-total-users";
import { loadMoreUsers } from "@/app/data/admin/user/load-more-users";

interface Props {
  initialUsers: GetTotalUsersType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function UsersList({
  initialUsers,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const router = useRouter();

  const [users, setUsers] = useState<GetTotalUsersType[]>(initialUsers);
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
      const result = await loadMoreUsers(nextPage, query);

      if (result.success && result.data) {
        setUsers((prevUsers) => {
          const combined = [...prevUsers, ...result.data.users];
          // ✅ Deduplicate by id
          const unique = Array.from(
            new Map(combined.map((u) => [u.id, u])).values()
          );
          return unique;
        });
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more users");
      }
    } catch (err) {
      setError("Failed to load more users");
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
    setUsers(initialUsers);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query]); // ✅ not watching initialUsers/initialHasNext

  return (
    <div>
      {users.map((user, index) => (
        <UserBox
          index={index}
          country={user.country}
          createdAt={user.createdAt}
          email={user.email}
          name={user.name}
          image={user.image}
          isAdmin={user.isAdmin}
          status={user.status}
          key={user.id}
          username={user.username!}
          id={user.id}
          jobs={user._count.jobs}
          applicants={user._count.applicants}
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
                Loading more users...
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
                Scroll to load more users
              </p>
              <Button size={"md"} onClick={loadMore}>
                Load More ({users.length} of {initialTotal})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
