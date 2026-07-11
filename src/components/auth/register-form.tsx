"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PasswordInput from "./password-input";
import SocialLogin from "./social-login";

import { startRegistration } from "@/actions/start-registration";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const result = await startRegistration({
      name,
      email,
      password,
    });

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.push(
      `/verify-email?email=${encodeURIComponent(
        email
      )}`
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <SocialLogin />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          name="name"
          required
          placeholder="John Doe"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <PasswordInput
          name="password"
          placeholder="Create password"
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
        className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground"
      >
        {loading
          ? "Sending OTP..."
          : "Create Account"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}