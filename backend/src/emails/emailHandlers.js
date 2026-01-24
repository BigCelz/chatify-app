import { ENV } from "../lib/env.js";
import { resendClient } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./welcomeEmail.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    await resendClient.emails.send({
      from: `${ENV.EMAIL_FROM_NAME} <${ENV.EMAIL_FROM}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    console.log("✅ Welcome email sent successfully to:", email);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
