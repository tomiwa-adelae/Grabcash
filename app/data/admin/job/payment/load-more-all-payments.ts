"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getAllPayments } from "./get-all-payments";
import { requireAdmin } from "../../require-admin";

export async function loadMoreAllPayments(page: number, query?: string) {
  await requireAdmin();
  try {
    const result = await getAllPayments({
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
      error: "Failed to load more payments",
    };
  }
}
