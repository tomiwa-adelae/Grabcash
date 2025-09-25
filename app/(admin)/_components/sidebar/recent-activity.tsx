// "use client";

// import { memo, useCallback, useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { User, Download, Settings, Users } from "lucide-react";
// import { loadMoreAllActivities } from "@/app/data/admin/activity/load-more-all-activities";
// import { Button } from "@/components/ui/button";
// import { Loader } from "@/components/Loader";
// import { GetAllActivitiesType } from "@/app/data/admin/activity/get-all-activities";

// const activities = [
//   {
//     action: "User login",
//     user: "john@example.com",
//     time: "2 min ago",
//     icon: User,
//     color: "text-blue-500",
//   },
//   {
//     action: "Data export",
//     user: "admin",
//     time: "5 min ago",
//     icon: Download,
//     color: "text-green-500",
//   },
//   {
//     action: "Settings updated",
//     user: "admin",
//     time: "10 min ago",
//     icon: Settings,
//     color: "text-orange-500",
//   },
//   {
//     action: "New user registered",
//     user: "sarah@example.com",
//     time: "15 min ago",
//     icon: Users,
//     color: "text-purple-500",
//   },
// ];

// interface Props {
//   initialActivities: GetAllActivitiesType[];
//   initialHasNext: boolean;
//   initialTotal: number;
//   query?: string;
// }

// export const RecentActivity = ({
//   initialActivities,
//   initialHasNext,
//   initialTotal,
//   query,
// }: Props) => {
//   const [activities, setActivities] =
//     useState<GetAllActivitiesType[]>(initialActivities);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasNext, setHasNext] = useState(initialHasNext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Observer refs
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const sentinelRef = useRef<HTMLDivElement>(null);

//   const loadMore = useCallback(async () => {
//     if (isLoading || !hasNext) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const nextPage = currentPage + 1;
//       const result = await loadMoreAllActivities(nextPage, query);

//       if (result.success && result.data) {
//         setActivities((prevActivities) => {
//           const combined = [...prevActivities, ...result.data.activities];
//           // ✅ Deduplicate by id
//           const unique = Array.from(
//             new Map(combined.map((u) => [u.id, u])).values()
//           );
//           return unique;
//         });
//         setCurrentPage(nextPage);
//         setHasNext(result.data.pagination.hasNext);
//       } else {
//         setError(result.error || "Failed to load more activities");
//       }
//     } catch (err) {
//       setError("Failed to load more activities");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentPage, hasNext, isLoading, query]);

//   // Set up intersection observer
//   useEffect(() => {
//     if (observerRef.current) {
//       observerRef.current.disconnect();
//     }

//     if (!hasNext || !sentinelRef.current) return;

//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];
//         if (entry.isIntersecting && hasNext && !isLoading) {
//           loadMore();
//         }
//       },
//       {
//         root: null,
//         rootMargin: "200px",
//         threshold: 0,
//       }
//     );

//     observerRef.current.observe(sentinelRef.current);

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [loadMore, hasNext, isLoading]);

//   // Reset only when query changes
//   useEffect(() => {
//     setActivities(initialActivities);
//     setCurrentPage(1);
//     setHasNext(initialHasNext);
//     setError(null);
//     setIsLoading(false);
//   }, [query]); // ✅ not watching initialUsers/initialHasNext

//   return (
//     <div className="border-border bg-card/40 rounded-xl border p-6">
//       <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
//       <div className="space-y-3">
//         {/* {activities.map((activity, index) => {
//           const Icon = activity.icon;
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="hover:bg-accent/50 flex items-center gap-3 rounded-lg p-2 transition-colors"
//             >
//               <div className={`bg-accent/50 rounded-lg p-2`}>
//                 <Icon className={`h-4 w-4 ${activity.color}`} />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="text-sm font-medium">{activity.action}</div>
//                 <div className="text-muted-foreground truncate text-xs">
//                   {activity.user}
//                 </div>
//               </div>
//               <div className="text-muted-foreground text-xs">
//                 {activity.time}
//               </div>
//             </motion.div>
//           );
//         })} */}
//         {activities.map((activity) => {
//           const Icon = activity.icon;
//           return (
//             <motion.div
//               key={activity.id} // ✅ use stable key
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.05 }}
//               className="hover:bg-accent/50 flex items-center gap-3 rounded-lg p-2 transition-colors"
//             >
//               <div className={`bg-accent/50 rounded-lg p-2`}>
//                 <Icon className={`h-4 w-4 ${activity.color}`} />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="text-sm font-medium">{activity.action}</div>
//                 <div className="text-muted-foreground truncate text-xs">
//                   {activity.user}
//                 </div>
//               </div>
//               <div className="text-muted-foreground text-xs">
//                 {activity.time}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//       {/* Observer sentinel */}
//       {hasNext && (
//         <div
//           ref={sentinelRef}
//           className="group hover:bg-accent/50 rounded-lg p-4 transition-colors items-center text-center text-muted-foreground text-sm"
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center space-x-2">
//               <Loader text="" />
//               <span className="text-sm text-muted-foreground">
//                 Loading more activities...
//               </span>
//             </div>
//           ) : error ? (
//             <div>
//               <p className="text-red-600 text-sm mb-2">{error}</p>
//               <Button size={"md"} variant={"destructive"} onClick={loadMore}>
//                 Try Again
//               </Button>
//             </div>
//           ) : (
//             <div>
//               <p className="text-muted-foreground text-sm mb-2">
//                 Scroll to load more activities
//               </p>
//               <Button size={"md"} onClick={loadMore}>
//                 Load More ({activities.length} of {initialTotal})
//               </Button>
//             </div>
//           )}
//         </div>
//       )}

