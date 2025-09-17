import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "../../require-user";

export const getMySubmittedJobs = async () => {
  const { user } = await requireUser();
  const jobs = await prisma.applicant.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      status: true,
      applicationID: true,
      Job: {
        select: {
          slug: true,
          title: true,
          category: true,
          reward: true,
        },
      },
    },
  });

  return jobs;
};

export type GetMySubmittedJobsType = Awaited<
  ReturnType<typeof getMySubmittedJobs>
>[0];
