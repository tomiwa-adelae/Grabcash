import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { addDays } from "date-fns";
import { sendJobSubmissionReviewedEmail } from "@/emails/send-job-submission-reviewed-email";

export async function GET() {
  try {
    const now = new Date();

    // Find all PENDING submissions older than 7 days
    const submissions = await prisma.applicant.findMany({
      where: {
        status: "PENDING",
        createdAt: {
          lt: addDays(now, -7),
        },
      },
      include: {
        Job: {
          select: {
            id: true,
            title: true,
            reward: true,
            userId: true,
          },
        },
        User: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    for (const submission of submissions) {
      // Mark as approved
      await prisma.applicant.update({
        where: { id: submission.id },
        data: { status: "APPROVED" },
      });

      // Credit the worker (assuming you store earnings on User)
      await prisma.user.update({
        where: { id: submission.userId },
        data: { earnings: { increment: Number(submission.Job.reward) } },
      });

      // Send email to worker
      await sendJobSubmissionReviewedEmail({
        to: submission.User.email,
        workerName: submission.User.name,
        jobTitle: submission.Job.title,
        status: "APPROVED",
        reward: submission.Job.reward!,
        reason:
          "No action was taken by the job owner within 7 days, so your submission has been auto-approved.",
      });
    }

    return NextResponse.json({
      success: true,
      autoApproved: submissions.length,
    });
  } catch (error) {
    console.error("Auto-approve cron error:", error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}
