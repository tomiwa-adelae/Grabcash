"use server";

import { getUserDetails } from "@/app/data/user/get-user-details";
import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  editBankDetailsSchema,
  EditBankDetailsSchemaType,
  editPersonalDetailsSchema,
  EditPersonalDetailsSchemaType,
  editSocialMediaSchema,
  EditSocialMediaSchemaType,
} from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

export const updatePersonalDetails = async (
  data: EditPersonalDetailsSchemaType
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    const validation = editPersonalDetailsSchema.safeParse(data);

    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    const parseData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phoneNumber: data.phoneNumber,
      username: data.username,
      bio: data.bio,
      country: data.country,
    };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...parseData,
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Personal details updated" };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.code === "P2002"
          ? "This email is already in use. Please use another one."
          : "Failed to update personal details",
    };
  }
};

export const updateBankDetails = async (
  data: EditBankDetailsSchemaType,
  bankCode: string
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    const validation = editBankDetailsSchema.safeParse(data);

    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...validation.data,
        bankCode,
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Bank details updated" };
  } catch (error) {
    return { status: "error", message: "Failed to update bank details" };
  }
};

export const updateSocialMedia = async (
  data: EditSocialMediaSchemaType
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    const validation = editSocialMediaSchema.safeParse(data);

    if (!validation.success)
      return { status: "error", message: "Invalid form data" };

    const { socialLinks } = validation.data;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        socials: {
          deleteMany: {}, // Delete existing socials first
          create:
            socialLinks?.map((social) => ({
              url: social.url!,
            })) || [],
        },
      },
    });

    revalidatePath("/");

    return { status: "success", message: "Social links updated" };
  } catch (error) {
    return { status: "error", message: "Failed to update social links" };
  }
};
