// import { redirect } from "next/navigation";
// import { getUserDetails } from "../get-user-details";
// import { prisma } from "@/lib/db";
// import { SubscriptionExpired } from "@/emails/subscription-expired";
// import { env } from "@/lib/env";

// import Mailjet from "node-mailjet";
// const mailjet = Mailjet.apiConnect(
//   env.MAILJET_API_PUBLIC_KEY,
//   env.MAILJET_API_PRIVATE_KEY
// );

// export const requireSubscription = async () => {
//   const user = await getUserDetails();

//   if (user.subscription?.plan.name === "Basic" || user.subscription === null) {
//     if (!user.isAdmin) return redirect("/subscriptions");
//     return;
//   }

//   const { subscription } = user;
//   const now = new Date();

//   // Check validity
//   const isExpired =
//     !subscription ||
//     subscription.status !== "ACTIVE" ||
//     now < new Date(subscription.startDate) ||
//     now > new Date(subscription.endDate);

//   if (isExpired) {
//     // Update subscription to EXPIRED in DB
//     await prisma.subscription.update({
//       where: { id: subscription.id },
//       data: { status: "EXPIRED" },
//     });

//     // Send rejection email
//     await mailjet.post("send", { version: "v3.1" }).request({
//       Messages: [
//         {
//           From: {
//             Email: env.SENDER_EMAIL_ADDRESS,
//             Name: "grabcash",
//           },
//           To: [{ Email: user.email, Name: user.name }],
//           Subject: `Subscription Expired`,
//           HTMLPart: SubscriptionExpired({
//             name: user.name,
//           }),
//         },
//       ],
//     });

//     if (!user.isAdmin) return redirect("/subscription-expired");
//   }

//   // subscription is active, allow access
//   return;
// };

"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { SubscriptionExpired } from "@/emails/subscription-expired";
import { getUserDetails } from "../get-user-details";

import Mailjet from "node-mailjet";
import { logActivity } from "../../admin/activity/log-activity";
const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export const requireSubscription = async () => {
  const user = await getUserDetails();
  const now = new Date();

  // ✅ Admins bypass subscription check
  if (user.isAdmin) return;

  // ✅ Get latest active subscription (history model)
  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id, isActive: true },
    include: { plan: true },
  });

  // ✅ Case 1: No subscription OR still on Basic
  if (!subscription || subscription.plan.name === "Basic") {
    return redirect("/subscriptions");
  }

  // ✅ Case 2: Expired or not valid
  const expired =
    subscription.status !== "ACTIVE" ||
    now < new Date(subscription.startDate) ||
    now > new Date(subscription.endDate);

  if (expired) {
    // Update DB
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "EXPIRED", isActive: false },
    });

    // Log activity
    await logActivity({
      type: "USER_UPGRADED",
      description: `${user.name || user.email} subscription expired`,
      userId: user.id,
      subscriptionId: subscription.id,
      metadata: {
        planName: subscription.plan.name,
        expiredAt: subscription.endDate,
      },
    });

    if (user.emailNotification) {
      // Send email (only once per subscription)
      await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: env.SENDER_EMAIL_ADDRESS,
              Name: "grabcash",
            },
            To: [{ Email: user.email, Name: user.name }],
            Subject: `Your ${subscription.plan.name} subscription has expired`,
            HTMLPart: SubscriptionExpired({ name: user.name }),
          },
        ],
      });
    }

    return redirect("/subscription-expired");
  }

  // ✅ Case 3: Subscription valid
  return;
};
