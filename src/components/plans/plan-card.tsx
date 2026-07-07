"use client";

import { CalendarDays, Pencil, Trash2 } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string | null;
  durationDays: number;
  price: any;
  isActive: boolean;
}

export default function PlanCard({
  plan,
}: {
  plan: Plan;
}) {
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

      <p className="mt-3 text-muted-foreground">
        {plan.description || "No description"}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">
            ₹{Number(plan.price).toLocaleString()}
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {plan.durationDays} Days
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 hover:bg-muted">
          <Pencil className="h-4 w-4" />
          Edit
        </button>

        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-red-500 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}