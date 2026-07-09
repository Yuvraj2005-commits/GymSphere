"use server";

import { prisma } from "@/lib/prisma";

export async function getRevenueChartData() {
  const payments = await prisma.payment.findMany({
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