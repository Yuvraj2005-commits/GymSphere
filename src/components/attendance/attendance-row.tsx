interface AttendanceRowProps {
  attendance: any;
}

export default function AttendanceRow({
  attendance,
}: AttendanceRowProps) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4">
        {attendance.member.firstName}{" "}
        {attendance.member.lastName}
      </td>

      <td className="px-6 py-4">
        {new Date(
          attendance.checkIn
        ).toLocaleTimeString()}
      </td>

      <td className="px-6 py-4">
        {attendance.checkOut
          ? new Date(
              attendance.checkOut
            ).toLocaleTimeString()
          : "-"}
      </td>

      <td className="px-6 py-4">
        {attendance.checkOut
          ? "Checked Out"
          : "Checked In"}
      </td>
    </tr>
  );
}