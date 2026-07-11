"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getRevenueChartData() {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
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
    return [];
  }

  const payments = await prisma.payment.findMany({
    where: {
      member: {
        gymId: user.owner.gymId,
      },
    },
    select: {
      amount: true,
      paymentDate: true,
    },
    orderBy: {
      paymentDate: "asc",
    },
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenueMap = new Array(12).fill(0);

  payments.forEach((payment) => {
    const month = payment.paymentDate.getMonth();
    revenueMap[month] += Number(payment.amount);
  });

  return months.map((month, index) => ({
    month,
    revenue: revenueMap[index],
  }));
}