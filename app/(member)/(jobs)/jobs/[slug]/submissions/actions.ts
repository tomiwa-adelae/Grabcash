"use server";

import { requireUser } from "@/app/data/user/require-user";
import { JobSubmissionReviewedEmail } from "@/emails/job-submission-reviewed-email";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

import Mailjet from "node-mailjet";
const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

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
        Job: {
          select: {
            reward: true,
            userId: true,
            slug: true,
            title: true,
            id: true,
            filledSlots: true,
          },
        },
      },
    });

    const reward = applicant.Job.reward
      ? parseInt(applicant.Job.reward, 10)
      : 0;

    const worker = await prisma.user.update({
      where: {
        id: applicant.User.id,
      },
      data: {
        earnings: { increment: reward },
      },
      select: {
        name: true,
        email: true,
      },
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "Earnsphere",
          },
          To: [{ Email: worker.email, Name: worker.name }],
          Subject: `Submission approved - ${applicant.Job.title}`,
          HTMLPart: JobSubmissionReviewedEmail({
            workerName: worker.name,
            jobTitle: applicant.Job.title,
            status: "APPROVED",
            reward: applicant.Job.reward!,
          }),
        },
      ],
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
    if (!reason) return { status: "error", message: "Please leave a reason" };

    const applicant = await prisma.applicant.update({
      where: {
        id,
        Job: { OR: [{ slug: slug }, { userId: user.id }] },
      },
      data: {
        rejectionReason: reason,
        status: "REJECTED",
      },
      select: {
        userId: true,
        Job: {
          select: {
            title: true,
            reward: true,
            id: true,
            noOfWorkers: true,
            filledSlots: true,
          },
        },
      },
    });

    const worker = await prisma.user.findUnique({
      where: {
        id: applicant.userId,
      },
      select: {
        name: true,
        email: true,
      },
    });

    await prisma.job.update({
      where: { id: applicant.Job.id },
      data: { filledSlots: { decrement: 1 }, jobOpen: true },
    });

    if (!worker) return { status: "error", message: "Oops! An error occurred" };

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "Earnsphere",
          },
          To: [{ Email: worker.email, Name: worker.name }],
          Subject: `Submission rejected - ${applicant.Job.title}`,
          HTMLPart: JobSubmissionReviewedEmail({
            workerName: worker.name,
            jobTitle: applicant.Job.title,
            status: "REJECTED",
            reward: applicant.Job.reward!,
            reason,
          }),
        },
      ],
    });

    revalidatePath("/");

    return { status: "success", message: "Submission rejected" };
  } catch (error) {
    return { status: "error", message: "Failed to reject submission" };
  }
};
