"use server";
import { env } from "@/lib/env";
import { ReferralBonusEmail } from "@/emails/referral-bonus-email";

import { getUserDetails } from "@/app/data/user/get-user-details";
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

import Mailjet from "node-mailjet";
const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export const saveProfilePicture = async (
  image: string
): Promise<ApiResponse> => {
  const { user } = await requireUser();
  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };
    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

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

// export const saveProfile = async (
//   data: OnboardingPrismaProfileSchemaType,
//   bankCode: string
// ): Promise<ApiResponse> => {
//   const { user } = await requireUser();

//   try {
//     const validation = onboardingPrismaProfileSchema.safeParse(data);

//     if (!validation.success)
//       return { status: "error", message: "Invalid form data" };

//     const { socialLinks, ...userData } = validation.data;

//     await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         ...userData,
//         bankCode,
//         socials: {
//           deleteMany: {}, // Delete existing socials first
//           create:
//             socialLinks?.map((social) => ({
//               url: social.url!,
//             })) || [],
//         },
//       },
//     });

//     return { status: "success", message: "Profile details saved" };
//   } catch (error: any) {
//     return {
//       status: "error",
//       message:
//         error.code === "P2002"
//           ? "This email is already in use. Please use another one."
//           : "Failed to save profile details",
//     };
//   }
// };

// export const saveProfile = async (
//   data: OnboardingPrismaProfileSchemaType & { referralCode?: string },
//   bankCode: string
// ): Promise<ApiResponse> => {
//   const { user } = await requireUser();

//   try {
//     const { socialLinks, referralCode, ...userData } = data;

//     // Use a transaction to ensure both user update and referral payment succeed together
//     return await prisma.$transaction(async (tx) => {
//       // 1. Update the onboarding user
//       const updatedUser = await tx.user.update({
//         where: { id: user.id },
//         data: {
//           ...userData,
//           bankCode,
//           onboardingCompleted: true,
//           socials: {
//             deleteMany: {},
//             create: socialLinks?.map((social) => ({ url: social.url! })) || [],
//           },
//         },
//       });

//       // 2. Process Referral if code exists
//       if (referralCode && referralCode.trim() !== "") {
//         const referrer = await tx.user.findUnique({
//           where: { username: referralCode.trim() },
//         });

//         // Validation: Referrer must exist and cannot be the same person
//         if (referrer && referrer.id !== user.id) {
//           await tx.user.update({
//             where: { id: referrer.id },
//             data: {
//               earnings: { increment: 500 },
//               lifeTimeEarnings: { increment: 500 },
//             },
//           });

//           // 3. Log the activity for the referrer
//           await tx.recentActivity.create({
//             data: {
//               type: "DEPOSIT_RECEIVED",
//               userId: referrer.id,
//               description: `Referral bonus: ₦500 for inviting ${updatedUser.name}`,
//               metadata: { amount: 500, referredUserId: updatedUser.id },
//             },
//           });
//         }
//       }

//       revalidatePath("/");
//       return { status: "success", message: "Profile details saved!" };
//     });
//   } catch (error) {
//     console.error("Onboarding Error:", error);
//     return { status: "error", message: "Failed to save profile details" };
//   }
// };

// Add this import at the top of your actions.ts

