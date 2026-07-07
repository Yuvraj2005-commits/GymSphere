import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4">
        <Button>Add Member</Button>

        <Button variant="secondary">
          Add Trainer
        </Button>

        <Button variant="outline">
          Create Plan
        </Button>

        <Button variant="outline">
          Record Payment
        </Button>
      </div>
    </div>
  );
}