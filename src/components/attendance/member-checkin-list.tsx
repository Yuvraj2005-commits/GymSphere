import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import CheckInButton from "./check-in-button";
import { Badge } from "@/components/ui/badge";

export default async function MemberCheckinList() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const members = await prisma.member.findMany({
    where: {
      gymId: owner.gymId,
      status: "ACTIVE",
    },

    include: {
      attendance: {
        where: {
          checkOut: null,
        },
        take: 1,
      },
    },

    orderBy: {
      firstName: "asc",
    },
  });

  if (members.length === 0) {
    return (
      <div className="rounded-xl border bg-background p-12 text-center">
        <h2 className="text-xl font-semibold">
          No Active Members
        </h2>

        <p className="mt-2 text-muted-foreground">
          Add active members to start tracking attendance.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Check In Members
      </h2>

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <p className="font-medium">
                {member.firstName} {member.lastName}
              </p>

              <p className="text-sm text-muted-foreground">
                {member.phone || "No phone number"}
              </p>
            </div>

            {member.attendance.length > 0 ? (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                ✓ Checked In
              </Badge>
            ) : (
              <CheckInButton
                memberId={member.id}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}