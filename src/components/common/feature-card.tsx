import { ArrowUpRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="group h-full cursor-pointer border-border/60 bg-background transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="mb-3 text-xl font-semibold">
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex items-center text-primary font-medium">
          Learn More

          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </CardContent>
    </Card>
  );
}