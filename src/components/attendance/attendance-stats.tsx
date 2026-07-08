import { prisma } from "@/lib/prisma";

export default async function AttendanceStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkedIn = await prisma.attendance.count({
    where: {
      checkIn: {
        gte: today,
      },
      checkOut: null,
    },
  });

  const checkedOut = await prisma.attendance.count({
    where: {
      checkIn: {
        gte: today,
      },
      checkOut: {
        not: null,
      },
    },
  });

  const totalToday = await prisma.attendance.count({
    where: {
      checkIn: {
        gte: today,
      },
    },
  });

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          Checked In
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-600">
          {checkedIn}
        </h2>
      </div>

      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          Checked Out
        </p>

        <h2 className="mt-2 text-4xl font-bold text-blue-600">
          {checkedOut}
        </h2>
      </div>

      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          Total Today
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {totalToday}
        </h2>
      </div>
    </div>
  );
}