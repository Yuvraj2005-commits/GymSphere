import { Sparkles } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="rounded-3xl border bg-gradient-to-br from-primary to-blue-700 p-6 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6" />

        <h2 className="text-xl font-bold">
          AI Insights
        </h2>
      </div>

      <ul className="mt-6 space-y-4 text-sm">
        <li>📈 Revenue increased by 18% this month.</li>

        <li>👥 12 memberships expire this week.</li>

        <li>🏋 Peak attendance is between 6–8 PM.</li>

        <li>💰 Premium plan sales are growing fastest.</li>
      </ul>
    </div>
  );
}