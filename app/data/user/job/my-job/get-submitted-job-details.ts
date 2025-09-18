import "server-only";
import { requireUser } from "../../require-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export const getSubmittedJobDetails = async (id: string) => {
  const { user } = await requireUser();

  const details = await prisma.applicant.findUnique({
    where: {
      id,
      Job: {
        userId: user.id,
      },
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
