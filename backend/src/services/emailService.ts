import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { renderToString } from "react-dom/server"; // Remove this if not required
import { EmailTemplate } from "./EmailTemplate";
import React from "react";

dotenv.config({ path: path.resolve(__dirname, "../../config/.env") });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} as nodemailer.TransportOptions);

export const sendVerificationEmail = async (
  to: string,
  code: string
): Promise<void> => {
  const subject = "Your Verification Code";
  const text = `Your verification code is: ${code}`;
  const html = renderToString(React.createElement(EmailTemplate, { code }));

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};
