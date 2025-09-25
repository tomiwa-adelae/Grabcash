import { prisma } from "@/lib/db";
import { ActivityType } from "@/lib/generated/prisma";

export async function logActivity({
  type,
  description,
  userId,
  jobId,
  payoutId,
  metadata,
  subscriptionId,
}: {
  type: ActivityType;
  description: string;
  userId?: string;
  jobId?: string;
  payoutId?: string;
  metadata?: Record<string, any>;
  subscriptionId?: string;
}) {
  try {
    await prisma.recentActivity.create({
      data: {
        type,
        description,
        userId,
        jobId,
        payoutId,
        metadata,
      },
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
