"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGymSettings() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const owner = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      owner: {
        include: {
          gym: true,
        },
      },
    },
  });

  if (!owner?.owner?.gym) {
    throw new Error("Gym not found");
  }

  return owner.owner.gym;
}

export async function updateGymSettings(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Unauthorized",
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

  await prisma.gym.update({
    where: {
      id: owner.owner.gymId,
    },
    data,
  });

  revalidatePath("/dashboard/settings");

  return {
    success: true,
    message: "Settings updated successfully",
  };
}