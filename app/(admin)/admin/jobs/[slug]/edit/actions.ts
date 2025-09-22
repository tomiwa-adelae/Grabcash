"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { newJobFormSchema, NewJobFormSchemaType } from "@/lib/zodSchemas";
import slugify from "slugify";

export const saveJob = async (data: NewJobFormSchemaType, id: string) => {
  await requireAdmin();
  try {
    if (!id) return { status: "error", message: "Oops! Job not found" };

    const validation = newJobFormSchema.safeParse(data);

    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    const slug = slugify(validation.data.title);

    const job = await prisma.job.update({
      where: {
        id,
      },
      data: {
        ...validation.data,
        slug,
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
