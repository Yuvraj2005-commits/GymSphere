import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className,
}: SectionContainerProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        {children}
      </div>
    </section>
  );
}