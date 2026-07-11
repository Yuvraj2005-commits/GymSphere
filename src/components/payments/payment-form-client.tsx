"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  createPayment,
  updatePayment,
} from "@/actions/payment";

import {
  PaymentInput,
  PaymentSchema,
} from "@/lib/validations/payment";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
}

interface Payment {
  id: string;
  memberId: string;
  amount: number;
  paymentMethod: string;
  notes: string | null;
}

interface Props {
  members: Member[];
  payment?: Payment;
  mode?: "create" | "edit";
}

export default function PaymentFormClient({
  members,
  payment,
  mode = "create",
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<PaymentInput>({
    resolver: zodResolver(PaymentSchema),

    defaultValues: {
      memberId: payment?.memberId ?? "",
      amount: payment?.amount ?? 0,
      paymentMethod: payment?.paymentMethod ?? "",
      notes: payment?.notes ?? "",
    },
  });

  async function onSubmit(values: PaymentInput) {
    setLoading(true);

    try {
      const result =
        mode === "edit" && payment
          ? await updatePayment(payment.id, values)
          : await createPayment(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/dashboard/payments");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl space-y-5"
    >
      <select
        {...form.register("memberId")}
        className="h-11 w-full rounded-lg border bg-background px-3"
      >
        <option value="">
          Select Member
        </option>

        {members.map((member) => (
          <option
            key={member.id}
            value={member.id}
          >
            {member.firstName} {member.lastName}
          </option>
        ))}
      </select>

      <Input
        type="number"
        step="0.01"
        placeholder="Amount"
        {...form.register("amount", {
          valueAsNumber: true,
        })}
      />

      <Input
        placeholder="Payment Method"
        {...form.register("paymentMethod")}
      />

      <Input
        placeholder="Notes (Optional)"
        {...form.register("notes")}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? mode === "edit"
            ? "Updating..."
            : "Recording..."
          : mode === "edit"
          ? "Update Payment"
          : "Record Payment"}
      </Button>
    </form>
  );
}