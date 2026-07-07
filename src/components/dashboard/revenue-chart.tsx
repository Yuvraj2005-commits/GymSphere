"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 24000 },
  { month: "Apr", revenue: 21000 },
  { month: "May", revenue: 30000 },
  { month: "Jun", revenue: 42000 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Revenue Overview
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              fill="#93c5fd"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}