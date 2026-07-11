import CheckOutButton from "./check-out-button";

interface AttendanceRowProps {
  attendance: {
    id: string;

    checkIn: Date;

    checkOut: Date | null;

    member: {
      id: string;
      firstName: string;
      lastName: string;
      status: string;
    };
  };
}

export default function AttendanceRow({
  attendance,
}: AttendanceRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/30">
      <td className="px-6 py-4 font-medium">
        {attendance.member.firstName}{" "}
        {attendance.member.lastName}
      </td>

      <td className="px-6 py-4">
        {attendance.checkIn.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>

      <td className="px-6 py-4">
        {attendance.checkOut
          ? attendance.checkOut.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-"}
      </td>

      <td className="px-6 py-4">
        {attendance.checkOut ? (
          <span className="font-medium text-green-600">
            Checked Out
          </span>
        ) : (
          <div className="flex items-center gap-3">
            <span className="font-medium text-blue-600">
              Checked In
            </span>

            <CheckOutButton
              attendanceId={attendance.id}
            />
          </div>
        )}
      </td>
    </tr>
  );
}