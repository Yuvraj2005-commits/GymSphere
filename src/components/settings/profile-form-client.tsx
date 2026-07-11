"use client";

import { useState } from "react";
import { toast } from "sonner";

import { updateProfile } from "@/actions/settings";

interface Props {
  user: {
    name: string;
    email: string;
  };
}

export default function ProfileFormClient({
  user,
}: Props) {
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const result = await updateProfile({
      name,
    });

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
        Profile
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Update your personal information.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            value={user.email}
            disabled
            className="w-full rounded-xl border bg-muted px-4 py-3"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
}