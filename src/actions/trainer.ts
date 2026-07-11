"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import {
  TrainerInput,
  TrainerSchema,
} from "@/lib/validations/trainer";

export async function createTrainer(
  data: TrainerInput
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = TrainerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid trainer data.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsed.data.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "A user with this email already exists.",
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
      gymId: owner.gymId,
      userId: user.id,
      specialization: parsed.data.specialization,
    },
  });

  revalidatePath("/dashboard/trainers");

  return {
    success: true,
    message: "Trainer created successfully.",
  };
}

export async function updateTrainer(
  id: string,
  data: TrainerInput
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = TrainerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid trainer data.",
    };
  }

  const trainer = await prisma.trainer.findFirst({
    where: {
      id,
      gymId: owner.gymId,
    },
    include: {
      user: true,
    },
  });

  if (!trainer) {
    return {
      success: false,
      message: "Trainer not found.",
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: parsed.data.email,
      NOT: {
        id: trainer.userId,
      },
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email is already in use.",
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
    message: "Trainer updated successfully.",
  };
}

export async function deleteTrainer(
  id: string
) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const trainer = await prisma.trainer.findFirst({
    where: {
      id,
      gymId: owner.gymId,
    },
  });

  if (!trainer) {
    return {
      success: false,
      message: "Trainer not found.",
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
    message: "Trainer deleted successfully.",
  };
}