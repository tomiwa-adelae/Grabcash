import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";
import { formatDistanceToNow } from "date-fns";

interface Params {
  query?: string;
  page?: number;
  limit?: number;
}

export const getAllActivities = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: Params = {}) => {
  await requireAdmin();

  const skip = (page - 1) * limit;

  const whereConditions: any = {};
  if (query) {
    whereConditions.OR = [
      { description: { contains: query, mode: "insensitive" } },
      { metadata: { contains: query, mode: "insensitive" } },
      {
        user: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { username: { contains: query, mode: "insensitive" } },
          ],
        },
      },
      {
        job: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { reward: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
      },
    ];
  }

  const [rawActivities, totalCount] = await Promise.all([
    prisma.recentActivity.findMany({
      where: whereConditions,
      orderBy: { createdAt: "desc" },
      include: { user: true, job: true },
      skip,
      take: limit,
    }),
    prisma.recentActivity.count({ where: whereConditions }),
  ]);

  // Map to plain objects for client
  const activities = rawActivities.map((a) => ({
    id: a.id,
    action: a.description || a.type,
    user: a.user?.email || a.user?.name || "System",
    time: formatDistanceToNow(new Date(a.createdAt), { addSuffix: true }),
    type: a.type || "DEFAULT", // Only string
  }));

  const totalPages = Math.ceil(totalCount / limit);

  return {
    activities,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

export type GetAllActivitiesResponse = Awaited<
  ReturnType<typeof getAllActivities>
>;
export type GetAllActivitiesType = GetAllActivitiesResponse["activities"][0];
