import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";

export const getAllSubmissions = async (params: Params = {}) => {
  const { query, page = 1, limit = DEFAULT_LIMIT } = params;

  await requireAdmin();

  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {};

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
      {
        User: {
          OR: [
            {
              name: { contains: query, mode: "insensitive" },
              email: { contains: query, mode: "insensitive" },
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      },
    ];
  }

  // Get jobs and total count
  const [submissions, totalCount] = await Promise.all([
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
        User: {
          select: {
            name: true,
            username: true,
            image: true,
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
    submissions,
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

export type GetAllSubmissionsResponse = Awaited<
  ReturnType<typeof getAllSubmissions>
>;
export type GetAllSubmissionsType = GetAllSubmissionsResponse["submissions"][0];
