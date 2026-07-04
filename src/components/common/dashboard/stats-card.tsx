import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  positive?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}: StatsCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        <div className="rounded-xl bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">{value}</div>

        <p
          className={`mt-2 text-sm ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  );
}