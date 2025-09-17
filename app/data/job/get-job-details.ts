import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import "server-only";
import { requireSubscription } from "../user/subscription/require-subscription";

export const getJobDetails = async (slug: string) => {
  await requireSubscription();
  const job = await prisma.job.findUnique({
    where: {
      slug,
      paymentVerified: true,
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
      jobLink: true,
      submissionType: true,
      jobID: true,
      noOfWorkers: true,
      jobOpen: true,
      User: {
        select: {
          name: true,
          username: true,
          id: true,
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
