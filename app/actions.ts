"use server";

import { ApiResponse } from "@/lib/types";
import { requireUser } from "./data/user/require-user";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const followUser = async (id: string): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    if (user.id === id)
      return { status: "error", message: "Oops! You cannot follow yourself" };

    const isFollowing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: id,
        },
      },
    });

    if (isFollowing)
      return {
        status: "error",
        message: "Oops! You cannot follow this user again",
      };

    await prisma.follow.create({
      data: {
        followerId: user.id,
        followingId: id,
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Followed" };
  } catch (error) {
    return { status: "error", message: "Failed to follow user" };
  }
};

export const unfollowUser = async (id: string): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    if (user.id === id)
      return { status: "error", message: "Oops! You cannot unfollow yourself" };

    const isFollowing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: id,
        },
      },
    });

    if (!isFollowing)
      return {
        status: "error",
        message: "Oops! You cannot unfollow this user",
      };

    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: id,
        },
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Unfollowed" };
  } catch (error) {
    return { status: "error", message: "Failed to unfollow user" };
  }
};
