"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { getTotalUsers } from "./get-total-users";

export async function loadMoreUsers(page: number, query?: string) {
  await requireAdmin();

  try {
    const result = await getTotalUsers({
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
      error: "Failed to load more users",
    };
  }
}
