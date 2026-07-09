"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { MemberInput, MemberSchema } from "@/lib/validations/member";

export async function createMember(data: MemberInput) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = MemberSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid member data",
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
  const plan = await prisma.membershipPlan.findUnique({
    where: {
      id: parsed.data.membershipPlanId,
    },
  });

  if (!plan) {
    throw new Error("Membership plan not found");
  }

  const membershipStart = new Date();

  const membershipEnd = new Date(membershipStart);

  membershipEnd.setDate(membershipEnd.getDate() + plan.durationDays);
  console.log({
  durationDays: plan.durationDays,
  membershipStart,
  membershipEnd,
});

  await prisma.member.create({
    data: {
      gymId: user.owner.gymId,

      membershipPlanId: parsed.data.membershipPlanId,

      membershipStart,
      membershipEnd,

      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,

      email: parsed.data.email || null,
      phone: parsed.data.phone,

      height: parsed.data.height,
      weight: parsed.data.weight,

      emergencyContactName: parsed.data.emergencyContactName,

      emergencyContactPhone: parsed.data.emergencyContactPhone,
    },
  });

  revalidatePath("/dashboard/members");

  return {
    success: true,
    message: "Member created successfully",
  };
}

export async function updateMember(id: string, data: MemberInput) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = MemberSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid member data",
    };
  }

  await prisma.member.update({
    where: {
      id,
    },
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,

      email: parsed.data.email || null,
      phone: parsed.data.phone,

      membershipPlanId: parsed.data.membershipPlanId,

      height: parsed.data.height,
      weight: parsed.data.weight,

      emergencyContactName: parsed.data.emergencyContactName,

      emergencyContactPhone: parsed.data.emergencyContactPhone,
    },
  });

  revalidatePath("/dashboard/members");

  return {
    success: true,
    message: "Member updated successfully",
  };
}

export async function deleteMember(id: string) {
  await prisma.member.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/members");

  return {
    success: true,
    message: "Member deleted successfully",
  };
}
