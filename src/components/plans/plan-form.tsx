"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  createPlan,
  updatePlan,
} from "@/actions/plan";

import {
  PlanInput,
  PlanSchema,
} from "@/lib/validations/plan";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  name: string;
  description: string | null;
  durationDays: number;
  price: number;
}

interface PlanFormProps {
  plan?: Plan;
  mode?: "create" | "edit";
}

export default function PlanForm({
  plan,
  mode = "create",
}: PlanFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<PlanInput>({
    resolver: zodResolver(PlanSchema),

    defaultValues: {
      name: plan?.name ?? "",
      description: plan?.description ?? "",
      durationDays: plan?.durationDays ?? 30,
      price: plan?.price ?? 0,
    },
  });

  async function onSubmit(values: PlanInput) {
    setLoading(true);

    try {
      const result =
        mode === "edit" && plan
          ? await updatePlan(plan.id, values)
          : await createPlan(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/dashboard/plans");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl space-y-5"
    >
      <Input
        placeholder="Plan Name"
        {...form.register("name")}
      />

      <Input
        placeholder="Description"
        {...form.register("description")}
      />

      <Input
        type="number"
        placeholder="Duration (Days)"
        {...form.register("durationDays", {
          valueAsNumber: true,
        })}
      />

      <Input
        type="number"
        step="0.01"
        placeholder="Price"
        {...form.register("price", {
          valueAsNumber: true,
        })}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? mode === "edit"
            ? "Updating..."
            : "Creating..."
          : mode === "edit"
          ? "Update Plan"
          : "Create Plan"}
      </Button>
    </form>
  );
}