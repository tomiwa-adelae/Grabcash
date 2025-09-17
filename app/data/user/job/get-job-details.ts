import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../require-user";

export const getJobDetails = async (slug: string) => {
  const { user } = await requireUser();
  const job = await prisma.job.findUnique({
    where: {
      slug,
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      reward: true,
      description: true,
      type: true,
      instructions: true,
      proofOfCompletion: true,
      jobID: true,
      jobOpen: true,
      User: {
        select: {
          name: true,
          username: true,
        },
      },
      _count: {
        select: {
          applicants: true,
        },
      },
    },
  });

  if (!job) return notFound();

  return job;
};

export type GetJobDetailsType = Awaited<ReturnType<typeof getJobDetails>>;
