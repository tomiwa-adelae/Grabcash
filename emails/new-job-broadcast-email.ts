import { env } from "@/lib/env";

export const NewJobBroadcastEmail = ({
  jobTitle,
  category,
  reward,
  noOfWorkers,
  slug,
}: {
  jobTitle: string;
  category: string;
  reward: string;
  noOfWorkers: string;
  slug: string;
}) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #333; margin-bottom: 10px;">🚀 New Job Posted</h1>
      <p style="color: #666; font-size: 16px;">A fresh opportunity just went live on <strong>grabcash</strong>!</p>
    </div>

    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
      <h2 style="color: #333; margin-bottom: 10px;">${jobTitle}</h2>
      <p style="color: #666; font-size: 14px; margin: 5px 0;">
        <strong>Category:</strong> ${category}
      </p>
      <p style="color: #666; font-size: 14px; margin: 5px 0;">
        <strong>Reward:</strong> ${reward}
      </p>
      <p style="color: #666; font-size: 14px; margin: 5px 0;">
        <strong>Workers Needed:</strong> ${noOfWorkers}
      </p>

      <div style="text-align: center; margin-top: 20px;">
        <a href="${env.NEXT_PUBLIC_BETTER_AUTH_URL}/available-jobs/${slug}" 
           style="background: #007bff; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
          Apply Now
        </a>
      </div>
    </div>

    <div style="border-top: 1px solid #e9ecef; padding-top: 20px; text-align: center;">
      <p style="color: #666; font-size: 14px; margin: 0;">
        You’re receiving this email because you’re part of grabcash. 
        Don’t miss out—apply before the slots are filled!
      </p>
    </div>
  </div>
`;
