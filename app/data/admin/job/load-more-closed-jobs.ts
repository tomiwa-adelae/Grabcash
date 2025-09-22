"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getActiveJobs } from "./get-active-jobs";
import { requireAdmin } from "../require-admin";
import { getClosedJobs } from "./get-closed-jobs";

export async function loadMoreClosedJobs(page: number, query?: string) {
  await requireAdmin();
  try {
    const result = await getClosedJobs({
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
