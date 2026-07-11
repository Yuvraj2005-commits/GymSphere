"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import {
  PlanInput,
  PlanSchema,
} from "@/lib/validations/plan";

export async function createPlan(
  data: PlanInput
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = PlanSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid plan data.",
    };
  }

  await prisma.membershipPlan.create({
    data: {
      gymId: owner.gymId,

      name: parsed.data.name,

      description:
        parsed.data.description || null,

      durationDays: parsed.data.durationDays,

      price: parsed.data.price,
    },
  });

  revalidatePath("/dashboard/plans");

  return {
    success: true,
    message: "Membership plan created successfully.",
  };
}

export async function updatePlan(
  id: string,
  data: PlanInput
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = PlanSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid plan data.",
    };
  }

  const plan =
    await prisma.membershipPlan.findFirst({
      where: {
        id,
        gymId: owner.gymId,
      },
    });

  if (!plan) {
    return {
      success: false,
      message: "Membership plan not found.",
    };
  }

  await prisma.membershipPlan.update({
    where: {
      id,
    },
    data: {
      name: parsed.data.name,

      description:
        parsed.data.description || null,

      durationDays:
        parsed.data.durationDays,

      price: parsed.data.price,
    },
  });

  revalidatePath("/dashboard/plans");

  return {
    success: true,
    message: "Membership plan updated successfully.",
  };
}

export async function deletePlan(
  id: string
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const plan =
    await prisma.membershipPlan.findFirst({
      where: {
        id,
        gymId: owner.gymId,
      },
    });

  if (!plan) {
    return {
      success: false,
      message: "Membership plan not found.",
    };
  }

  await prisma.membershipPlan.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/plans");

  return {
    success: true,
    message: "Membership plan deleted successfully.",
  };
}