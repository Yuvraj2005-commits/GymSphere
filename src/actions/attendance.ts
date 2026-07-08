"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function checkIn(memberId: string) {
  // Prevent duplicate check-in
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
  };
}
export async function checkOut(attendanceId: string) {
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
  };
}