import Link from "next/link";
import { Plus } from "lucide-react";

import TrainerTable from "@/components/trainers/trainer-table";

export default function TrainersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Trainers
          </h1>

          <p className="text-muted-foreground">
            Manage gym trainers.
          </p>
        </div>

        <Link
          href="/dashboard/trainers/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
        >
          <Plus className="h-4 w-4" />

          Add Trainer
        </Link>
      </div>

      <TrainerTable />
    </div>
  );
}