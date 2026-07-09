"use client";
import { Activity, TrendingUp, Users, Wallet } from "lucide-react";

import SectionContainer from "@/components/common/section-container";
import SectionHeading from "@/components/common/section-heading";
import GradientBadge from "@/components/common/gradient-badge";

import StatsCard from "@/components/dashboard/stats-card";
import MarketingRevenueChart from "./marketing-revenue-chart";
// import AIInsights from "@/components/dashboard/ai-insights";
// import RecentMembers from "@/components/dashboard/recent-members";

import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <SectionContainer className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <SectionHeading
        badge={<GradientBadge>Dashboard Preview</GradientBadge>}
        title="Everything You Need in One Dashboard"
        description="Manage members, payments, attendance and AI insights from one beautiful workspace."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <div className="rounded-3xl border bg-card/50 p-8 shadow-2xl backdrop-blur-sm space-y-8">
          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Revenue"
              value="₹1,24,500"
              change="+18.2%"
              icon={Wallet}
            />

            <StatsCard title="Members" value="245" change="+12" icon={Users} />

            <StatsCard
              title="Attendance"
              value="89"
              change="Today"
              icon={Activity}
            />

            <StatsCard
              title="Growth"
              value="+18%"
              change="This Month"
              icon={TrendingUp}
            />
          </div>

          {/* Revenue Chart */}

          <MarketingRevenueChart />

          {/* Bottom */}

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border bg-background p-6">
              <h3 className="text-lg font-semibold">AI Insights</h3>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>📈 Revenue increased by 18% this month</li>
                <li>👥 Member retention is above 92%</li>
                <li>💳 Most payments are made online</li>
                <li>🏋️ Peak attendance: 6 PM – 8 PM</li>
              </ul>
            </div>

            <div className="rounded-3xl border bg-background p-6">
              <h3 className="text-lg font-semibold">Recent Members</h3>

              <div className="mt-4 space-y-4">
                {["Rahul Sharma", "Priya Singh", "Aman Kumar"].map((member) => (
                  <div
                    key={member}
                    className="flex items-center justify-between"
                  >
                    <span>{member}</span>

                    <span className="text-sm text-muted-foreground">
                      Joined Today
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
