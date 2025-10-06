import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export const getUserDetails = async (username?: string) => {
  const session = await requireUser();
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { id: session.user.id }],
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      phoneNumber: true,
      country: true,
      accountName: true,
      accountNumber: true,
      bankName: true,
      bio: true,
      image: true,
      status: true,
      dob: true,
      identificationType: true,
      identificationNumber: true,
      onboardingCompleted: true,
      emailVerified: true,
      createdAt: true,
      earnings: true,
      lifeTimeEarnings: true,
      withdrawalPin: true,
      isAdmin: true,
      emailNotification: true,
      inAppNotification: true,
      socials: {
        select: {
          id: true,
          url: true,
        },
      },
      subscription: {
        select: {
          startDate: true,
          endDate: true,
          status: true,
          id: true,
          plan: {
            select: {
              name: true,
              billingCycle: true,
            },
          },
        },
      },
      accounts: {
        select: {
          password: true,
        },
      },
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) return notFound();

  if (user.status === "SUSPENDED") {
    return redirect("/account-suspended");
  }

  if (user.status === "DELETED") {
    return redirect("/account-deleted");
  }

  return user;
};

export type GetUserDetailsType = Awaited<ReturnType<typeof getUserDetails>>;
