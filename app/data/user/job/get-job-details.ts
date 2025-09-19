import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../require-user";
import { requireSubscription } from "../subscription/require-subscription";

export const getJobDetails = async (slug: string) => {
  const { user } = await requireUser();
  await requireSubscription();

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
      jobLink: true,
      submissionType: true,
      submissionRequired: true,
      status: true,
      instructions: true,
      noOfWorkers: true,
      proofOfCompletion: true,
      jobID: true,
      jobOpen: true,
      paymentVerified: true,
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
