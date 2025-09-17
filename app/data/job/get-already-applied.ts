import "server-only";
import { requireUser } from "../user/require-user";
import { prisma } from "@/lib/db";

export const getAlreadyApplied = async (id: string) => {
  const { user } = await requireUser();

  const alreadyApplied = await prisma.applicant.findFirst({
    where: {
      jobId: id,
      userId: user.id,
    },
  });

  return alreadyApplied;
};
