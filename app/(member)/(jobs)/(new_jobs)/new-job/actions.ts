"use server";

import { logActivity } from "@/app/data/admin/activity/log-activity";
import { getUserDetails } from "@/app/data/user/get-user-details";
import { requireUser } from "@/app/data/user/require-user";
import { requireSubscription } from "@/app/data/user/subscription/require-subscription";
import { DEFAULT_COMMISSION } from "@/constants";
import { JobPostedEmail } from "@/emails/job-posted-email";
import { NewJobBroadcastEmail } from "@/emails/new-job-broadcast-email";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { formattedStatus, generateSuffix } from "@/lib/utils";
import { newJobFormSchema, NewJobFormSchemaType } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

import Mailjet from "node-mailjet";
const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

import slugify from "slugify";

export const createJob = async (data: NewJobFormSchemaType) => {
  const { user } = await requireUser();
  await requireSubscription();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    const validation = newJobFormSchema.safeParse(data);

    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    const slug = slugify(validation.data.title);

    const year = new Date().getFullYear();
    let suffix = generateSuffix();
    let jobID = `JOB-${year}-${suffix}`;

    let existing = await prisma.job.findUnique({
      where: {
        jobID,
      },
    });

    while (existing) {
      suffix = generateSuffix();
      jobID = `JOB-${year}-${suffix}`;
      existing = await prisma.job.findUnique({
        where: {
          jobID,
        },
      });
    }

    const job = await prisma.job.upsert({
      where: {
        slug,
      },
      update: {
        userId: user.id,
        ...validation.data,
        slug,
        status: "PUBLISHED",
        jobID,
      },
      create: {
        userId: user.id,
        ...validation.data,
        slug,
        status: "PUBLISHED",
        jobID,
      },
    });

    return {
      status: "success",
      message: "New job successfully created",
      slug: slug,
      id: job.id,
    };
  } catch (error) {
    return { status: "error", message: "Failed to create new job" };
  }
};

export const saveDraft = async (
  data: NewJobFormSchemaType
): Promise<ApiResponse> => {
  const { user } = await requireUser();
  await requireSubscription();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    if (!data.title) return { status: "error", message: "Please enter title" };

    const slug = slugify(data.title);

    const year = new Date().getFullYear();
    let suffix = generateSuffix();
    let jobID = `JOB-${year}-${suffix}`;

    let existing = await prisma.job.findUnique({
      where: {
        jobID,
      },
    });

    while (existing) {
      suffix = generateSuffix();
      jobID = `JOB-${year}-${suffix}`;
      existing = await prisma.job.findUnique({
        where: {
          jobID,
        },
      });
    }

    await prisma.job.upsert({
      where: {
        slug,
      },
      update: {
        userId: user.id,
        ...data,
        jobID,
        slug,
        status: "DRAFT",
      },
      create: {
        userId: user.id,
        ...data,
        jobID,
        slug,
        status: "DRAFT",
      },
    });

    return {
      status: "success",
      message:
        "Your job has been saved as a draft. You can find it anytime in your Drafts folder to review, edit, and post when you’re ready.",
    };
  } catch (error) {
    return { status: "error", message: "Failed to save to draft" };
  }
};

export const verifyJobPayment = async ({
  id,
  amount,
  transactionId,
  status,
  reference,
}: {
  id: string;
  amount: string;
  transactionId: string;
  status: string;
  reference: string;
}): Promise<ApiResponse> => {
  const { user } = await requireUser();
  await requireSubscription();
  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    if (!id) return { status: "error", message: "Oops! An error occurred!" };

    const job = await prisma.job.update({
      where: {
        id,
      },
      data: {
        paymentVerified: true,
      },
      select: {
        noOfWorkers: true,
        reward: true,
        id: true,
        title: true,
        category: true,
        status: true,
        slug: true,
      },
    });

    await prisma.jobPayment.create({
      data: {
        amount,
        transactionId: transactionId,
        txRef: reference,
        jobId: job.id,
        userId: user.id,
        status:
          status === "successful"
            ? "SUCCESS"
            : status === "approved"
            ? "SUCCESS"
            : status === "success"
            ? "SUCCESS"
            : status === "failed"
            ? "FAILED"
            : status === "pending"
            ? "PENDING"
            : "PENDING",
      },
    });

    const basePrice = Number(job.reward) * Number(job.noOfWorkers); // 10,000
    const fee = basePrice * (DEFAULT_COMMISSION / 100); // 1,000

    await prisma.payout.create({
      data: {
        amount: Number(amount),
        fee,
        type: "CREDIT",
        userId: user.id,
        title: `${job.title} payment`,
        status: "PAID",
      },
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: user.id,
        },
      },
      select: {
        email: true,
        name: true,
      },
    });

    // Log the activity
    await logActivity({
      type: "JOB_POSTED",
      description: `New job "${job.title}" created by ${user.name}.`,
      jobId: job.id,
      userId: user.id,
      metadata: {
        reward: job.reward,
        category: job.category,
        status: job.status,
      },
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "grabcash",
          },
          To: [{ Email: user.email, Name: user.name }],
          Subject: `Your Job is Live`,
          HTMLPart: JobPostedEmail({
            name: user.name,
            jobTitle: job.title,
            category: job.category!,
            reward: job.reward!,
            noOfWorkers: job.noOfWorkers!,
            status: formattedStatus[job.status],
            manageJobUrl: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/job/${job.slug}`,
          }),
        },
      ],
    });

    // ✅ Send broadcast email to all other users
    if (users.length > 0) {
      await mailjet.post("send", { version: "v3.1" }).request({
        Messages: users.map((u) => ({
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "grabcash",
          },
          To: [{ Email: u.email, Name: u.name || "grabcash User" }],
          Subject: `New Job Posted: ${job.title}`,
          HTMLPart: NewJobBroadcastEmail({
            jobTitle: job.title,
            category: job.category!,
            reward: job.reward!,
            noOfWorkers: job.noOfWorkers!,
            slug: job.slug!,
          }),
        })),
      });
    }

    revalidatePath("/");

    return { status: "success", message: "Payment successful" };
  } catch (error) {
    return { status: "error", message: "Failed to save payment" };
  }
};

export const saveJob = async (data: NewJobFormSchemaType, id: string) => {
  const { user } = await requireUser();
  await requireSubscription();
  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };

    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    if (!id) return { status: "error", message: "Oops! Job not found" };

    const validation = newJobFormSchema.safeParse(data);

    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    const slug = slugify(validation.data.title);

    const job = await prisma.job.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        userId: user.id,
        ...validation.data,
        slug,
        status: "PUBLISHED",
      },
    });

    return {
      status: "success",
      message: "Job successfully updated.",
      slug: job.slug,
    };
  } catch (error) {
    return { status: "error", message: "Failed to save the job update" };
  }
};
