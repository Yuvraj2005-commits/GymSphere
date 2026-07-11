"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";
import {
  MemberInput,
  MemberSchema,
} from "@/lib/validations/member";

export async function createMember(data: MemberInput) {
  const owner = await getCurrentOwner();

  if (!owner) {
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

  const plan = await prisma.membershipPlan.findFirst({
    where: {
      id: parsed.data.membershipPlanId,
      gymId: owner.gymId,
    },
  });

  if (!plan) {
    return {
      success: false,
      message: "Membership plan not found.",
    };
  }

  const membershipStart = new Date();

  const membershipEnd = new Date(membershipStart);

  membershipEnd.setDate(
    membershipEnd.getDate() + plan.durationDays
  );

  await prisma.member.create({
    data: {
      gymId: owner.gymId,

      membershipPlanId: plan.id,

      membershipStart,
      membershipEnd,

      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,

      email: parsed.data.email || null,
      phone: parsed.data.phone || null,

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
    message: "Member created successfully.",
  };
}

export async function updateMember(
  id: string,
  data: MemberInput
) {
  const owner = await getCurrentOwner();

  if (!owner) {
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

  const member = await prisma.member.findFirst({
    where: {
      id,
      gymId: owner.gymId,
    },
  });

  if (!member) {
    return {
      success: false,
      message: "Member not found.",
    };
  }

  const plan = await prisma.membershipPlan.findFirst({
    where: {
      id: parsed.data.membershipPlanId,
      gymId: owner.gymId,
    },
  });

  if (!plan) {
    return {
      success: false,
      message: "Membership plan not found.",
    };
  }

  await prisma.member.update({
    where: {
      id,
    },
    data: {
      membershipPlanId: plan.id,

      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,

      email: parsed.data.email || null,
      phone: parsed.data.phone || null,

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
    message: "Member updated successfully.",
  };
}

export async function deleteMember(id: string) {
  const owner = await getCurrentOwner();

  if (!owner) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const member = await prisma.member.findFirst({
    where: {
      id,
      gymId: owner.gymId,
    },
  });

  if (!member) {
    return {
      success: false,
      message: "Member not found.",
    };
  }

  await prisma.member.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/members");

  return {
    success: true,
    message: "Member deleted successfully.",
  };
}