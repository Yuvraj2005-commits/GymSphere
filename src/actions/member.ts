"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import {
  MemberInput,
  MemberSchema,
} from "@/lib/validations/member";

export async function createMember(data: MemberInput) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const parsed = MemberSchema.safeParse(data);

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
    include: {
      owner: true,
    },
  });

  if (!user?.owner) {
    throw new Error("Owner not found");
  }

  await prisma.member.create({
    data: {
      gymId: user.owner.gymId,

      membershipPlanId: parsed.data.membershipPlanId,

      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,

      email: parsed.data.email || null,
      phone: parsed.data.phone,

      height: parsed.data.height,
      weight: parsed.data.weight,

      emergencyContactName:
        parsed.data.emergencyContactName,

      emergencyContactPhone:
        parsed.data.emergencyContactPhone,
    },
  });

  revalidatePath("/dashboard/members");

  return {
    success: true,
  };
}