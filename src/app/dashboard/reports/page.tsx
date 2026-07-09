import ReportCards from "@/components/reports/report-cards";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Reports
        </h1>

        <p className="text-muted-foreground">
          View your gym statistics and reports.
        </p>
      </div>

      <ReportCards />
    </div>
  );
}