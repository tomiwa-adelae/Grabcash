import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import "server-only";

export const getJobDetails = async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      reward: true,
      deadline: true,
      description: true,
      type: true,
      estimatedTime: true,
      estimatedTimeUnit: true,
      instructions: true,
      proofOfCompletion: true,
      User: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!job) return notFound();

  return job;
};

export type GetJobDetailsType = Awaited<ReturnType<typeof getJobDetails>>;