//       {!hasNext && activities.length > 0 && (
//         <div className="group hover:bg-accent/50 rounded-lg p-4 transition-colors items-center text-center text-muted-foreground text-sm">
//           All activities loaded ({activities.length} total)
//         </div>
//       )}
//     </div>
//   );
// };

"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, Users, Briefcase, DollarSign } from "lucide-react";
import { GetAllActivitiesType } from "@/app/data/admin/activity/get-all-activities";
import { loadMoreAllActivities } from "@/app/data/admin/activity/load-more-all-activities";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { IconCarambolaFilled, IconUserPlus } from "@tabler/icons-react";

interface Props {
  initialActivities: GetAllActivitiesType[];
  initialHasNext: boolean;
  initialTotal: number;
  query?: string;
}

// Map type string -> icon + color
const activityIconMap: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  USER_REGISTERED: { icon: IconUserPlus, color: "text-purple-500" },
  JOB_POSTED: { icon: Briefcase, color: "text-blue-500" },
  USER_UPGRADED: { icon: IconCarambolaFilled, color: "text-blue-500" },
  PAYOUT_COMPLETED: { icon: DollarSign, color: "text-green-500" },
  SYSTEM: { icon: Settings, color: "text-orange-500" },
  DEFAULT: { icon: User, color: "text-gray-500" },
};

export const RecentActivity = ({
  initialActivities,
  initialHasNext,
  initialTotal,
  query,
}: Props) => {
  const [activities, setActivities] =
    useState<GetAllActivitiesType[]>(initialActivities);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  console.log(activities);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const result = await loadMoreAllActivities(nextPage, query);

      if (result.success && result.data) {
        setActivities((prev) => {
          const combined = [...prev, ...result.data.activities];
          const unique = Array.from(
            new Map(combined.map((u) => [u.id, u])).values()
          );
          return unique;
        });
        setCurrentPage(nextPage);
        setHasNext(result.data.pagination.hasNext);
      } else {
        setError(result.error || "Failed to load more activities");
      }
    } catch (err) {
      setError("Failed to load more activities");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasNext, isLoading, query]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!hasNext || !sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !isLoading) loadMore();
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [loadMore, hasNext, isLoading]);

  // Reset when query changes
  useEffect(() => {
    setActivities(initialActivities);
    setCurrentPage(1);
    setHasNext(initialHasNext);
    setError(null);
    setIsLoading(false);
  }, [query]);

  return (
    <div className="border-border bg-card/40 rounded-xl border p-6">
      <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => {
          const { icon: Icon, color } =
            activityIconMap[activity.type] || activityIconMap.DEFAULT;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="hover:bg-accent/50 flex items-center gap-3 rounded-lg p-2 transition-colors"
            >
              <div className="bg-accent/50 rounded-lg p-2">
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium line-clamp-2">
                  {activity.action}
                </div>
                <div className="text-muted-foreground truncate text-xs">
                  {activity.user}
                </div>
              </div>
              <div className="text-muted-foreground text-xs">
                {activity.time}
              </div>
            </motion.div>
          );
        })}
      </div>

      {hasNext && (
        <div
          ref={sentinelRef}
          className="group hover:bg-accent/50 rounded-lg p-4 transition-colors text-center text-muted-foreground text-sm"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader text="" />
              <span>Loading more activities...</span>
            </div>
          ) : error ? (
            <div>
              <p className="text-red-600 text-sm mb-2">{error}</p>
              <Button size="md" variant="destructive" onClick={loadMore}>
                Try Again
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground text-sm mb-2">
                Scroll to load more activities
              </p>
              <Button size="md" onClick={loadMore}>
                Load More ({activities.length} of {initialTotal})
              </Button>
            </div>
          )}
        </div>
      )}

      {!hasNext && activities.length > 0 && (
        <div className="group hover:bg-accent/50 rounded-lg p-4 text-center text-muted-foreground text-sm">
          All activities loaded ({activities.length} total)
        </div>
      )}
    </div>
  );
};
