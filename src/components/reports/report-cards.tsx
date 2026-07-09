import { getReports } from "@/actions/reports";

export default async function ReportCards() {
  const reports = await getReports();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      <Card
        title="Revenue"
        value={`₹${reports.totalRevenue.toLocaleString()}`}
      />

      <Card
        title="Members"
        value={reports.totalMembers.toString()}
      />

      <Card
        title="Plans"
        value={reports.totalPlans.toString()}
      />

      <Card
        title="Attendance"
        value={reports.totalAttendance.toString()}
      />

      <Card
        title="Payments"
        value={reports.totalPayments.toString()}
      />
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-6">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}