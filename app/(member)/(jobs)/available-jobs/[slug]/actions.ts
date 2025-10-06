"use server";

import { getUserDetails } from "@/app/data/user/get-user-details";
import { requireUser } from "@/app/data/user/require-user";
import { requireSubscription } from "@/app/data/user/subscription/require-subscription";
import { JobClosedEmail } from "@/emails/job.closed-email";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { generateSuffix } from "@/lib/utils";

import Mailjet from "node-mailjet";
const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export const saveApplicantScreenshot = async (
  jobId: string,
  screenshots: string[]
) => {
  const { user } = await requireUser();
  await requireSubscription();

  try {
    const userDetails = await getUserDetails();
    if (userDetails.status === "SUSPENDED")
      return { status: "error", message: "Your account has been suspended" };

    if (userDetails.status === "DELETED")
      return { status: "error", message: "Your account has been deleted" };

    if (screenshots.length === 0 || !screenshots)
      return { status: "error", message: "No screenshot to save" };

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      select: {
        jobOpen: true,
        noOfWorkers: true,
        title: true,
        slug: true,
        id: true,
        User: {
          select: {
            email: true,
            name: true,
            id: true,
          },
        },
        _count: {
          select: {
            applicants: {
              where: {
                status: { in: ["PENDING", "APPROVED"] },
              },
            },
          },
        },
      },
    });

    if (!job) return { status: "error", message: "Oops! An error occurred!" };

    if (!job.jobOpen)
      return {
        status: "error",
        message: "This job is no longer accepting applications!",
      };

    if (job.User.id === user.id)
      return { status: "error", message: "You cannot apply for your own job." };

    const alreadyApplied = await prisma.applicant.findFirst({
      where: {
        jobId,
        userId: user.id,
      },
    });

    if (alreadyApplied)
      return {
        status: "error",
        message: "You can not submit an application for this job again.",
      };

    if (job._count.applicants >= Number(job.noOfWorkers)) {
      await prisma.job.update({
        where: {
          id: jobId,
        },
        data: {
          jobOpen: false,
        },
      });
      return {
        status: "error",
        message: "This Job has already reached it workers limit",
      };
    }

    const year = new Date().getFullYear();
    let suffix = generateSuffix();
    let applicationID = `AP-${year}-${suffix}`;

    let existing = await prisma.applicant.findUnique({
      where: {
        applicationID,
      },
    });

    while (existing) {
      suffix = generateSuffix();
      applicationID = `AP-${year}-${suffix}`;
      existing = await prisma.applicant.findUnique({
        where: {
          applicationID,
        },
      });
    }

    const applicant = await prisma.applicant.create({
      data: {
        screenshots,
        jobId,
        userId: user.id,
        applicationID,
      },
    });

    await prisma.job.update({
      where: { id: job.id },
      data: { filledSlots: { increment: 1 } },
    });

    if (job._count.applicants + 1 >= Number(job.noOfWorkers)) {
      await prisma.job.update({
        where: {
          id: jobId,
        },
        data: {
          jobOpen: false,
        },
      });

      if (userDetails.emailNotification) {
        await mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: {
                Email: env.SENDER_EMAIL_ADDRESS,
                Name: "grabcash",
              },
              To: [{ Email: job.User.email, Name: job.User.name }],
              Subject: `Job closed - ${job.title}`,
              HTMLPart: JobClosedEmail({
                ownerName: job.User.name,
                jobTitle: job.title,
                noOfWorkers: job.noOfWorkers!,
                slug: job.slug!,
              }),
            },
          ],
        });
      }
    }

    return {
      status: "success",
      message: "Job application successful",
      id: applicant.id,
    };
  } catch (error) {
    return { status: "error", message: "Failed to submit application" };
  }
};
