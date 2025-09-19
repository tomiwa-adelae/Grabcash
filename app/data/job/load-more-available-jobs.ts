// app/data/job/load-more-available-jobs.ts
"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getAvailableJobs } from "./get-available-jobs";
import { requireSubscription } from "../user/subscription/require-subscription";

export async function loadMoreAvailableJobs(page: number, query?: string) {
  await requireSubscription();

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
    return {
      success: false,
      error: "Failed to load more jobs",
    };
  }
}
