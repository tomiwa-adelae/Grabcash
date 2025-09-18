// app/data/user/job/submitted/load-more-submitted-jobs.ts
"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getMySubmittedJobs } from "./get-my-submitted-jobs";

export async function loadMoreSubmittedJobs(page: number, query?: string) {
  try {
    const result = await getMySubmittedJobs({
      page,
      query,
      limit: DEFAULT_LIMIT, // Match your initial page limit
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to load more submissions",
    };
  }
}
