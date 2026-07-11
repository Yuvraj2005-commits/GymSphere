"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { verifyRegistration } from "@/actions/verify-registration";

interface VerifyEmailFormProps {
  email: string;
}

export default function VerifyEmailForm({
  email,
}: VerifyEmailFormProps) {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    setLoading(true);

    const result = await verifyRegistration(
      email,
      otp
    );

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.push("/login");
  }

  return (
    <div className="w-full max-w-md rounded-3xl border bg-background p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Verify Email
        </h1>

        <p className="mt-2 text-muted-foreground">
          We've sent a 6-digit verification code to
        </p>

        <p className="mt-1 font-medium">
          {email}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value.replace(/\D/g, "")
            )
          }
          placeholder="Enter 6-digit OTP"
          className="h-14 w-full rounded-xl border text-center text-2xl tracking-[10px] outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground"
        >
          {loading
            ? "Verifying..."
            : "Verify Email"}
        </button>
      </form>
    </div>
  );
}