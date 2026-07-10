"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function resetPassword(
  token: string,
  password: string
) {
  const record =
    await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

  if (!record) {
    return {
      success: false,
      message: "Invalid reset link.",
    };
  }

  if (record.expires < new Date()) {
    return {
      success: false,
      message: "Reset link expired.",
    };
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: {
      email: record.email,
    },
    data: {
      password: hashed,
    },
  });

  await prisma.passwordResetToken.delete({
    where: {
      token,
    },
  });

  return {
    success: true,
    message: "Password updated successfully.",
  };
}