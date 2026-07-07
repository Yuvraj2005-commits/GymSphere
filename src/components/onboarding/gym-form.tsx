"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GymInput, GymSchema } from "@/lib/validations/gym";
import { createGym } from "@/actions/gym";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GymForm() {
  const form = useForm<GymInput>({
    resolver: zodResolver(GymSchema),
  });

  async function onSubmit(values: GymInput) {
    await createGym(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 max-w-lg"
    >
      <Input
        placeholder="Gym Name"
        {...form.register("name")}
      />

      <Input
        placeholder="gym-slug"
        {...form.register("slug")}
      />

      <Input
        placeholder="Phone"
        {...form.register("phone")}
      />

      <Input
        placeholder="Email"
        {...form.register("email")}
      />

      <Input
        placeholder="Address"
        {...form.register("address")}
      />

      <Button className="w-full">
        Create Gym
      </Button>
    </form>
  );
}