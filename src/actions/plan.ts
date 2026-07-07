"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

import {
  PlanInput,
  PlanSchema,
} from "@/lib/validations/plan";

export async function createPlan(data: PlanInput) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = PlanSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid Data",
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
      success: false,
      message: "Owner not found",
    };
  }

  await prisma.membershipPlan.create({
    data: {
      gymId: user.owner.gymId,

      name: parsed.data.name,

      description: parsed.data.description,

      durationDays: parsed.data.durationDays,

      price: parsed.data.price,
    },
  });

  revalidatePath("/dashboard/plans");

  return {
    success: true,
    message: "Plan created successfully",
  };
}