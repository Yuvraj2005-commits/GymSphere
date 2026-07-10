"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const exists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (exists) {
    return {
      success: false,
      message: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
}