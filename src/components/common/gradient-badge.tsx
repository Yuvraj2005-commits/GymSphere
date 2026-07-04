import { Sparkles } from "lucide-react";

interface GradientBadgeProps {
  children: React.ReactNode;
}

export default function GradientBadge({
  children,
}: GradientBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500">
      <Sparkles className="h-4 w-4" />
      {children}
    </div>
  );
}