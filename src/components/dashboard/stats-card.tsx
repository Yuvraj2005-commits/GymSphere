import { ArrowUpRight, LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <ArrowUpRight className="h-4 w-4" />
          {change}
        </div>
      </div>

      <h3 className="mt-5 text-muted-foreground">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}