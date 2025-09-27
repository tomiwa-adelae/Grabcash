"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
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

export const suspendUser = async (id: string): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status: "SUSPENDED",
      },
    });

    revalidatePath("/");

    return { status: "success", message: "User suspended" };
  } catch (error) {
    return { status: "error", message: "Failed to suspend user" };
  }
};

export const activateUser = async (id: string): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status: "ACTIVE",
      },
    });

    revalidatePath("/");

    return { status: "success", message: "User activated" };
  } catch (error) {
    return { status: "error", message: "Failed to activate user" };
  }
};

export const promoteUser = async (id: string): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isAdmin: true,
      },
    });

    revalidatePath("/");

    return { status: "success", message: "User promoted" };
  } catch (error) {
    return { status: "error", message: "Failed to promote user" };
  }
};

export const deleteUser = async (id: string): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status: "DELETED",
      },
    });

    revalidatePath("/");

    return { status: "success", message: "User promoted" };
  } catch (error) {
    return { status: "error", message: "Failed to promote user" };
  }
};

export const closeJob = async (id: string): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    await prisma.job.update({
      where: {
        id,
      },
      data: {
        jobOpen: false,
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Job closed successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to close job" };
  }
};

export const openJob = async (id: string): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    await prisma.job.update({
      where: {
        id,
      },
      data: {
        jobOpen: true,
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Job is live" };
  } catch (error) {
    return { status: "error", message: "Failed to open job" };
  }
};

export const approveApplication = async (
  id: string,
  slug: string
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    const applicant = await prisma.applicant.update({
      where: {
        id,
        Job: { OR: [{ slug: slug }] },
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

    await prisma.payout.create({
      data: {
        userId: applicant.User.id,
        amount: Number(reward),
        status: "PAID",
        fee: 0,
        title: `${applicant.Job.title} reward`,
        type: "CREDIT",
      },
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "grabcash",
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
  await requireAdmin();

  try {
    if (!reason) return { status: "error", message: "Please leave a reason" };

    const applicant = await prisma.applicant.update({
      where: {
        id,
        Job: { OR: [{ slug: slug }] },
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
            Name: "grabcash",
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

export const verifyPayment = async (id: string): Promise<ApiResponse> => {
  await requireAdmin();
  try {
    const payment = await prisma.jobPayment.update({
      where: { id },
      data: { status: "SUCCESS" },
      select: { jobId: true },
    });
    await prisma.job.update({
      where: { id: payment.jobId },
      data: { paymentVerified: true },
    });

    revalidatePath("/");

    return { status: "success", message: "Payment successfully verified" };
  } catch (error) {
    return { status: "error", message: "Failed to mark payment as paid" };
  }
};
