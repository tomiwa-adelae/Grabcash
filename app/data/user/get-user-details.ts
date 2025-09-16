import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export const getUserDetails = async (username?: string) => {
  const session = await requireUser();
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ id: session.user.id }, { username }],
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
      dob: true,
      identificationType: true,
      identificationNumber: true,
      onboardingCompleted: true,
      emailVerified: true,
      createdAt: true,
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
      following: {
        select: {
          followerId: true,
        },
      },
    },
  });

  if (!user) return notFound();

  return user;
};

export type GetUserDetailsType = Awaited<ReturnType<typeof getUserDetails>>;
