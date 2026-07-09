"use server";

import { prisma } from "@/lib/prisma";

export async function getReports() {
  const totalMembers = await prisma.member.count();

  const totalPlans = await prisma.membershipPlan.count();

  const totalAttendance = await prisma.attendance.count();

  const totalPayments = await prisma.payment.count();

  const payments = await prisma.payment.findMany({
    select: {
      amount: true,
    },
  });

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  return {
    totalMembers,
    totalPlans,
    totalAttendance,
    totalPayments,
    totalRevenue,
  };
}