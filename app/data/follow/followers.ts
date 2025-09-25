import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "../user/require-user";
import { DEFAULT_LIMIT } from "@/constants";

export const followers = async ({
  id,
  query,
  limit = DEFAULT_LIMIT,
  page = 1,
}: Params) => {
  const { user } = await requireUser();

  const skip = (page - 1) * limit;

  const [followersData, currentUserFollows, totalCount] = await Promise.all([
    prisma.follow.findMany({
      where: {
        followingId: id,
        ...(query
          ? {
              OR: [
                {
                  follower: {
                    name: { contains: query, mode: "insensitive" },
                    username: { contains: query, mode: "insensitive" },
                    email: { contains: query, mode: "insensitive" },
                  },
                },
                {
                  follower: {
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
        follower: {
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
        follower: {
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
        followingId: id,
        ...(query
          ? {
              OR: [
                {
                  follower: { name: { contains: query, mode: "insensitive" } },
                },
                {
                  follower: {
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

  const followers = followersData.map(({ follower }) => ({
    ...follower,
    isFollowing: followingSet.has(follower.id),
    isSelf: follower.id === user.id,
  }));

  return {
    followers,
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

export type FollowersResponse = Awaited<ReturnType<typeof followers>>;
export type FollowersType = FollowersResponse["followers"][0];
