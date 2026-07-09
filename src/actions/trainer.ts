"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import {
  TrainerInput,
  TrainerSchema,
} from "@/lib/validations/trainer";

export async function createTrainer(
  data: TrainerInput
) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = TrainerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid trainer data",
    };
  }

  const owner = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      owner: true,
    },
  });

  if (!owner?.owner) {
    return {
      success: false,
      message: "Owner not found",
    };
  }

  // Prevent duplicate email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsed.data.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists",
    };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
    },
  });

  await prisma.trainer.create({
    data: {
      gymId: owner.owner.gymId,
      userId: user.id,
      specialization: parsed.data.specialization,
    },
  });

  revalidatePath("/dashboard/trainers");

  return {
    success: true,
    message: "Trainer created successfully",
  };
}

export async function deleteTrainer(
  id: string
) {
  const trainer =
    await prisma.trainer.findUnique({
      where: {
        id,
      },
    });

  if (!trainer) {
    return {
      success: false,
    };
  }

  await prisma.user.delete({
    where: {
      id: trainer.userId,
    },
  });

  revalidatePath("/dashboard/trainers");

  return {
    success: true,
  };
}
export async function updateTrainer(
  id: string,
  data: TrainerInput
) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = TrainerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid trainer data",
    };
  }

  const trainer = await prisma.trainer.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!trainer) {
    return {
      success: false,
      message: "Trainer not found",
    };
  }

  await prisma.user.update({
    where: {
      id: trainer.userId,
    },
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
    },
  });

  await prisma.trainer.update({
    where: {
      id,
    },
    data: {
      specialization: parsed.data.specialization,
    },
  });

  revalidatePath("/dashboard/trainers");

  return {
    success: true,
    message: "Trainer updated successfully",
  };
}