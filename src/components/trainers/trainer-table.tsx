import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import TrainerRow from "./trainer-row";

export default async function TrainerTable() {
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

  const trainers = await prisma.trainer.findMany({
    where: {
      gymId: user.owner.gymId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (trainers.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-16 text-center">
        <h2 className="text-2xl font-bold">
          No Trainers Yet
        </h2>

        <p className="mt-2 text-muted-foreground">
          Add your first trainer.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Specialization
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {trainers.map((trainer) => (
            <TrainerRow
              key={trainer.id}
              trainer={trainer}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}