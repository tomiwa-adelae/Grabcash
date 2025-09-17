"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { generateSuffix } from "@/lib/utils";

export const saveApplicantScreenshot = async (
  jobId: string,
  screenshots: string[]
) => {
  const { user } = await requireUser();

  try {
    if (screenshots.length === 0 || !screenshots)
      return { status: "error", message: "No screenshot to save" };

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: { applicants: true, User: true },
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

    if (job.applicants.length >= Number(job.noOfWorkers)) {
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

    if (job.applicants.length + 1 >= Number(job.noOfWorkers)) {
      await prisma.job.update({
        where: {
          id: jobId,
        },
        data: {
          jobOpen: false,
        },
      });
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
