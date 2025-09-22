"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getAllJobs } from "./get-all-jobs";
import { requireAdmin } from "../require-admin";

export async function loadMoreAllJobs(page: number, query?: string) {
  await requireAdmin();
  try {
    const result = await getAllJobs({
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
