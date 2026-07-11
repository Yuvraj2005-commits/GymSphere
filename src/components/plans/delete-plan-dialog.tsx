"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deletePlan } from "@/actions/plan";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeletePlanDialogProps {
  planId: string;
}

export default function DeletePlanDialog({
  planId,
}: DeletePlanDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deletePlan(planId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="Delete Plan"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Membership Plan
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
            <br />
            This membership plan will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}