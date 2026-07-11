"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(data: {
  name: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      name: data.name,
    },
  });

  revalidatePath("/dashboard/settings");

  return {
    success: true,
    message: "Profile updated successfully.",
  };
}

export async function updateGym(data: {
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
      message: "Owner not found.",
    };
  }

  await prisma.gym.update({
    where: {
      id: owner.owner.gymId,
    },
    data: {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      address: data.address || null,
    },
  });

  revalidatePath("/dashboard/settings");

  return {
    success: true,
    message: "Gym updated successfully.",
  };
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user?.password) {
    return {
      success: false,
      message: "Password login is not enabled for this account.",
    };
  }

  const isValid = await bcrypt.compare(
    data.currentPassword,
    user.password
  );

  if (!isValid) {
    return {
      success: false,
      message: "Current password is incorrect.",
    };
  }

  const hashedPassword = await bcrypt.hash(
    data.newPassword,
    12
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Password changed successfully.",
  };
}