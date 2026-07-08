import { prisma } from "@/lib/prisma";

import CheckInButton from "./check-in-button";
import { Badge } from "@/components/ui/badge";

export default async function MemberCheckinList() {
  const members = await prisma.member.findMany({
    where: {
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

  return (
    <div className="rounded-xl border bg-background p-6">
      <h2 className="mb-6 text-xl font-semibold">Check In Members</h2>

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="font-medium">
                {member.firstName} {member.lastName}
              </p>

              <p className="text-sm text-muted-foreground">{member.phone}</p>
            </div>

            {member.attendance.length > 0 ? (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                ✓ Checked In
              </Badge>
            ) : (
              <CheckInButton memberId={member.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
