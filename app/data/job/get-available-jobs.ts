import { prisma } from "@/lib/db";
import "server-only";

export const getAvailableJobs = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      reward: true,
    },
  });

  return jobs;
};

export type GetAvailableJobsType = Awaited<
  ReturnType<typeof getAvailableJobs>
>[0];
