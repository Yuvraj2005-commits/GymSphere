"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

import { generateOTP, getOTPExpiry } from "@/lib/otp";

import OTPEmail from "@/emails/otp-email";

export async function sendOTP(email: string) {
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

    const otp = generateOTP();
    const expiresAt = getOTPExpiry();

    await prisma.pendingRegistration.update({
      where: {
        email,
      },
      data: {
        otp,
        expiresAt,
      },
    });

    const { error } = await resend.emails.send({
      from: "GymSphere <onboarding@resend.dev>",
      to: email,
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