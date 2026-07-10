"use client";

import { signIn } from "next-auth/react";

export default function SocialLogin() {
  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/dashboard",
          })
        }
        className="flex w-full items-center justify-center gap-3 rounded-xl border bg-background px-4 py-3 font-medium transition hover:bg-muted"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.6 20H42V19.9H24V28H35.3C33.6 32.7 29.2 36 24 36C17.4 36 12 30.6 12 24S17.4 12 24 12C27 12 29.7 13.1 31.8 14.9L37.5 9.2C34 6 29.3 4 24 4C13 4 4 13 4 24S13 44 24 44C35 44 44 35 44 24C44 22.7 43.9 21.3 43.6 20Z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7L12.9 19.5C14.7 15.1 19 12 24 12C27 12 29.7 13.1 31.8 14.9L37.5 9.2C34 6 29.3 4 24 4C16.3 4 9.7 8.3 6.3 14.7Z"
          />
          <path
            fill="#4CAF50"
            d="M24 44C29.2 44 33.8 42 37.2 38L30.9 32.7C28.9 34.2 26.5 35 24 35C18.8 35 14.4 31.7 12.7 27.1L6.2 32.1C9.5 38.6 16.2 44 24 44Z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20H42V19.9H24V28H35.3C34.5 30.3 33.1 32.3 31 33.8L31 33.8L37.3 39C36.9 39.4 44 34 44 24C44 22.7 43.9 21.3 43.6 20Z"
          />
        </svg>

        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-sm text-muted-foreground">
            OR
          </span>
        </div>
      </div>
    </div>
  );
}