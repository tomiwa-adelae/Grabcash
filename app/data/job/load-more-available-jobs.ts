// app/data/job/load-more-available-jobs.ts
"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getAvailableJobs } from "./get-available-jobs";

export async function loadMoreAvailableJobs(page: number, query?: string) {
  try {
    const result = await getAvailableJobs({
      page,
      query,
      limit: DEFAULT_LIMIT, // Match your initial page limit
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error loading more available jobs:", error);
    return {
      success: false,
      error: "Failed to load more jobs",
    };
  }
}
