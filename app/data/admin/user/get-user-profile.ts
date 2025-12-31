import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireAdmin } from "../require-admin";

export const getUserProfile = async (username: string) => {
  await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      email: true,
      referralCode: true, // Add this
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
      lifeTimeEarnings: true,
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
      sessions: {
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      applicants: {
        select: {
          id: true,
          status: true,
          applicationID: true,
          createdAt: true,
          Job: {
            select: {
              slug: true,
              title: true,
              category: true,
              reward: true,
            },
          },
          User: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
        },
      },
      jobs: {
        select: {
          id: true,
          slug: true,
          title: true,
          category: true,
          noOfWorkers: true,
          reward: true,
          createdAt: true,
          status: true,
          paymentVerified: true,
          jobOpen: true,
          jobPayments: {
            select: {
              status: true,
            },
          },
          User: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
          _count: {
            select: {
              applicants: {
                where: {
                  status: { not: "REJECTED" },
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) return notFound();

  return user;
};

export type GetUserDetailsType = Awaited<ReturnType<typeof getUserProfile>>;
