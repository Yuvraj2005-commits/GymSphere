"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-3 text-muted-foreground">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-primary px-6 py-3 text-primary-foreground"
      >
        Try Again
      </button>
    </div>
  );
}