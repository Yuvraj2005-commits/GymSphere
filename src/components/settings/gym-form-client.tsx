"use client";

import { useState } from "react";
import { toast } from "sonner";

import { updateGym } from "@/actions/settings";

interface Props {
  gym: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export default function GymFormClient({
  gym,
}: Props) {
  const [form, setForm] = useState(gym);
  const [loading, setLoading] = useState(false);

  function updateField(
    key: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const result = await updateGym(form);

    setLoading(false);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="rounded-2xl border bg-background p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">
        Gym Information
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Update your gym details.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Gym Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              updateField("name", e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Gym Email
          </label>

          <input
            value={form.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone
          </label>

          <input
            value={form.phone}
            onChange={(e) =>
              updateField("phone", e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Address
          </label>

          <textarea
            rows={4}
            value={form.address}
            onChange={(e) =>
              updateField(
                "address",
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          {loading
            ? "Saving..."
            : "Save Gym"}
        </button>
      </form>
    </div>
  );
}