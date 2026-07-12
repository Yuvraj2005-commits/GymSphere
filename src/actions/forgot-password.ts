"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { randomUUID } from "crypto";

import ResetPasswordEmail from "@/emails/reset-password-email";

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Don't reveal whether the email exists
  if (!user) {
    return {
      success: true,
      message:
        "If an account exists, a reset link has been sent.",
    };
  }

  const token = randomUUID();

  const expires = new Date(
    Date.now() + 1000 * 60 * 30
  );

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

  const { error } = await resend.emails.send({
    from: "GymSphere <onboarding@resend.dev>",
    to: email,
    subject: "Reset your GymSphere password",
    react: ResetPasswordEmail({
      resetLink,
    }),
  });

  if (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to send reset email.",
    };
  }

  return {
    success: true,
    message:
      "Password reset link has been sent.",
  };
}