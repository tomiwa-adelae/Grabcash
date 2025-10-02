import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export const getUserProfile = async (username: string) => {
  await requireUser();
  const user = await prisma.user.findUnique({
    where: { username },
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
      dob: true,
      identificationType: true,
      identificationNumber: true,
      onboardingCompleted: true,
      emailVerified: true,
      createdAt: true,
      earnings: true,
      isAdmin: true,
      status: true,
      socials: {
        select: {
          id: true,
          url: true,
        },
      },
      subscription: {
        select: {
          plan: {
            select: {
              name: true,
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
      followers: {
        select: {
          follower: {
            select: {
              image: true,
              name: true,
              id: true,
              username: true,
            },
          },
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

export type GetUserProfileType = Awaited<ReturnType<typeof getUserProfile>>;
