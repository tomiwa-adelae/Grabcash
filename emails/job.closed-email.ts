import { env } from "@/lib/env";

export const JobClosedEmail = ({
  ownerName,
  jobTitle,
  noOfWorkers,
  slug,
}: {
  ownerName: string;
  jobTitle: string;
  noOfWorkers: string;
  slug: string;
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333; margin-bottom: 10px;">Job Closed</h1>
        <p style="color: #666; font-size: 16px;">
          Hello ${ownerName}, your job <strong>"${jobTitle}"</strong> has now been closed.
        </p>
      </div>

      <div style="background: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
        <p style="color: #333; font-size: 16px; margin-bottom: 15px;">
          ✅ The required number of workers (<strong>${noOfWorkers}</strong>) has been met.
        </p>
        <p style="color: #333; font-size: 16px; margin-bottom: 15px;">
          It’s now time to review the submissions made for this job.
        </p>
        <a href="${env.NEXT_PUBLIC_BETTER_AUTH_URL}/jobs/${slug}/submissions" 
          style="display: inline-block; padding: 12px 20px; background: #2563eb; color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold;">
          Review Submissions
        </a>
      </div>

      <div style="border-top: 1px solid #e9ecef; padding-top: 20px; text-align: center;">
        <p style="color: #666; font-size: 14px; margin: 0;">
          Please review submissions promptly so workers can get rewarded.  
        </p>
      </div>
    </div>
  `;
};
