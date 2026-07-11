import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import PlanCard from "./plan-card";

export default async function PlansGrid() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const plans = await prisma.membershipPlan.findMany({
    where: {
      gymId: owner.gymId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (plans.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <h2 className="text-2xl font-semibold">No Membership Plans Yet</h2>

        <p className="mt-2 text-muted-foreground">
          Create your first membership plan to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={{
            ...plan,
            price: Number(plan.price),
          }}
        />
      ))}
    </div>
  );
}
