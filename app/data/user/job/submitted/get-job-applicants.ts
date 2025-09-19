import "server-only";
import { requireUser } from "../../require-user";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireSubscription } from "../../subscription/require-subscription";

export const getJobApplicants = async ({
  slug,
  query,
  limit = DEFAULT_LIMIT,
  page = 1,
}: Params) => {
  const { user } = await requireUser();
  await requireSubscription();

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

export const getTotalApplicantsCount = async (slug: string) => {
  const { user } = await requireUser();
  await requireSubscription();

  const applicants = await prisma.applicant.count({
    where: {
      Job: {
        slug,
        userId: user.id,
      },
    },
  });

  return applicants;
};

export const getRejectedApplicantsCount = async (slug: string) => {
  const { user } = await requireUser();
  await requireSubscription();

  const applicants = await prisma.applicant.count({
    where: {
      Job: {
        slug,
        userId: user.id,
      },
      status: "REJECTED",
    },
  });

  return applicants;
};

export const getApprovedApplicantsCount = async (slug: string) => {
  const { user } = await requireUser();
  await requireSubscription();

  const applicants = await prisma.applicant.count({
    where: {
      Job: {
        slug,
        userId: user.id,
      },
      status: "APPROVED",
    },
  });

  return applicants;
};

export const getPendingApplicantsCount = async (slug: string) => {
  const { user } = await requireUser();
  await requireSubscription();

  const applicants = await prisma.applicant.count({
    where: {
      Job: {
        slug,
        userId: user.id,
      },
      status: "PENDING",
    },
  });

  return applicants;
};

export type GetJobApplicantsResponse = Awaited<
  ReturnType<typeof getJobApplicants>
>;
export type GetJobApplicantsType =
  GetJobApplicantsResponse["applicantsData"][0];
