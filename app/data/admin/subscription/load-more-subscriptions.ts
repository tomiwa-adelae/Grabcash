"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../require-admin";
import { getSubscriptions } from "./get-subscriptions";

export async function loadMoreSubscriptions(page: number, query?: string) {
  await requireAdmin();
  try {
    const result = await getSubscriptions({
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
