import MemberCard from "./member-card";

const members = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    plan: "Premium",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@gmail.com",
    phone: "9123456780",
    plan: "Gold",
    status: "Active",
  },
  {
    id: 3,
    name: "Aman Kumar",
    email: "aman@gmail.com",
    phone: "9988776655",
    plan: "Monthly",
    status: "Expired",
  },
];

export default function MemberTable() {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Plan</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}