"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const approveApplication = async (
  id: string,
  slug: string
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const applicant = await prisma.applicant.update({
      where: {
        id,
        Job: { OR: [{ slug: slug }, { userId: user.id }] },
      },
      data: {
        status: "APPROVED",
      },
      select: {
        User: {
          select: {
            id: true,
          },
        },
        Job: { select: { reward: true, userId: true, slug: true } },
      },
    });

    const reward = applicant.Job.reward
      ? parseInt(applicant.Job.reward, 10)
      : 0;

    await prisma.user.update({
      where: {
        id: applicant.User.id,
      },
      data: {
        earnings: { increment: reward },
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Submission approved" };
  } catch (error) {
    return { status: "error", message: "Failed to approve submission" };
  }
};

export const rejectApplication = async (
  id: string,
  slug: string,
  reason: string
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    console.log(id, slug, reason, user.id);
    if (!reason) return { status: "error", message: "Please leave a reason" };

    await prisma.applicant.update({
      where: {
        id,
        Job: { OR: [{ slug: slug }, { userId: user.id }] },
      },
      data: {
        rejectionReason: reason,
        status: "REJECTED",
      },
    });
    revalidatePath("/");

    return { status: "success", message: "Submission rejected" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Failed to reject submission" };
  }
};
