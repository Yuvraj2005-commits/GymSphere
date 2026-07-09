import {
  Users,
  Wallet,
  ClipboardList,
  Activity,
} from "lucide-react";

import { getDashboardStats } from "@/actions/dashboard";

import StatsCard from "@/components/dashboard/stats-cards";
import RevenueChart from "@/components/dashboard/revenue-chart";
import RecentMembers from "@/components/dashboard/recent-members";
import AIInsights from "@/components/dashboard/ai-insights";
import QuickActions from "@/components/dashboard/quick-actions";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-muted-foreground">
          Manage your gym from one powerful dashboard.
        </p>
      </div>

      <StatsCard />

      <RevenueChart />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentMembers />

        <div className="space-y-6">
          <AIInsights />

          <QuickActions />
        </div>
      </div>
    </div>
  );
}