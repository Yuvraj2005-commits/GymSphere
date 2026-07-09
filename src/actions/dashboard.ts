"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const totalMembers = await prisma.member.count();

  const totalPlans = await prisma.membershipPlan.count();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendanceToday = await prisma.attendance.count({
    where: {
      checkIn: {
        gte: today,
      },
    },
  });

  const payments = await prisma.payment.findMany({
    select: {
      amount: true,
    },
  });

  const revenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  return {
    revenue,
    totalMembers,
    totalPlans,
    attendanceToday,
  };
}