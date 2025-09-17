import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "../require-user";

export const getMyJobs = async () => {
  const { user } = await requireUser();
  const jobs = await prisma.job.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      reward: true,
      noOfWorkers: true,
      _count: { select: { applicants: true } },
    },
  });

  return jobs;
};

export type GetMyJobsType = Awaited<ReturnType<typeof getMyJobs>>[0];
