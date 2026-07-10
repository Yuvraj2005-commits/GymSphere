"use client";

import { useState } from "react";
import { forgotPassword } from "@/actions/forgot-password";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get("email") as string;

    setLoading(true);

    const result = await forgotPassword(email);

    setLoading(false);

    alert(result.message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          required
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 text-primary-foreground"
      >
        {loading
          ? "Sending..."
          : "Send Reset Link"}
      </button>
    </form>
  );
}