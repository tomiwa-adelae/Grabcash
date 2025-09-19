"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { requireSubscription } from "../../subscription/require-subscription";
import { getDraftedJobs } from "./get-drafted-jobs";

export async function loadMoreDraftedJobs(page: number, query?: string) {
  await requireSubscription();

  try {
    const result = await getDraftedJobs({
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
