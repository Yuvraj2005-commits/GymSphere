import { prisma } from "@/lib/prisma";

export default async function MemberTable() {
  const members = await prisma.member.findMany({
    include: {
      membershipPlan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-t">
              <td className="px-6 py-4">
                {member.firstName} {member.lastName}
              </td>

              <td className="px-6 py-4">
                {member.email}
              </td>

              <td className="px-6 py-4">
                {member.phone}
              </td>

              <td className="px-6 py-4">
                {member.membershipPlan.name}
              </td>

              <td className="px-6 py-4">
                {member.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}