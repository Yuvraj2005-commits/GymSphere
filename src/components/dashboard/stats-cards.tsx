import {
  Activity,
  ClipboardList,
  Users,
  Wallet,
} from "lucide-react";

import { getDashboardStats } from "@/actions/dashboard";

import StatsCard from "./stats-card";

export default async function StatsCards() {
  const stats = await getDashboardStats();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Revenue"
        value={`₹${stats.revenue.toLocaleString()}`}
        change="Live"
        icon={Wallet}
      />

      <StatsCard
        title="Members"
        value={stats.totalMembers.toString()}
        change="Live"
        icon={Users}
      />

      <StatsCard
        title="Plans"
        value={stats.totalPlans.toString()}
        change="Live"
        icon={ClipboardList}
      />

      <StatsCard
        title="Today's Attendance"
        value={stats.attendanceToday.toString()}
        change="Live"
        icon={Activity}
      />
    </div>
  );
}