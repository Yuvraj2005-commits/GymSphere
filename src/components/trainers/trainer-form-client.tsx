"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createTrainer,
  updateTrainer,
} from "@/actions/trainer";

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

    setLoading(false);

    if (result.success) {
      router.push("/dashboard/trainers");
      router.refresh();
    } else {
      alert(result.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-background p-8"
    >
      <div>
        <label className="mb-2 block font-medium">
          Name
        </label>

        <input
          name="name"
          required
          defaultValue={trainer?.user.name ?? ""}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          name="email"
          type="email"
          required
          defaultValue={trainer?.user.email ?? ""}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Specialization
        </label>

        <input
          name="specialization"
          required
          defaultValue={
            trainer?.specialization ?? ""
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
      >
        {loading
          ? "Saving..."
          : trainer
          ? "Update Trainer"
          : "Create Trainer"}
      </button>
    </form>
  );
}