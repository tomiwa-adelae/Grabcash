"use server";

import { DEFAULT_LIMIT } from "@/constants";
import { getJobApplicants } from "./get-job-applicants";

export async function loadMoreApplicants(
  slug: string,
  page: number,
  query?: string,
  limit: number = DEFAULT_LIMIT // Changed default to match your test
) {
  console.log("loadMoreApplicants called with:", { slug, page, query, limit });

  try {
    const result = await getJobApplicants({
      slug,
      query,
      page,
      limit,
    });

    console.log("getJobApplicants returned:", {
      applicantsCount: result.applicantsData.length,
      pagination: result.pagination,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error loading more applicants:", error);
    return {
      success: false,
      error: "Failed to load more applicants",
    };
  }
}
