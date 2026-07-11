import Link from "next/link";

import PlansGrid from "@/components/plans/plans-grid";

export default function PlansPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Membership Plans
          </h1>

          <p className="text-muted-foreground">
            Manage all membership plans.
          </p>
        </div>

        <Link
          href="/dashboard/plans/new"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          + Add Plan
        </Link>
      </div>

      <PlansGrid />
    </div>
  );
}