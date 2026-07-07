import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

import MemberFormClient from "@/components/members/member-form-client";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const { id } = await params;

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

  const member = await prisma.member.findFirst({
    where: {
      id,
      gymId: user.owner.gymId,
    },
  });

  if (!member) {
    notFound();
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Edit Member</h1>

        <p className="text-muted-foreground">Update member information.</p>
      </div>

      <MemberFormClient plans={plans} member={member} mode="edit" />
    </div>
  );
}
