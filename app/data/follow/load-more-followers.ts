// app/data/follow/load-more-followers.ts
"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { followers } from "./followers";

export async function loadMoreFollowers(
  userId: string,
  page: number,
  query?: string
) {
  try {
    const result = await followers({
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
      error: "Failed to load more followers",
    };
  }
}
