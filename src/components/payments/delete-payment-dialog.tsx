"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { deletePayment } from "@/actions/payment";
import { Button } from "@/components/ui/button";

interface Props {
  paymentId: string;
}

export default function DeletePaymentDialog({
  paymentId,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this payment?")) return;

        startTransition(async () => {
          await deletePayment(paymentId);

          toast.success("Payment deleted");
        });
      }}
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  );
}