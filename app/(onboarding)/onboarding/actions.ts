"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  onboardingPrismaProfileSchema,
  OnboardingPrismaProfileSchemaType,
  onboardingProfileSchema,
  OnboardingProfileSchemaType,
} from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

export const saveProfilePicture = async (
  image: string
): Promise<ApiResponse> => {
  const { user } = await requireUser();
  try {
    if (!image)
      return { status: "error", message: "No profile picture to save" };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image,
      },
    });

    revalidatePath("/");

    return {
      status: "success",
      message: "Profile picture successfully saved",
    };
  } catch (error) {
    return { status: "error", message: "Failed to save profile picture" };
  }
};

export const saveProfile = async (
  data: OnboardingPrismaProfileSchemaType,
  bankCode: string
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const validation = onboardingPrismaProfileSchema.safeParse(data);

    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    const { socialLinks, ...userData } = validation.data;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...userData,
        bankCode,
        socials: {
          deleteMany: {}, // Delete existing socials first
          create:
            socialLinks?.map((social) => ({
              url: social.url!,
            })) || [],
        },
      },
    });

    return { status: "success", message: "Profile details saved" };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.code === "P2002"
          ? "This email is already in use. Please use another one."
          : "Failed to save profile details",
    };
  }
};
