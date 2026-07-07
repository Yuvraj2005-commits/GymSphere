import {
  Users,
  Wallet,
  UserCog,
  Activity,
} from "lucide-react";

import StatsCard from "@/components/dashboard/stats-card";
import RevenueChart from "@/components/dashboard/revenue-chart";
import RecentMembers from "@/components/dashboard/recent-members";
import AIInsights from "@/components/dashboard/ai-insights";
import QuickActions from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Revenue"
          value="₹1,24,500"
          change="+18%"
          icon={Wallet}
        />

        <StatsCard
          title="Members"
          value="245"
          change="+12"
          icon={Users}
        />

        <StatsCard
          title="Trainers"
          value="14"
          change="+2"
          icon={UserCog}
        />

        <StatsCard
          title="Attendance"
          value="89%"
          change="+5%"
          icon={Activity}
        />
      </div>

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