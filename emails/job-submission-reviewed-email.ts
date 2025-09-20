import { formattedStatus } from "@/lib/utils";

export const JobSubmissionReviewedEmail = ({
  workerName,
  jobTitle,
  status,
  reason,
  reward,
}: {
  workerName: string;
  jobTitle: string;
  status: "APPROVED" | "REJECTED";
  reason?: string;
  reward?: string;
}) => {
  const approved = status === "APPROVED";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: ${approved ? "#28a745" : "#dc3545"}; margin-bottom: 10px;">
          Submission ${approved ? "Approved ✅" : "Rejected ❌"}
        </h1>
        <p style="color: #666; font-size: 16px;">
          Hello ${workerName}, your submission for <strong>${jobTitle}</strong> has been <strong>${formattedStatus[status]}</strong>.
        </p>
      </div>

      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
        ${
          approved
            ? `
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
              🎉 Congratulations! You’ve earned your reward.
            </p>
            <p style="font-size: 18px; font-weight: bold; color: #28a745;">
              Reward: ${reward || "N/A"}
            </p>
          `
            : `
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
              Unfortunately, your submission didn’t meet the requirements.
            </p>
            ${
              reason
                ? `<p style="color: #dc3545; font-size: 14px; margin-top: 10px;">
                  Reason: ${reason}
                </p>`
                : ""
            }
          `
        }
      </div>

      <div style="border-top: 1px solid #e9ecef; padding-top: 20px; text-align: center;">
        <p style="color: #666; font-size: 14px; margin: 0;">
          ${
            approved
              ? "Your earnings will reflect in your dashboard shortly."
              : "You can always apply for other available jobs."
          }
        </p>
      </div>
    </div>
  `;
};
