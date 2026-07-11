"use client";

import Link from "next/link";
import { CalendarDays, Pencil } from "lucide-react";

import DeletePlanDialog from "./delete-plan-dialog";

interface Plan {
  id: string;
  name: string;
  description: string | null;
  durationDays: number;
  price: number | string;
  isActive: boolean;
}

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({
  plan,
}: Readonly<PlanCardProps>) {
  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {plan.name}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            plan.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {plan.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="mt-3 min-h-12 text-muted-foreground">
        {plan.description || "No description provided."}
      </p>

      <div className="mt-6">
        <p className="text-3xl font-bold">
          ₹{Number(plan.price).toLocaleString("en-IN")}
        </p>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          {plan.durationDays} Days
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href={`/dashboard/plans/${plan.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 transition hover:bg-muted"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Link>

        <DeletePlanDialog planId={plan.id} />
      </div>
    </div>
  );
}