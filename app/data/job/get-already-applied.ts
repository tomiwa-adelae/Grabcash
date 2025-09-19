import "server-only";
import { requireUser } from "../user/require-user";
import { prisma } from "@/lib/db";
import { requireSubscription } from "../user/subscription/require-subscription";

export const getAlreadyApplied = async (id: string) => {
  const { user } = await requireUser();
  await requireSubscription();

  const alreadyApplied = await prisma.applicant.findFirst({
    where: {
      jobId: id,
      userId: user.id,
    },
  });

  return alreadyApplied;
};
