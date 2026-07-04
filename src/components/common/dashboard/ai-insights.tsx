import { Brain, TrendingUp, Users, CalendarClock } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const insights = [
  {
    icon: TrendingUp,
    text: "Revenue increased by 18% this month.",
  },
  {
    icon: Users,
    text: "12 memberships expire within 7 days.",
  },
  {
    icon: CalendarClock,
    text: "Peak gym traffic is between 6 PM and 8 PM.",
  },
];

export default function AIInsights() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {insights.map((insight) => {
          const Icon = insight.icon;

          return (
            <div
              key={insight.text}
              className="flex items-start gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {insight.text}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}