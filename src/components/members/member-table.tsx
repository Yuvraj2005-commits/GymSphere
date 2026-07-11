import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import MemberRow from "./member-row";

export default async function MemberTable() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const members = await prisma.member.findMany({
    where: {
      gymId: owner.gymId,
    },
    include: {
      membershipPlan: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (members.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-16 text-center">
        <h2 className="text-2xl font-bold">
          No Members Yet
        </h2>

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

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Phone
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Plan
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Joined
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Expires
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}