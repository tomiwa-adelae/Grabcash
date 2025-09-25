import "server-only";
import { requireAdmin } from "../../require-admin";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export const getPaymentDetails = async (id: string) => {
  await requireAdmin;

  const details = await prisma.jobPayment.findUnique({
    where: { id },
    select: {
      id: true,
      transactionId: true,
      txRef: true,
      amount: true,
      status: true,
      createdAt: true,
      User: { select: { name: true, email: true, username: true } },
      Job: {
        select: {
          title: true,
          reward: true,
          slug: true,
          paymentVerified: true,
        },
      },
    },
  });

  if (!details) return notFound();

  return details;
};

export type GetPayemntDetailsType = Awaited<
  ReturnType<typeof getPaymentDetails>
>;
