import AttendanceTable from "@/components/attendance/attendance-table";
import MemberCheckinList from "@/components/attendance/member-checkin-list";
import AttendanceStats from "@/components/attendance/attendance-stats";

export default function AttendancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Attendance
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage daily attendance.
        </p>
      </div>
      <AttendanceStats />

      <MemberCheckinList />
      
      <AttendanceTable />
    </div>
  );
}