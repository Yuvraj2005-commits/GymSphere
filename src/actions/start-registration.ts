"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/otp";
import { resend } from "@/lib/resend";

import OTPEmail from "@/emails/otp-email";

interface StartRegistrationInput {
  name: string;
  email: string;
  password: string;
}

export async function startRegistration(
  data: StartRegistrationInput
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists.",
      };
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      12
    );

    const otp = generateOTP();

    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await prisma.pendingRegistration.upsert({
      where: {
        email: data.email,
      },
      update: {
        name: data.name,
        password: hashedPassword,
        otp,
        expiresAt,
      },
      create: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        otp,
        expiresAt,
      },
    });

    const { error } = await resend.emails.send({
      from: "GymSphere <onboarding@resend.dev>",
      to: data.email,
      subject: "Verify your GymSphere account",
      react: OTPEmail({ otp }),
    });

    if (error) {
      console.error(error);

      return {
        success: false,
        message: "Failed to send OTP.",
      };
    }

    return {
      success: true,
      message: "OTP sent successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}