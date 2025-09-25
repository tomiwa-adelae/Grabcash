import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";

export const getActiveJobs = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: Params = {}) => {
  await requireAdmin();

  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {
    status: "PUBLISHED",
    paymentVerified: true,
    jobOpen: true,
  };

  // Add search if provided
  if (query) {
    whereConditions.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { category: { contains: query, mode: "insensitive" } },
      { reward: { contains: query, mode: "insensitive" } },
      { jobID: { contains: query, mode: "insensitive" } },
      { reward: { contains: query, mode: "insensitive" } },
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
        createdAt: true,
        jobOpen: true,
        jobPayments: {
          select: {
            status: true,
          },
        },
        User: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            applicants: {
              where: {
                status: { not: "REJECTED" },
              },
            },
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

export type GetActiveJobsResponse = Awaited<ReturnType<typeof getActiveJobs>>;
export type GetActiveJobsType = GetActiveJobsResponse["jobs"][0];
