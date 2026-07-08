import CheckOutButton from "./check-out-button";

interface AttendanceRowProps {
  attendance: any;
}

export default function AttendanceRow({ attendance }: AttendanceRowProps) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4">
        {attendance.member.firstName} {attendance.member.lastName}
      </td>

      <td className="px-6 py-4">
        {new Date(attendance.checkIn).toLocaleTimeString()}
      </td>

      <td className="px-6 py-4">
        {attendance.checkOut
          ? new Date(attendance.checkOut).toLocaleTimeString()
          : "-"}
      </td>

      <td className="px-6 py-4">
        {attendance.checkOut ? (
          <span className="text-green-600">Checked Out</span>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-blue-600">Checked In</span>

            <CheckOutButton attendanceId={attendance.id} />
          </div>
        )}
      </td>
    </tr>
  );
}
