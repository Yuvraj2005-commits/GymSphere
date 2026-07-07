"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { GymSchema, GymInput } from "@/lib/validations/gym";

export async function createGym(data: GymInput) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const parsed = GymSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid data",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const gym = await prisma.gym.create({
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      address: parsed.data.address,
    },
  });

  await prisma.owner.create({
    data: {
      userId: user.id,
      gymId: gym.id,
    },
  });

  redirect("/dashboard");
}