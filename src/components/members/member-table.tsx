import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import MemberRow from "./member-row";

export default async function MemberTable() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      owner: true,
    },
  });

  if (!user?.owner) {
    redirect("/dashboard/onboarding");
  }

  const members = (
    await prisma.member.findMany({
      where: {
        gymId: user.owner.gymId,
      },
      include: {
        membershipPlan: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  ).map((member) => ({
    id: member.id,
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    phone: member.phone,
    status: member.status,

    joinedAt: member.joinedAt,

    membershipStart: member.membershipStart,
    membershipEnd: member.membershipEnd,

    membershipPlan: {
      id: member.membershipPlan.id,
      name: member.membershipPlan.name,
    },
  }));

  if (members.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-16 text-center">
        <h2 className="text-2xl font-bold">No Members Yet</h2>

        <p className="mt-2 text-muted-foreground">
          Add your first gym member to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Member
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>

            <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>

            <th className="px-6 py-4 text-left text-sm font-semibold">Plan</th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Joined
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              Actions
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Expires
            </th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
