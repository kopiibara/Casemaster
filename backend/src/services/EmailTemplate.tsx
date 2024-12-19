import React from 'react';

interface EmailTemplateProps {
  code: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ code }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F6F9FF;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
          <tr>
            <td align="center" bgcolor="#0F2043" style="padding: 40px 0;">
                
              <h1 style="color: #FFFFFF; font-size: 24px; margin: 0;">Verification Code</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 24px;">Please use the following code to verify your account:</p>
              <p style="background-color: #F6F9FF; border: 2px solid #0F2043; color: #0F2043; font-size: 24px; font-weight: bold; text-align: center; padding: 20px; margin: 30px 0;">
                ${code}
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 24px;">If you didn't request this code, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#F6F9FF" style="padding: 30px 0;">
              <p style="color: #666666; font-size: 14px; margin: 0;">&copy; 2024 CS Legal Solution. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    ` }} />
  );
};