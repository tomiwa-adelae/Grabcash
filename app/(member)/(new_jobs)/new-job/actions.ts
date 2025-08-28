"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { newJobFormSchema, NewJobFormSchemaType } from "@/lib/zodSchemas";

import slugify from "slugify";

export const createJob = async (data: NewJobFormSchemaType) => {
  const { user } = await requireUser();

  try {
    const validation = newJobFormSchema.safeParse(data);

    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    const slug = slugify(validation.data.title);

    await prisma.job.create({
      data: {
        userId: user.id,
        ...validation.data,
        slug,
        status: "Published",
      },
    });

    return {
      status: "success",
      message: "New job successfully created",
      slug: slug,
    };
  } catch (error) {
    return { status: "error", message: "Failed to create new job" };
  }
};

export const saveDraft = async (
  data: NewJobFormSchemaType
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    if (!data.title) return { status: "error", message: "Please enter title" };

    const slug = slugify(data.title);

    await prisma.job.create({
      data: {
        userId: user.id,
        ...data,
        slug,
        status: "Draft",
      },
    });

    return {
      status: "success",
      message:
        "Your job has been saved as a draft. You can find it anytime in your Drafts folder to review, edit, and post when you’re ready.",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Failed to save to draft" };
  }
};
