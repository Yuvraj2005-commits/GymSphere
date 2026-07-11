"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import {
  PaymentInput,
  PaymentSchema,
} from "@/lib/validations/payment";

export async function createPayment(
  data: PaymentInput
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = PaymentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid payment data.",
    };
  }

  const member = await prisma.member.findFirst({
    where: {
      id: parsed.data.memberId,
      gymId: owner.gymId,
    },
  });

  if (!member) {
    return {
      success: false,
      message: "Member not found.",
    };
  }

  await prisma.payment.create({
    data: {
      memberId: member.id,
      amount: parsed.data.amount,
      paymentMethod: parsed.data.paymentMethod,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/dashboard/payments");

  return {
    success: true,
    message: "Payment recorded successfully.",
  };
}

export async function updatePayment(
  id: string,
  data: PaymentInput
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = PaymentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid payment data.",
    };
  }

  const payment = await prisma.payment.findFirst({
    where: {
      id,
      member: {
        gymId: owner.gymId,
      },
    },
  });

  if (!payment) {
    return {
      success: false,
      message: "Payment not found.",
    };
  }

  const member = await prisma.member.findFirst({
    where: {
      id: parsed.data.memberId,
      gymId: owner.gymId,
    },
  });

  if (!member) {
    return {
      success: false,
      message: "Member not found.",
    };
  }

  await prisma.payment.update({
    where: {
      id,
    },
    data: {
      memberId: member.id,
      amount: parsed.data.amount,
      paymentMethod: parsed.data.paymentMethod,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/dashboard/payments");

  return {
    success: true,
    message: "Payment updated successfully.",
  };
}

export async function deletePayment(
  id: string
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const payment = await prisma.payment.findFirst({
    where: {
      id,
      member: {
        gymId: owner.gymId,
      },
    },
  });

  if (!payment) {
    return {
      success: false,
      message: "Payment not found.",
    };
  }

  await prisma.payment.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/payments");

  return {
    success: true,
    message: "Payment deleted successfully.",
  };
}