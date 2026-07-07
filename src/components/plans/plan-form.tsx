"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  PlanInput,
  PlanSchema,
} from "@/lib/validations/plan";

import { createPlan } from "@/actions/plan";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function PlanForm() {
  const router = useRouter();

  const form = useForm<PlanInput>({
    resolver: zodResolver(PlanSchema),
  });

  async function onSubmit(values: PlanInput) {
    const result = await createPlan(values);

    if (result.success) {
      toast.success(result.message);

      form.reset();

      router.push("/dashboard/plans");

      router.refresh();
    } else {
      toast.error(result.message);
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
        className="w-full"
      >
        Create Plan
      </Button>
    </form>
  );
}