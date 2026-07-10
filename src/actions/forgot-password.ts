"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Don't reveal whether the email exists
  if (!user) {
    return {
      success: true,
      message:
        "If an account exists, a reset link has been generated.",
    };
  }

  const token = randomUUID();

  const expires = new Date(
    Date.now() + 1000 * 60 * 30
  ); // 30 minutes

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  // Development only
  console.log(
    `Reset Link: http://localhost:3000/reset-password/${token}`
  );

  return {
    success: true,
    message:
      "Reset link generated. Check server console.",
  };
}