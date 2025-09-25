// // // import "server-only";
// // // import { prisma } from "@/lib/db";
// // // import { DEFAULT_LIMIT } from "@/constants";
// // // import { requireAdmin } from "../require-admin";

// // // export const getAllActivities = async ({
// // //   query,
// // //   page = 1,
// // //   limit = DEFAULT_LIMIT,
// // // }: Params = {}) => {
// // //   await requireAdmin();

// // //   const skip = (page - 1) * limit;

// // //   // Base query conditions
// // //   const whereConditions: any = {};

// // //   // Add search if provided
// // //   if (query) {
// // //     whereConditions.OR = [
// // //       { description: { contains: query, mode: "insensitive" } },
// // //       { metadata: { contains: query, mode: "insensitive" } },
// // //       {
// // //         user: {
// // //           OR: [
// // //             {
// // //               name: { contains: query, mode: "insensitive" },
// // //               email: { contains: query, mode: "insensitive" },
// // //               username: {
// // //                 contains: query,
// // //                 mode: "insensitive",
// // //               },
// // //             },
// // //           ],
// // //         },
// // //       },
// // //       {
// // //         job: {
// // //           OR: [
// // //             {
// // //               title: { contains: query, mode: "insensitive" },
// // //               reward: { contains: query, mode: "insensitive" },
// // //               description: {
// // //                 contains: query,
// // //                 mode: "insensitive",
// // //               },
// // //             },
// // //           ],
// // //         },
// // //       },
// // //     ];
// // //   }

// // //   // Get activities and total count
// // //   const [activities, totalCount] = await Promise.all([
// // //     prisma.recentActivity.findMany({
// // //       where: whereConditions,
// // //       orderBy: { createdAt: "desc" },
// // //       include: { user: true },
// // //       skip,
// // //       take: limit,
// // //     }),
// // //     prisma.recentActivity.count({
// // //       where: whereConditions,
// // //     }),
// // //   ]);

// // //   // Calculate pagination
// // //   const totalPages = Math.ceil(totalCount / limit);
// // //   const hasNext = page < totalPages;

// // //   return {
// // //     activities,
// // //     pagination: {
// // //       page,
// // //       limit,
// // //       total: totalCount,
// // //       totalPages,
// // //       hasNext,
// // //       hasPrev: page > 1,
// // //     },
// // //   };
// // // };

// // // export type GetAllActivitiesResponse = Awaited<
// // //   ReturnType<typeof getAllActivities>
// // // >;
// // // export type GetAllActivitiesType = GetAllActivitiesResponse["activities"][0];

// // import { DEFAULT_LIMIT } from "@/constants";
// // import { prisma } from "@/lib/db";
// // import { formatDistanceToNow } from "date-fns";
// // import {
// //   User,
// //   Download,
// //   Settings,
// //   Users,
// //   Briefcase,
// //   DollarSign,
// // } from "lucide-react";
// // import { requireAdmin } from "../require-admin";

// // const activityIconMap: Record<
// //   string,
// //   { icon: React.ElementType; color: string }
// // > = {
// //   USER: { icon: Users, color: "text-purple-500" },
// //   JOB: { icon: Briefcase, color: "text-blue-500" },
// //   PAYOUT: { icon: DollarSign, color: "text-green-500" },
// //   SYSTEM: { icon: Settings, color: "text-orange-500" },
// //   DEFAULT: { icon: User, color: "text-gray-500" },
// // };

// // export const getAllActivities = async ({
// //   query,
// //   page = 1,
// //   limit = DEFAULT_LIMIT,
// // }: Params = {}) => {
// //   await requireAdmin();

// //   const skip = (page - 1) * limit;

// //   const whereConditions: any = {};
// //   if (query) {
// //     whereConditions.OR = [
// //       { description: { contains: query, mode: "insensitive" } },
// //       { metadata: { contains: query, mode: "insensitive" } },
// //       {
// //         user: {
// //           OR: [
// //             { name: { contains: query, mode: "insensitive" } },
// //             { email: { contains: query, mode: "insensitive" } },
// //             { username: { contains: query, mode: "insensitive" } },
// //           ],
// //         },
// //       },
// //     ];
// //   }

// //   const [rawActivities, totalCount] = await Promise.all([
// //     prisma.recentActivity.findMany({
// //       where: whereConditions,
// //       orderBy: { createdAt: "desc" },
// //       include: { user: true, job: true },
// //       skip,
// //       take: limit,
// //     }),
// //     prisma.recentActivity.count({ where: whereConditions }),
// //   ]);

