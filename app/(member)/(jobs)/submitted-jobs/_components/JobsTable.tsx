// import { GetMySubmittedJobsType } from "@/app/data/user/job/submitted/get-my-submitted-jobs";
// import { NairaIcon } from "@/components/NairaIcon";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { formatMoneyInput, formattedStatus } from "@/lib/utils";
// import { EllipsisIcon } from "lucide-react";
// import Link from "next/link";

// interface Props {
//   jobs: GetMySubmittedJobsType[];
// }

// export function JobsTable({ jobs }: Props) {
//   return (
//     <div className="[&>div]:max-h-screen hidden sm:block">
//       <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
//         <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
//           <TableRow className="hover:bg-transparent">
//             <TableHead>Job Title</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Rewards</TableHead>
//             <TableHead className="text-right"></TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {jobs.map((job) => (
//             <TableRow key={job.id}>
//               <TableCell className="font-medium">
//                 <Link
//                   href={`/available-jobs/${job.Job.slug}`}
//                   className="hover:underline hover:text-primary transition-all"
//                 >
//                   {job.Job.title}
//                 </Link>
//               </TableCell>
//               <TableCell>{job.Job.category}</TableCell>
//               <TableCell>
//                 <Badge
//                   variant={
//                     job.status === "PENDING"
//                       ? "pending"
//                       : job.status === "APPROVED"
//                         ? "default"
//                         : job.status === "REJECTED"
//                           ? "destructive"
//                           : "default"
//                   }
//                 >
//                   {formattedStatus[job.status]}
//                 </Badge>
//               </TableCell>
//               <TableCell>
//                 <NairaIcon />
//                 {formatMoneyInput(job.Job.reward)}
//               </TableCell>
//               <TableCell className="text-right">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       size="icon"
//                       variant="outline"
//                       className="rounded-full shadow-none"
//                       aria-label="Open edit menu"
//                     >
//                       <EllipsisIcon size={16} aria-hidden="true" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuItem asChild>
//                       <Link href={`/submitted-jobs/${job.id}`}>
//                         View details
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem>Cancel submission</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";

import { GetMySubmittedJobsType } from "@/app/data/user/job/submitted/get-my-submitted-jobs";
import { NairaIcon } from "@/components/NairaIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoneyInput, formattedStatus } from "@/lib/utils";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { loadMoreSubmittedJobs } from "@/app/data/user/job/submitted/load-more-submitted-jobs";
import { useState, useRef, useEffect, useCallback } from "react";
import { Loader } from "@/components/Loader";

interface Props {
  initialJobs: GetMySubmittedJobsType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

export function JobsTable({
  initialJobs,
  initialHasNext,
  initialTotal,
  query,
}: Props) {
  const [jobs, setJobs] = useState<GetMySubmittedJobsType[]>(initialJobs);
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
      const result = await loadMoreSubmittedJobs(nextPage, query);

      if (result.success && result.data) {
        setJobs((prevJobs) => [...prevJobs, ...result.data.jobs]);
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more submissions");
      }
    } catch (err) {
      console.error("Load more error:", err);
      setError("Failed to load more submissions");
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
    setJobs(initialJobs);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query, initialJobs, initialHasNext]);

  return (
    <div className="[&>div]:max-h-screen hidden sm:block">
      <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
        <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
          <TableRow className="hover:bg-transparent">
            <TableHead>Job Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rewards</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow key={`${job.id}-${index}`}>
              <TableCell className="font-medium">
                <Link
                  href={`/available-jobs/${job.Job.slug}`}
                  className="hover:underline hover:text-primary transition-all"
                >
                  {job.Job.title}
                </Link>
              </TableCell>
              <TableCell>{job.Job.category}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    job.status === "PENDING"
                      ? "pending"
                      : job.status === "APPROVED"
                        ? "default"
                        : job.status === "REJECTED"
                          ? "destructive"
                          : "default"
                  }
                >
                  {formattedStatus[job.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <NairaIcon />
                {formatMoneyInput(job.Job.reward)}
              </TableCell>
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
                      <Link href={`/submitted-jobs/${job.id}`}>
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Cancel submission</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {/* Observer sentinel row - this is what gets watched */}
          {hasNext && (
            <TableRow ref={sentinelRef}>
              <TableCell colSpan={5} className="text-center py-6">
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
                    <Button
                      size="md"
                      variant={"destructive"}
                      onClick={loadMore}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">
                      Scroll to load more submissions
                    </p>
                    <Button size="md" onClick={loadMore}>
                      Load More ({jobs.length} of {initialTotal})
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}

          {/* End state */}
          {!hasNext && jobs.length > 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-4 text-sm text-muted-foreground"
              >
                All submissions loaded ({jobs.length} total)
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
