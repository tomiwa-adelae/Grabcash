"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getJobApplicants } from "./get-job-applicants";

export async function loadMoreApplicants(
  slug: string,
  page: number,
  query?: string,
  limit: number = DEFAULT_LIMIT // Changed default to match your test
) {
  try {
    const result = await getJobApplicants({
      slug,
      query,
      page,
      limit,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to load more applicants",
    };
  }
}
