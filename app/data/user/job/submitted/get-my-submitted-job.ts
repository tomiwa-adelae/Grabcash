import "server-only";
import { requireUser } from "../../require-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireSubscription } from "../../subscription/require-subscription";

export const getMySubmittedJob = async (id: string) => {
  const { user } = await requireUser();
  await requireSubscription();

  const job = await prisma.applicant.findUnique({
    where: {
      id,
      userId: user.id,
    },
    select: {
      id: true,
      status: true,
      applicationID: true,
      Job: {
        select: {
          id: true,
          title: true,
          jobID: true,
          slug: true,
          category: true,
          reward: true,
        },
      },
    },
  });

  if (!job) return notFound();

  return job;
};

export type GetMySubmittedJobType = Awaited<
  ReturnType<typeof getMySubmittedJob>
>;
