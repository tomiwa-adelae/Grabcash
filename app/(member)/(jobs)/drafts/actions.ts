"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const deleteJob = async (id: string): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
        userId: user.id,
      },
      select: {
        _count: {
          select: {
            applicants: true,
          },
        },
      },
    });

    if (!job) return { status: "error", message: "Oops! An error occurred" };

    if (job._count.applicants !== 0)
      return {
        status: "error",
        message: "You cannot delete this job. There are some workers already.",
      };

    await prisma.job.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Job deleted successfully!" };
  } catch (error) {
    return { status: "error", message: "Failed to delete job" };
  }
};
