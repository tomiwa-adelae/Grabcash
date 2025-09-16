"use server";

import { requireUser } from "@/app/data/user/require-user";
import { auth } from "@/lib/auth";
import { ApiResponse } from "@/lib/types";
import {
  changePasswordFormSchema,
  ChangePasswordFormSchemaType,
} from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createPassword = async (
  data: ChangePasswordFormSchemaType
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const validation = changePasswordFormSchema(data.oldPassword!).safeParse(
      data
    );

    if (!validation.success)
      return { status: "error", message: "Invalid data type" };

    await auth.api.setPassword({
      body: {
        newPassword: validation.data.newPassword,
      },
      headers: await headers(),
    });

    revalidatePath("/");

    return { status: "success", message: "Password updated successfully" };
  } catch (error) {
    return { status: "error", message: "Fail to create password" };
  }
};
