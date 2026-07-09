import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p className="mt-3 text-muted-foreground">
        Page not found
      </p>

      <Link
        href="/dashboard"
        className="mt-6 rounded-lg bg-primary px-6 py-3 text-primary-foreground"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}