import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";

export const getTotalUsers = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: Params = {}) => {
  await requireAdmin();

  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {
    // isAdmin: false,
    status: {
      not: "DELETED",
    },
  };

  // Add search if provided
  if (query) {
    whereConditions.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { phoneNumber: { contains: query, mode: "insensitive" } },
      { country: { contains: query, mode: "insensitive" } },
      { username: { contains: query, mode: "insensitive" } },
    ];
  }

  // Get jobs and total count
  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: whereConditions,
      select: {
        id: true,
        name: true,
        username: true,
        country: true,
        createdAt: true,
        image: true,
        isAdmin: true,
        email: true,
        status: true,
        _count: {
          select: {
            jobs: true,
            applicants: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.user.count({
      where: whereConditions,
    }),
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(totalCount / limit);
  const hasNext = page < totalPages;

  return {
    users,
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

export type GetTotalUsersResponse = Awaited<ReturnType<typeof getTotalUsers>>;
export type GetTotalUsersType = GetTotalUsersResponse["users"][0];
