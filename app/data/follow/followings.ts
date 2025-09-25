import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "../user/require-user";
import { DEFAULT_LIMIT } from "@/constants";

export const followings = async ({
  id,
  query,
  limit = DEFAULT_LIMIT,
  page = 1,
}: Params) => {
  const { user } = await requireUser();

  const skip = (page - 1) * limit;

  const [followingsData, currentUserFollows, totalCount] = await Promise.all([
    prisma.follow.findMany({
      where: {
        followerId: id,
        ...(query
          ? {
              OR: [
                {
                  following: {
                    name: { contains: query, mode: "insensitive" },
                    username: { contains: query, mode: "insensitive" },
                    email: { contains: query, mode: "insensitive" },
                  },
                },
                {
                  following: {
                    name: { contains: query, mode: "insensitive" },
                    username: { contains: query, mode: "insensitive" },
                    email: { contains: query, mode: "insensitive" },
                  },
                },
              ],
            }
          : {}),
      },
      select: {
        following: {
          select: {
            name: true,
            id: true,
            username: true,
            image: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.follow.findMany({
      where: {
        followerId: user.id,
      },
      select: {
        followingId: true,
        following: {
          select: {
            name: true,
            id: true,
            username: true,
            image: true,
          },
        },
      },
    }),
    prisma.follow.count({
      where: {
        followerId: id,
        ...(query
          ? {
              OR: [
                {
                  following: { name: { contains: query, mode: "insensitive" } },
                },
                {
                  following: {
                    username: { contains: query, mode: "insensitive" },
                  },
                },
              ],
            }
          : {}),
      },
    }),
  ]);

  const followingSet = new Set(currentUserFollows.map((f) => f.followingId));

  const followings = followingsData.map(({ following }) => ({
    ...following,
    isFollowing: followingSet.has(following.id),
    isSelf: following.id === user.id,
  }));

  return {
    followings,
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

export type FollowingsResponse = Awaited<ReturnType<typeof followings>>;
export type FollowingsType = FollowingsResponse["followings"][0];
