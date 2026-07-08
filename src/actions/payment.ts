"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import {
  PaymentInput,
  PaymentSchema,
} from "@/lib/validations/payment";

export async function createPayment(
  data: PaymentInput
) {
  const parsed = PaymentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid payment data",
    };
  }

  await prisma.payment.create({
    data: {
      memberId: parsed.data.memberId,

      amount: parsed.data.amount,

      paymentMethod: parsed.data.paymentMethod,

      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/dashboard/payments");

  return {
    success: true,
  };
}
export async function deletePayment(id: string) {
  await prisma.payment.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/payments");

  return {
    success: true,
  };
}