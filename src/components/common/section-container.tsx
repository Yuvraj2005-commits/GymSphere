import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionContainer({
  children,
  className,
  id,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        {children}
      </div>
    </section>
  );
}