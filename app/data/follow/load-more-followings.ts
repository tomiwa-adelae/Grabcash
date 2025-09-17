"use server";

import { followings } from "./followings";

export async function loadMoreFollowings(
  userId: string,
  page: number,
  query?: string
) {
  try {
    const result = await followings({
      id: userId,
      query,
      page,
      limit: 1,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to load more followings",
    };
  }
}
