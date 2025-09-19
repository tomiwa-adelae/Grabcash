// import "server-only";
// import { prisma } from "@/lib/db";
// import { requireUser } from "../../require-user";

// export const getMySubmittedJobs = async () => {
//   const { user } = await requireUser();
//   const jobs = await prisma.applicant.findMany({
//     where: {
//       userId: user.id,
//     },
//     select: {
//       id: true,
//       status: true,
//       applicationID: true,
//       Job: {
//         select: {
//           slug: true,
//           title: true,
//           category: true,
//           reward: true,
//         },
//       },
//     },
//   });

//   return jobs;
// };

// export type GetMySubmittedJobsType = Awaited<
//   ReturnType<typeof getMySubmittedJobs>
// >[0];

// app/data/user/job/submitted/get-my-submitted-jobs.ts
import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "../../require-user";
import { DEFAULT_LIMIT } from "@/constants";
import { requireSubscription } from "../../subscription/require-subscription";

interface GetMySubmittedJobsParams {
  query?: string;
  page?: number;
  limit?: number;
}

export const getMySubmittedJobs = async (
  params: GetMySubmittedJobsParams = {}
) => {
  const { query, page = 1, limit = DEFAULT_LIMIT } = params;

  const { user } = await requireUser();
  await requireSubscription();

  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {
    userId: user.id,
  };

  // Add search if provided
  if (query) {
    whereConditions.OR = [
      { applicationID: { contains: query, mode: "insensitive" } },
      {
        Job: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { category: { contains: query, mode: "insensitive" } },
            { reward: { contains: query, mode: "insensitive" } },
          ],
        },
      },
    ];
  }

  // Get jobs and total count
  const [jobs, totalCount] = await Promise.all([
    prisma.applicant.findMany({
      where: whereConditions,
      select: {
        id: true,
        status: true,
        applicationID: true,
        createdAt: true,
        Job: {
          select: {
            slug: true,
            title: true,
            category: true,
            reward: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.applicant.count({
      where: whereConditions,
    }),
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(totalCount / limit);
  const hasNext = page < totalPages;

  return {
    jobs,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages,
      hasNext,
      hasPrev: page > 1,
    },
  };
};

export type GetMySubmittedJobsResponse = Awaited<
  ReturnType<typeof getMySubmittedJobs>
>;
export type GetMySubmittedJobsType = GetMySubmittedJobsResponse["jobs"][0];
