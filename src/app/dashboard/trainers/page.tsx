import Link from "next/link";
import { Plus } from "lucide-react";

import TrainerTable from "@/components/trainers/trainer-table";

export default function TrainersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Trainers
          </h1>

          <p className="text-muted-foreground">
            Manage your gym trainers.
          </p>
        </div>

        <Link
          href="/dashboard/trainers/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Trainer
        </Link>
      </div>

      <TrainerTable />
    </div>
  );
}