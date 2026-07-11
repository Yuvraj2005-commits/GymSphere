"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      revenue: 0,
      totalMembers: 0,
      totalPlans: 0,
      attendanceToday: 0,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      owner: true,
    },
  });

  if (!user?.owner) {
    return {
      revenue: 0,
      totalMembers: 0,
      totalPlans: 0,
      attendanceToday: 0,
    };
  }

  const gymId = user.owner.gymId;

  const totalMembers = await prisma.member.count({
    where: {
      gymId,
    },
  });

  const totalPlans = await prisma.membershipPlan.count({
    where: {
      gymId,
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendanceToday = await prisma.attendance.count({
    where: {
      member: {
        gymId,
      },
      checkIn: {
        gte: today,
      },
    },
  });

  const payments = await prisma.payment.findMany({
    where: {
      member: {
        gymId,
      },
    },
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