// //   // ✅ Normalize
// //   const activities = rawActivities.map((a) => {
// //     const { icon, color } = activityIconMap[a.type] || activityIconMap.DEFAULT;

// //     return {
// //       id: a.id,
// //       action: a.description || a.type,
// //       user: a.user?.email || a.user?.name || "System",
// //       time: formatDistanceToNow(new Date(a.createdAt), { addSuffix: true }),
// //       icon,
// //       color,
// //     };
// //   });

// //   const totalPages = Math.ceil(totalCount / limit);

// //   return {
// //     activities,
// //     pagination: {
// //       page,
// //       limit,
// //       total: totalCount,
// //       totalPages,
// //       hasNext: page < totalPages,
// //       hasPrev: page > 1,
// //     },
// //   };
// // };

// // export type GetAllActivitiesResponse = Awaited<
// //   ReturnType<typeof getAllActivities>
// // >;
// // export type GetAllActivitiesType = GetAllActivitiesResponse["activities"][0];

// // get-all-activities.ts
// import { formatDistanceToNow } from "date-fns";

// export const getAllActivities = async ({ query, page = 1, limit = DEFAULT_LIMIT }: Params = {}) => {
//   await requireAdmin();

//   const skip = (page - 1) * limit;

//   const whereConditions: any = {};
//   if (query) {
//     whereConditions.OR = [
//       { description: { contains: query, mode: "insensitive" } },
//       { metadata: { contains: query, mode: "insensitive" } },
//       {
//         user: {
//           OR: [
//             { name: { contains: query, mode: "insensitive" } },
//             { email: { contains: query, mode: "insensitive" } },
//             { username: { contains: query, mode: "insensitive" } },
//           ],
//         },
//       },
//     ];
//   }

//   const [rawActivities, totalCount] = await Promise.all([
//     prisma.recentActivity.findMany({
//       where: whereConditions,
//       orderBy: { createdAt: "desc" },
//       include: { user: true, job: true },
//       skip,
//       take: limit,
//     }),
//     prisma.recentActivity.count({ where: whereConditions }),
//   ]);

//   const activities = rawActivities.map((a) => ({
//     id: a.id,
//     action: a.description || a.type,
//     user: a.user?.email || a.user?.name || "System",
//     time: formatDistanceToNow(new Date(a.createdAt), { addSuffix: true }),
//     type: a.type || "DEFAULT", // ✅ only pass a string key
//   }));

//   const totalPages = Math.ceil(totalCount / limit);

//   return {
//     activities,
//     pagination: {
//       page,
//       limit,
//       total: totalCount,
//       totalPages,
//       hasNext: page < totalPages,
//       hasPrev: page > 1,
//     },
//   };
// };

import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";
import { formatDistanceToNow } from "date-fns";

interface Params {
  query?: string;
  page?: number;
  limit?: number;
}

export const getAllActivities = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: Params = {}) => {
  await requireAdmin();

  const skip = (page - 1) * limit;

  const whereConditions: any = {};
  if (query) {
    whereConditions.OR = [
      { description: { contains: query, mode: "insensitive" } },
      { metadata: { contains: query, mode: "insensitive" } },
      {
        user: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { username: { contains: query, mode: "insensitive" } },
          ],
        },
      },
      {
        job: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { reward: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
      },
    ];
  }

  const [rawActivities, totalCount] = await Promise.all([
    prisma.recentActivity.findMany({
      where: whereConditions,
      orderBy: { createdAt: "desc" },
      include: { user: true, job: true },
      skip,
      take: limit,
    }),
    prisma.recentActivity.count({ where: whereConditions }),
  ]);

  // Map to plain objects for client
  const activities = rawActivities.map((a) => ({
    id: a.id,
    action: a.description || a.type,
    user: a.user?.email || a.user?.name || "System",
    time: formatDistanceToNow(new Date(a.createdAt), { addSuffix: true }),
    type: a.type || "DEFAULT", // Only string
  }));

  const totalPages = Math.ceil(totalCount / limit);

  return {
    activities,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

export type GetAllActivitiesResponse = Awaited<
  ReturnType<typeof getAllActivities>
>;
export type GetAllActivitiesType = GetAllActivitiesResponse["activities"][0];
