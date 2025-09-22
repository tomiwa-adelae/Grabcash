"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";
import { getAllSubmissions } from "./get-all-submissions";

export async function loadMoreSubmissions(page: number, query?: string) {
  await requireAdmin();

  try {
    const result = await getAllSubmissions({
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
