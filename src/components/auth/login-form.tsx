"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import PasswordInput from "./password-input";
import SocialLogin from "./social-login";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const email = form.get("email") as string;
    const password = form.get("password") as string;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <SocialLogin />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <PasswordInput
          name="password"
          placeholder="Enter password"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
          href="/forgot-password"
          className="text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary"
        >
          Register
        </Link>
      </p>
    </form>
  );
}