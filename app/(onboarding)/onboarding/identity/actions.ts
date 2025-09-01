"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  onboardingIdentitySchema,
  OnboardingIdentitySchemaType,
} from "@/lib/zodSchemas";

export const saveIdentification = async (
  data: OnboardingIdentitySchemaType
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const validation = onboardingIdentitySchema.safeParse(data);
    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...validation.data,
        onboardingCompleted: true,
      },
    });

    const basicPlan = await prisma.subscriptionPlan.findFirst({
      where: {
        name: "Basic",
      },
      select: {
        id: true,
      },
    });

    if (!basicPlan)
      return { status: "error", message: "Oops! An error occurred!" };

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        subscriptionPlanId: basicPlan.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + Number(365) * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
      create: {
        userId: user.id,
        subscriptionPlanId: basicPlan.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + Number(365) * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
    });

    return {
      status: "success",
      message: "Identification successfully saved",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to save identification details",
    };
  }
};
