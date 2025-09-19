import { prisma } from "@/lib/db";
import "server-only";
import { requireSubscription } from "../user/subscription/require-subscription";
import { DEFAULT_LIMIT } from "@/constants";
import { requireUser } from "../user/require-user";

interface GetAvailableJobsParams {
  query?: string;
  page?: number;
  limit?: number;
}

export const getAvailableJobs = async (params: GetAvailableJobsParams = {}) => {
  const { user } = await requireUser();
  await requireSubscription();
  const { query, page = 1, limit = DEFAULT_LIMIT } = params;

  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {
    status: "PUBLISHED",
    paymentVerified: true,
    jobOpen: true,
    applicants: {
      none: {
        userId: user.id,
      },
    },
    userId: {
      not: user.id,
    },
  };

  // Add search if provided
  if (query) {
    whereConditions.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { category: { contains: query, mode: "insensitive" } },
      { reward: { contains: query, mode: "insensitive" } },
    ];
  }

  // Get jobs and total count
  const [jobs, totalCount] = await Promise.all([
    prisma.job.findMany({
      where: whereConditions,
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        noOfWorkers: true,
        reward: true,
        _count: {
          select: {
            applicants: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.job.count({
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

export type GetAvailableJobsResponse = Awaited<
  ReturnType<typeof getAvailableJobs>
>;
export type GetAvailableJobsType = GetAvailableJobsResponse["jobs"][0];
