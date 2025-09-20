export function VerificationEmail({ otp }: { otp: string }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Email Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="margin: 40px auto; background: #ffffff; border-radius: 8px; padding: 20px;">
          <tr>
            <td style="text-align: center; padding: 20px;">
              <h1 style="color: #111827; margin-bottom: 10px; font-size: 24px;">Email Verification</h1>
              <p style="color: #6b7280; font-size: 16px; margin: 0;">Welcome to Earnsphere!</p>
            </td>
          </tr>

          <tr>
            <td style="background: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center;">
              <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                Please use this verification code to complete your registration:
              </p>

              <div style="background: #ffffff; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; display: inline-block;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111827; font-family: monospace;">
                  ${otp}
                </span>
              </div>

              <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                This code will expire in <b>5 minutes</b>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-top: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                If you didn't create an account with Earnsphere, please ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
