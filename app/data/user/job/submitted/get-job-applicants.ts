import "server-only";
import { requireUser } from "../../require-user";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";

interface Params {
  id?: string;
  query?: string;
  limit?: number;
  page?: number;
  slug: string;
}

export const getJobApplicants = async ({
  slug,
  query,
  limit = DEFAULT_LIMIT,
  page = 1,
}: Params) => {
  const { user } = await requireUser();

  const skip = (page - 1) * limit;

  // Fixed the query structure - the nested OR should be properly structured
  const searchConditions = query
    ? {
        OR: [
          {
            applicationID: { contains: query, mode: "insensitive" as const },
          },
          {
            User: {
              OR: [
                { name: { contains: query, mode: "insensitive" as const } },
                { username: { contains: query, mode: "insensitive" as const } },
              ],
            },
          },
          {
            Job: {
              OR: [
                { title: { contains: query, mode: "insensitive" as const } },
                { reward: { contains: query, mode: "insensitive" as const } },
              ],
            },
          },
        ],
      }
    : {};

  const baseWhere = {
    Job: {
      slug,
      userId: user.id,
    },
    ...searchConditions,
  };

  const [applicantsData, totalCount] = await Promise.all([
    prisma.applicant.findMany({
      where: baseWhere,
      select: {
        id: true,
        applicationID: true,
        createdAt: true,
        status: true,
        Job: {
          select: {
            title: true,
          },
        },
        User: {
          select: {
            name: true,
            username: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.applicant.count({
      where: baseWhere,
    }),
  ]);

  return {
    applicantsData,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      hasNext: page < Math.ceil(totalCount / limit),
      hasPrev: page > 1,
    },
  };
};

export type GetJobApplicantsResponse = Awaited<
  ReturnType<typeof getJobApplicants>
>;
export type GetJobApplicantsType =
  GetJobApplicantsResponse["applicantsData"][0];
