"use server";

import { requireUser } from "@/app/data/user/require-user";
import { requireSubscription } from "@/app/data/user/subscription/require-subscription";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { generateSuffix } from "@/lib/utils";
import { newJobFormSchema, NewJobFormSchemaType } from "@/lib/zodSchemas";

import slugify from "slugify";

export const createJob = async (data: NewJobFormSchemaType) => {
  const { user } = await requireUser();
  await requireSubscription();

  try {
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

    const job = await prisma.job.create({
      data: {
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
    if (!data.title) return { status: "error", message: "Please enter title" };

    const slug = slugify(data.title);

    await prisma.job.create({
      data: {
        userId: user.id,
        ...data,
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

export const verifyJobPayment = async (
  id: string,
  amount: string,
  response: {
    amount: number;
    tx_ref: string;
    transaction_id: number;
    status: string;
  }
): Promise<ApiResponse> => {
  const { user } = await requireUser();
  try {
    if (!id) return { status: "error", message: "Oops! An error occurred!" };

    const job = await prisma.job.update({
      where: {
        id,
      },
      data: {
        paymentVerified: true,
      },
    });

    await prisma.jobPayment.create({
      data: {
        amount,
        transactionId: response.transaction_id.toString(),
        txRef: response.tx_ref,
        jobId: job.id,
        userId: user.id,
      },
    });

    return { status: "success", message: "Payment successful" };
  } catch (error) {
    return { status: "error", message: "Failed to save payment" };
  }
};
