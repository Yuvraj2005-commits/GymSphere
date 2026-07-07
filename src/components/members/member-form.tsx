import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import MemberFormClient from "./member-form-client";

export default async function MemberForm() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
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
    redirect("/dashboard/onboarding");
  }

  const plans = (
    await prisma.membershipPlan.findMany({
      where: {
        gymId: user.owner.gymId,
      },
      orderBy: {
        name: "asc",
      },
    })
  ).map((plan) => ({
    id: plan.id,
    name: plan.name,
  }));

  return <MemberFormClient plans={plans} mode="create" />;
}
