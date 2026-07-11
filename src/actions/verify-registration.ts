"use server";

import { prisma } from "@/lib/prisma";

export async function verifyRegistration(
  email: string,
  otp: string
) {
  try {
    const pending =
      await prisma.pendingRegistration.findUnique({
        where: {
          email,
        },
      });

    if (!pending) {
      return {
        success: false,
        message: "Registration not found.",
      };
    }

    if (pending.expiresAt < new Date()) {
      await prisma.pendingRegistration.delete({
        where: {
          email,
        },
      });

      return {
        success: false,
        message: "OTP has expired.",
      };
    }

    if (pending.otp !== otp) {
      return {
        success: false,
        message: "Invalid OTP.",
      };
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists.",
      };
    }

    await prisma.user.create({
      data: {
        name: pending.name,
        email: pending.email,
        password: pending.password,
      },
    });

    await prisma.pendingRegistration.delete({
      where: {
        email,
      },
    });

    return {
      success: true,
      message:
        "Email verified successfully. Please sign in.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}