import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireAdmin } from "../require-admin";

export const getJobDetails = async (slug: string) => {
  await requireAdmin();

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
