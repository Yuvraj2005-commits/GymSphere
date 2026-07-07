import PlanForm from "@/components/plans/plan-form";

export default function NewPlanPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Create Membership Plan
        </h1>

        <p className="text-muted-foreground mt-2">
          Add a membership plan for your gym.
        </p>
      </div>

      <PlanForm />
    </div>
  );
}