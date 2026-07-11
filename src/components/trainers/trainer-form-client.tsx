"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createTrainer,
  updateTrainer,
} from "@/actions/trainer";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TrainerFormProps {
  trainer?: {
    id: string;
    specialization: string | null;
    user: {
      name: string | null;
      email: string | null;
    };
  };
}

export default function TrainerFormClient({
  trainer,
}: TrainerFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const form = new FormData(e.currentTarget);

      const data = {
        name: form.get("name") as string,
        email: form.get("email") as string,
        specialization: form.get(
          "specialization"
        ) as string,
      };

      const result = trainer
        ? await updateTrainer(trainer.id, data)
        : await createTrainer(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/dashboard/trainers");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-background p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-medium"
        >
          Name
        </label>

        <Input
          id="name"
          name="name"
          required
          defaultValue={trainer?.user.name ?? ""}
          placeholder="Trainer name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-medium"
        >
          Email
        </label>

        <Input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={trainer?.user.email ?? ""}
          placeholder="trainer@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="specialization"
          className="mb-2 block font-medium"
        >
          Specialization
        </label>

        <Input
          id="specialization"
          name="specialization"
          required
          defaultValue={
            trainer?.specialization ?? ""
          }
          placeholder="e.g. Strength Training"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? trainer
            ? "Updating..."
            : "Creating..."
          : trainer
          ? "Update Trainer"
          : "Create Trainer"}
      </Button>
    </form>
  );
}