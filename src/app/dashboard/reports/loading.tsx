export default function Loading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-32 animate-pulse rounded-xl bg-muted"
        />
      ))}
    </div>
  );
}