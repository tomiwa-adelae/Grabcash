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
		console.log(data);
		const validation = onboardingIdentitySchema.safeParse(data);
		console.log(validation);

		if (!validation.success)
			return { status: "error", message: "Invalid form data" };

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				...validation.data,
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
