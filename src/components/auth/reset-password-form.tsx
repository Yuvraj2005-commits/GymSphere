"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PasswordInput from "./password-input";
import { resetPassword } from "@/actions/reset-password";

interface Props {
  token: string;
}

export default function ResetPasswordForm({
  token,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const password = form.get("password") as string;

    const confirm =
      form.get("confirmPassword") as string;

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const result = await resetPassword(
      token,
      password
    );

    setLoading(false);

    alert(result.message);

    if (result.success) {
      router.push("/login");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          New Password
        </label>

        <PasswordInput
          name="password"
          placeholder="New password"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Confirm Password
        </label>

        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm password"
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 text-primary-foreground"
      >
        {loading
          ? "Updating..."
          : "Update Password"}
      </button>
    </form>
  );
}