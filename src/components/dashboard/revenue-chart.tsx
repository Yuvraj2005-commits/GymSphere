import { getRevenueChartData } from "@/actions/chart";
import RevenueChartClient from "./revenue-chart-client";

export default async function RevenueChart() {
  const data = await getRevenueChartData();

  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Revenue Overview
      </h2>

      <div className="h-[320px]">
        <RevenueChartClient data={data} />
      </div>
    </div>
  );
}