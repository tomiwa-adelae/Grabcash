import { prisma } from "@/lib/db";
import "server-only";
import { requireSubscription } from "../user/subscription/require-subscription";

export const getAvailableJobs = async () => {
  await requireSubscription();
  const jobs = await prisma.job.findMany({
    where: {
      status: "PUBLISHED",
      paymentVerified: true,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      noOfWorkers: true,
      reward: true,
      _count: {
        select: {
          applicants: true,
        },
      },
    },
  });

  return jobs;
};

export type GetAvailableJobsType = Awaited<
  ReturnType<typeof getAvailableJobs>
>[0];
