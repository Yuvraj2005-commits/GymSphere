import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

export default async function AttendanceStats() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const where = {
    checkIn: {
      gte: today,
    },
    member: {
      gymId: owner.gymId,
    },
  };

  const [checkedIn, checkedOut, totalToday] =
    await Promise.all([
      prisma.attendance.count({
        where: {
          ...where,
          checkOut: null,
        },
      }),

      prisma.attendance.count({
        where: {
          ...where,
          checkOut: {
            not: null,
          },
        },
      }),

      prisma.attendance.count({
        where,
      }),
    ]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Checked In
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-600">
          {checkedIn}
        </h2>
      </div>

      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Checked Out
        </p>

        <h2 className="mt-2 text-4xl font-bold text-blue-600">
          {checkedOut}
        </h2>
      </div>

      <div className="rounded-xl border bg-background p-6 shadow-sm">
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