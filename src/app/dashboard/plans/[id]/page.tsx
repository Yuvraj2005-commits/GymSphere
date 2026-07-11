import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import PlanForm from "@/components/plans/plan-form";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPlanPage({
  params,
}: PageProps) {
  const { id } = await params;

  const owner = await getCurrentOwner();

  if (!owner) {
    notFound();
  }

  const plan = await prisma.membershipPlan.findFirst({
    where: {
      id,
      gymId: owner.gymId,
    },
  });

  if (!plan) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Edit Membership Plan
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your membership plan details.
        </p>
      </div>

      <PlanForm
        mode="edit"
        plan={{
          id: plan.id,
          name: plan.name,
          description: plan.description,
          durationDays: plan.durationDays,
          price: Number(plan.price),
        }}
      />
    </div>
  );
}