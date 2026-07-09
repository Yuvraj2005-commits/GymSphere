"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import DeleteTrainerDialog from "./delete-trainer-dialog";

interface TrainerRowProps {
  trainer: {
    id: string;
    specialization: string | null;
    user: {
      name: string | null;
      email: string | null;
    };
  };
}

export default function TrainerRow({
  trainer,
}: TrainerRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/30">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            {trainer.user.name?.charAt(0)}
          </div>

          <span className="font-medium">
            {trainer.user.name}
          </span>
        </div>
      </td>

      <td className="px-6 py-5">
        {trainer.user.email}
      </td>

      <td className="px-6 py-5">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {trainer.specialization}
        </span>
      </td>

      <td className="px-6 py-5">
        <div className="flex justify-center gap-4">
          <Link
            href={`/dashboard/trainers/${trainer.id}`}
            className="transition hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Link>

          <DeleteTrainerDialog
            trainerId={trainer.id}
          />
        </div>
      </td>
    </tr>
  );
}