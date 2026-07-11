import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import AttendanceRow from "./attendance-row";

export default async function AttendanceTable() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await prisma.attendance.findMany({
    where: {
      checkIn: {
        gte: today,
      },

      member: {
        gymId: owner.gymId,
      },
    },

    include: {
      member: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          status: true,
        },
      },
    },

    orderBy: {
      checkIn: "desc",
    },
  });

  if (attendance.length === 0) {
    return (
      <div className="rounded-xl border p-12 text-center">
        <h2 className="text-xl font-semibold">
          No Attendance Yet
        </h2>

        <p className="mt-2 text-muted-foreground">
          Members who check in today will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Member
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Check In
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Check Out
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <AttendanceRow
              key={record.id}
              attendance={record}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}