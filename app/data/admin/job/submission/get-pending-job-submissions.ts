import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../../require-admin";

export const getPendingJobSubmissions = async (params: Params = {}) => {
  const { query, page = 1, limit = DEFAULT_LIMIT } = params;

  await requireAdmin();
  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = { status: "PENDING" };

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

export type GetPendingJobSubmissionsResponse = Awaited<
  ReturnType<typeof getPendingJobSubmissions>
>;
export type GetPendingJobSubmissionsType =
  GetPendingJobSubmissionsResponse["jobs"][0];
