import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function RecentMembers() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
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
    return null;
  }

  const members = await prisma.member.findMany({
    where: {
      gymId: user.owner.gymId,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="rounded-xl border bg-background p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Members
      </h2>

      <div className="space-y-4">
        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No members yet.
          </p>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">
                  {member.firstName} {member.lastName}
                </p>

                <p className="text-sm text-muted-foreground">
                  {member.phone || "No phone"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}