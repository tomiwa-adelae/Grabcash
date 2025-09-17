import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../user/require-user";

export const isFollowing = async (id: string) => {
  const { user } = await requireUser();
  if (!id) return notFound();

  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: id,
      },
    },
  });

  return follow !== null;
};
