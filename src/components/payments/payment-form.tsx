import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import PaymentFormClient from "./payment-form-client";

export default async function PaymentForm() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const members = await prisma.member.findMany({
    where: {
      gymId: owner.gymId,
    },

    orderBy: {
      firstName: "asc",
    },

    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return (
    <PaymentFormClient
      members={members}
    />
  );
}