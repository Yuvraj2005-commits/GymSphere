"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

interface RevenueChartClientProps {
  data: {
    month: string;
    revenue: number;
  }[];
}

export default function RevenueChartClient({ data }: RevenueChartClientProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="month" />

        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#2563eb"
          fill="#93c5fd"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
