"use server";

import { DEFAULT_LIMIT } from "@/constants";
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
      limit: DEFAULT_LIMIT,
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
