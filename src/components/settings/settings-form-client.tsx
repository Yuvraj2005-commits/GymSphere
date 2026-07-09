"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updateGymSettings } from "@/actions/settings";

interface Props {
  gym: {
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
  };
}

export default function SettingsFormClient({
  gym,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const result = await updateGymSettings({
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      address: form.get("address") as string,
    });

    setLoading(false);

    if (result.success) {
      alert(result.message);
      router.refresh();
    } else {
      alert(result.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-background p-8 shadow-sm"
    >
      <div>
        <label className="mb-2 block font-medium">
          Gym Name
        </label>

        <input
          name="name"
          defaultValue={gym.name}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          defaultValue={gym.email ?? ""}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Phone
        </label>

        <input
          name="phone"
          defaultValue={gym.phone ?? ""}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Address
        </label>

        <textarea
          rows={4}
          name="address"
          defaultValue={gym.address ?? ""}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
      >
        {loading
          ? "Saving..."
          : "Save Changes"}
      </button>
    </form>
  );
}