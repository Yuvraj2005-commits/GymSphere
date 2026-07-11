"use client";

import { useState } from "react";
import { toast } from "sonner";

import { changePassword } from "@/actions/settings";

export default function PasswordFormClient() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    const result = await changePassword({
      currentPassword,
      newPassword,
    });

    setLoading(false);

    if (result.success) {
      toast.success(result.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="rounded-2xl border bg-background p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">
        Security
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Change your account password.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Current Password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm New Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
            required
          />
        </div>

        <button
          disabled={loading}
          className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </div>
  );
}