const generateUniqueCode = (username: string) => {
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${username.toUpperCase().replace(/\s+/g, "")}-${suffix}`;
};

export const saveProfile = async (
  data: OnboardingPrismaProfileSchemaType & { referralCode?: string },
  bankCode: string
): Promise<ApiResponse> => {
  const { user } = await requireUser();

  try {
    const { socialLinks, referralCode: inputCode, ...userData } = data;

    // We execute everything inside the transaction to ensure data consistency
    return await prisma.$transaction(async (tx) => {
      // 1. Fetch current user details to see if they already have a code
      const currentUser = await tx.user.findUnique({
        where: { id: user.id },
        select: { referralCode: true, status: true },
      });

      if (!currentUser) throw new Error("User not found");

      // Safety check for account status
      if (currentUser.status === "SUSPENDED")
        return { status: "error", message: "Account suspended" };

      // 2. Generate a referral code ONLY if they don't have one yet
      const myGeneratedCode =
        currentUser.referralCode || generateUniqueCode(data.username);

      // 3. Update the current user
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          ...userData,
          referralCode: myGeneratedCode,
          bankCode,
          onboardingCompleted: true,
          socials: {
            deleteMany: {},
            create: socialLinks?.map((s) => ({ url: s.url! })) || [],
          },
        },
      });

      // 4. Handle Referral Logic (The person who invited THIS user)
      if (inputCode && inputCode.trim() !== "") {
        // IMPORTANT: Search by referralCode field, not username,
        // since we are now using unique generated codes
        const referrer = await tx.user.findUnique({
          where: { referralCode: inputCode.trim() },
        });

        // Validation: Referrer exists and isn't the same person
        if (referrer && referrer.id !== user.id) {
          await tx.user.update({
            where: { id: referrer.id },
            data: {
              earnings: { increment: 500 },
              lifeTimeEarnings: { increment: 500 },
            },
          });

          await tx.recentActivity.create({
            data: {
              type: "DEPOSIT_RECEIVED",
              userId: referrer.id,
              description: `Referral bonus: ₦500 for inviting ${updatedUser.name}`,
            },
          });

          await tx.payout.create({
            data: {
              userId: referrer.id,
              amount: 500,
              fee: 0,
              title: `Referral Bonus: ${updatedUser.name}`, // Friendly title for the UI
              type: "CREDIT", // Ensures the icon is green/up arrow
              status: "PAID", // Bonus is instant
            },
          });

          // 5. Send Email to Referrer (Mailjet)
          if (referrer.emailNotification) {
            try {
              await mailjet.post("send", { version: "v3.1" }).request({
                Messages: [
                  {
                    From: { Email: env.SENDER_EMAIL_ADDRESS, Name: "grabcash" },
                    To: [{ Email: referrer.email, Name: referrer.name }],
                    Subject: "You just earned a referral bonus! ₦500",
                    HTMLPart: ReferralBonusEmail({
                      referrerName: referrer.name || "User",
                      referredUserName: updatedUser.name,
                    }),
                  },
                ],
              });
            } catch (mailError) {
              // We don't crash the whole process if email fails
            }
          }
        }
      }

      revalidatePath("/");
      return { status: "success", message: "Profile details saved" };
    });
  } catch (error) {
    console.error("SaveProfile Error:", error);
    return { status: "error", message: "Failed to save profile" };
  }
};

// export const saveProfile = async (
//   data: OnboardingPrismaProfileSchemaType & { referralCode?: string },
//   bankCode: string
// ): Promise<ApiResponse> => {
//   const { user } = await requireUser();

//   try {
//     const { socialLinks, referralCode: inputCode, ...userData } = data;

//     const myCode =
//       userDetails.referralCode || generateUniqueCode(data.username);

//     return await prisma.$transaction(async (tx) => {
//       // 1. Update the current user (the one being referred)
//       const updatedUser = await tx.user.update({
//         where: { id: user.id },
//         data: {
//           ...userData,
//           referralCode: myCode, // Save the generated code
//           bankCode,
//           onboardingCompleted: true,
//           socials: {
//             deleteMany: {},
//             create: socialLinks?.map((s) => ({ url: s.url! })) || [],
//           },
//         },
//       });

//       // 2. Handle Referral Logic
//       if (inputCode && inputCode.trim() !== "") {
//         const referrer = await tx.user.findUnique({
//           where: { username: inputCode.trim() }, // Or findUnique({ where: { referralCode: inputCode } }) if you added that field
//         });

//         if (referrer && referrer.id !== user.id) {
//           // Update Referrer Earnings
//           await tx.user.update({
//             where: { id: referrer.id },
//             data: {
//               earnings: { increment: 500 },
//               lifeTimeEarnings: { increment: 500 },
//             },
//           });

//           // Log Activity
//           await tx.recentActivity.create({
//             data: {
//               type: "DEPOSIT_RECEIVED",
//               userId: referrer.id,
//               description: `Referral bonus: ₦500 for inviting ${updatedUser.name}`,
//             },
//           });

//           // ✅ Send Email to Referrer via Mailjet
//           // We do this outside the transaction's critical path or via a background task if possible
//           if (referrer.emailNotification) {
//             await mailjet.post("send", { version: "v3.1" }).request({
//               Messages: [
//                 {
//                   From: {
//                     Email: env.SENDER_EMAIL_ADDRESS,
//                     Name: "grabcash",
//                   },
//                   To: [{ Email: referrer.email, Name: referrer.name }],
//                   Subject: "You just earned a referral bonus! ₦500",
//                   HTMLPart: ReferralBonusEmail({
//                     referrerName: referrer.name,
//                     referredUserName: updatedUser.name,
//                   }),
//                 },
//               ],
//             });
//           }
//         }
//       }

//       revalidatePath("/");
//       return { status: "success", message: "Profile details saved" };
//     });
//   } catch (error) {
//     console.error(error);
//     return { status: "error", message: "Failed to save profile" };
//   }
// };
