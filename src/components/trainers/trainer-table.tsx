import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import TrainerRow from "./trainer-row";

export default async function TrainerTable() {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const trainers = await prisma.trainer.findMany({
    where: {
      gymId: owner.gymId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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
          Add your first trainer to get started.
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
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Specialization
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
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