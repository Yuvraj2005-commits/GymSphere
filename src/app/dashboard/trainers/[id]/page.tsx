import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import TrainerForm from "@/components/trainers/trainer-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTrainerPage({
  params,
}: Props) {
  const { id } = await params;

  const trainer = await prisma.trainer.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!trainer) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Edit Trainer
        </h1>

        <p className="text-muted-foreground">
          Update trainer details.
        </p>
      </div>

      <TrainerForm trainer={trainer} />
    </div>
  );
}