import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../require-admin";

export const getSubmittedJobDetails = async (id: string) => {
  await requireAdmin();

  const details = await prisma.applicant.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      screenshots: true,
      applicationID: true,
      status: true,
      User: {
        select: {
          name: true,
          username: true,
        },
      },
      Job: {
        select: {
          jobID: true,
          title: true,
          reward: true,
          slug: true,
        },
      },
    },
  });

  if (!details) return notFound();

  return details;
};
