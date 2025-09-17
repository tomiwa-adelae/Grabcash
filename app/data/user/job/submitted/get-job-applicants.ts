import "server-only";
import { requireUser } from "../../require-user";
import { prisma } from "@/lib/db";

export const getJobApplicants = async (slug: string) => {
  const { user } = await requireUser();

  const applicants = await prisma.applicant.findMany({
    where: {
      Job: {
        slug,
        userId: user.id,
      },
    },
    select: {
      id: true,
      applicationID: true,
      createdAt: true,
      status: true,
      Job: {
        select: {
          title: true,
        },
      },
      User: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });

  return applicants;
};

export type GetJobApplicantsType = Awaited<
  ReturnType<typeof getJobApplicants>
>[0];
