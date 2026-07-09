"use client";

import { Trash2 } from "lucide-react";
import { deleteTrainer } from "@/actions/trainer";

interface Props {
  trainerId: string;
}

export default function DeleteTrainerDialog({
  trainerId,
}: Props) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmed) return;

    const result = await deleteTrainer(trainerId);

    if (!result.success) {
      alert(result.message || "Failed to delete trainer");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}