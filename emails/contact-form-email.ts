import { formatDate } from "@/lib/utils";

export const ContactFormEmail = ({
  name,
  email,
  date,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: any;
}) => {
  return `
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Contact Form Submission - Grabcash</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:20px;">
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="color:#0077b6; margin:0;">📩 New Contact Form Submission</h2>
              </td>
            </tr>
            <tr>
              <td style="color:#333; font-size:15px; line-height:22px;">
                <p>Hello Admin,</p>
                <p>
                  A new message has been submitted via the <strong>Grabcash Contact Form</strong>.  
                  Here are the details:
                </p>
                <table width="100%" cellpadding="6" cellspacing="0" style="background:#f9f9f9; border:1px solid #ddd; border-radius:6px;">
                  <tr>
                    <td width="150" style="font-weight:bold;">Name:</td>
                    <td>${name}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;">Email:</td>
                    <td>${email}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;">Subject:</td>
                    <td>${subject}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;">Message:</td>
                    <td>${message}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;">Date:</td>
                    <td>${formatDate(date)}</td>
                  </tr>
                </table>
                <p style="margin-top:20px;">
                  Please respond to this inquiry as soon as possible.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:20px;">
                <a href="mailto:${email}" 
                   style="background:#0077b6; color:#fff; text-decoration:none; padding:12px 20px; border-radius:5px; display:inline-block;">
                   Reply to ${name}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px; font-size:13px; color:#666;" align="center">
                &copy; 2026 Grabcash. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `;
};
