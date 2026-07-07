export default function Loading() {
  return (
    <div className="p-8">
      <div className="h-8 w-52 animate-pulse rounded bg-muted" />

      <div className="mt-8 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-10 rounded bg-muted animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}