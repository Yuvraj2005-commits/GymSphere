"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deletePayment } from "@/actions/payment";

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

interface DeletePaymentDialogProps {
  paymentId: string;
}

export default function DeletePaymentDialog({
  paymentId,
}: DeletePaymentDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deletePayment(paymentId);

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
          aria-label="Delete Payment"
          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Payment
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
            <br />
            This payment record will be permanently removed.
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