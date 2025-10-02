"use server";

import { ApiResponse } from "@/lib/types";
import { requireUser } from "../data/user/require-user";
import { prisma } from "@/lib/db";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getUserDetails } from "../data/user/get-user-details";

export const saveWithdrawalPin = async (pin: string): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    const hashedPIN = await bcrypt.hash(pin, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        withdrawalPin: hashedPIN,
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Withdrawal PIN has been saved" };
  } catch (error) {
    return { status: "error", message: "Failed to save withdrawal pin" };
  }
};

export const verifyPin = async (pin: string): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    const hashedUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: { withdrawalPin: true },
    });

    if (!hashedUser?.withdrawalPin)
      return { status: "error", message: "No withdrawal pin yet!" };

    const decision = await bcrypt.compare(pin, hashedUser.withdrawalPin);

    if (!decision) return { status: "error", message: "Invalid PIN" };

    return { status: "success", message: "Withdrawal PIN has been saved" };
  } catch (error) {
    return { status: "error", message: "Failed to save withdrawal pin" };
  }
};
