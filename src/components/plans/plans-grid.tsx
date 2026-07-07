import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import PlanCard from "./plan-card";

export default async function PlansGrid() {
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

  const plans = await prisma.membershipPlan.findMany({
    where: {
      gymId: user.owner.gymId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (plans.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <h2 className="text-2xl font-semibold">
          No Membership Plans Yet
        </h2>

        <p className="mt-2 text-muted-foreground">
          Create your first membership plan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
        />
      ))}
    </div>
  );
}