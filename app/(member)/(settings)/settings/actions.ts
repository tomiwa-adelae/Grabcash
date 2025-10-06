"use server";
import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const saveEmailNotifications = async (
  value: boolean
): Promise<ApiResponse> => {
  const { user } = await requireUser();
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailNotification: value,
      },
    });

    revalidatePath("/settings");

    return { status: "success", message: "Notification saved" };
  } catch (error) {
    return { status: "error", message: "Fail to save" };
  }
};
