export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-56 animate-pulse rounded bg-muted" />

      <div className="rounded-xl border bg-background p-8">
        <div className="space-y-5">
          <div className="h-12 animate-pulse rounded bg-muted" />
          <div className="h-12 animate-pulse rounded bg-muted" />
          <div className="h-12 animate-pulse rounded bg-muted" />
          <div className="h-12 animate-pulse rounded bg-muted" />
          <div className="h-12 w-40 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}