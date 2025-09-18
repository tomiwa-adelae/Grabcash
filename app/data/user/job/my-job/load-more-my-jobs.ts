"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getMyJobs } from "./get-my-jobs";

export async function loadMoreMyJobs(page: number, query?: string) {
  try {
    const result = await getMyJobs({
      page,
      query,
      limit: DEFAULT_LIMIT, // Match your initial page limit
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error loading more jobs:", error);
    return {
      success: false,
      error: "Failed to load more jobs",
    };
  }
}
