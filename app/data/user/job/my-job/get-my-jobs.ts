import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "../../require-user";
import { DEFAULT_LIMIT } from "@/constants";

interface GetMyJobsParams {
  query?: string;
  page?: number;
  limit?: number;
}

export const getMyJobs = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: GetMyJobsParams = {}) => {
  const { user } = await requireUser();
  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {
    userId: user.id,
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
        reward: true,
        noOfWorkers: true,
        status: true,
        createdAt: true,
        _count: {
          select: { applicants: true },
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

export type GetMyJobsResponse = Awaited<ReturnType<typeof getMyJobs>>;
export type GetMyJobsType = GetMyJobsResponse["jobs"][0];
