"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

export async function checkIn(memberId: string) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const member = await prisma.member.findFirst({
    where: {
      id: memberId,
      gymId: owner.gymId,
    },
  });

  if (!member) {
    return {
      success: false,
      message: "Member not found.",
    };
  }

  const existing = await prisma.attendance.findFirst({
    where: {
      memberId,
      checkOut: null,
    },
  });

  if (existing) {
    return {
      success: false,
      message: "Member is already checked in.",
    };
  }

  await prisma.attendance.create({
    data: {
      memberId,
      checkIn: new Date(),
    },
  });

  revalidatePath("/dashboard/attendance");

  return {
    success: true,
    message: "Member checked in successfully.",
  };
}

export async function checkOut(
  attendanceId: string
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const attendance =
    await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
        member: {
          gymId: owner.gymId,
        },
      },
    });

  if (!attendance) {
    return {
      success: false,
      message: "Attendance record not found.",
    };
  }

  if (attendance.checkOut) {
    return {
      success: false,
      message: "Member is already checked out.",
    };
  }

  await prisma.attendance.update({
    where: {
      id: attendanceId,
    },
    data: {
      checkOut: new Date(),
    },
  });

  revalidatePath("/dashboard/attendance");

  return {
    success: true,
    message: "Member checked out successfully.",
  };
}