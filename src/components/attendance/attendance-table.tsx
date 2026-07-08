import { prisma } from "@/lib/prisma";

import AttendanceRow from "./attendance-row";

export default async function AttendanceTable() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await prisma.attendance.findMany({
    where: {
      checkIn: {
        gte: today,
      },
    },
    include: {
      member: true,
    },
    orderBy: {
      checkIn: "desc",
    },
  });

  if (attendance.length === 0) {
    return (
      <div className="rounded-xl border p-12 text-center">
        <h2 className="text-xl font-semibold">No Attendance Yet</h2>

        <p className="mt-2 text-muted-foreground">
          Members who check in today will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-4 text-left">Member</th>
            <th className="px-6 py-4 text-left">Check In</th>
            <th className="px-6 py-4 text-left">Check Out</th>
            <th className="px-6 py-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <AttendanceRow key={record.id} attendance={record} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
