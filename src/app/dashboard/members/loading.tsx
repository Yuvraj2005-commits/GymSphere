export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-64 animate-pulse rounded bg-muted" />

      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-10 animate-pulse rounded bg-muted"
          />
        ))}
      </div>
    </div>
  );
}