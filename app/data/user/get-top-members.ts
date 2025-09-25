import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireUser } from "./require-user";

export const getTopMembers = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: Params = {}) => {
  await requireUser();

  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {
    isAdmin: false,
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

  // Get members and total count
  const [members, totalCount] = await Promise.all([
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
            jobs: {
              where: {
                status: {
                  not: "DRAFT",
                },
              },
            }, // total jobs they’ve posted
            applicants: {
              where: {
                status: "APPROVED", // only approved applications
              },
            },
          },
        },
      },
      orderBy: [
        {
          jobs: {
            _count: "desc",
          },
        },
        {
          applicants: {
            _count: "desc",
          },
        },
      ],
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
    members,
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

export type GetTopMembersResponse = Awaited<ReturnType<typeof getTopMembers>>;
export type GetTopMembersType = GetTopMembersResponse["members"][0];
