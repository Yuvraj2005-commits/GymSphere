"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Welcome Back
        </h1>

        <Button
          className="w-full"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
        >
          Continue with Google
        </Button>
      </div>
    </main>
  );
}