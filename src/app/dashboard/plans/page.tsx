import Link from "next/link";
import PlansGrid from "@/components/plans/plans-grid";

export default function PlansPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
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
          className="rounded-xl bg-primary px-5 py-3 text-primary-foreground"
        >
          + Add Plan
        </Link>
      </div>

      <PlansGrid />
    </div>
  );
}