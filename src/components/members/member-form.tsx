import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import MemberFormClient from "./member-form-client";

export default async function MemberForm() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const plans = await prisma.membershipPlan.findMany({
    where: {
      gymId: owner.gymId,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <MemberFormClient
      plans={plans}
      mode="create"
    />
  );
}