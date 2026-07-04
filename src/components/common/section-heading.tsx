interface SectionHeadingProps {
  badge?: React.ReactNode;
  title: string;
  description?: string;
}

export default function SectionHeading({
  badge,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge}

      <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}