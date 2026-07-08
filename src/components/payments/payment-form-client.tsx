"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createPayment } from "@/actions/payment";

import {
  PaymentInput,
  PaymentSchema,
} from "@/lib/validations/payment";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

interface Props {
  members: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
}

export default function PaymentFormClient({
  members,
}: Props) {
  const router = useRouter();

  const form = useForm<PaymentInput>({
    resolver: zodResolver(PaymentSchema),
  });

  async function onSubmit(
    values: PaymentInput
  ) {
    const result =
      await createPayment(values);

    if (result.success) {
      toast.success("Payment recorded");

      router.push("/dashboard/payments");

      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl space-y-5"
    >
      <select
        {...form.register("memberId")}
        className="w-full rounded-md border p-3"
      >
        <option value="">
          Select Member
        </option>

        {members.map((member) => (
          <option
            key={member.id}
            value={member.id}
          >
            {member.firstName}{" "}
            {member.lastName}
          </option>
        ))}
      </select>

      <Input
        type="number"
        placeholder="Amount"
        {...form.register("amount")}
      />

      <Input
        placeholder="Payment Method"
        {...form.register(
          "paymentMethod"
        )}
      />

      <Input
        placeholder="Notes"
        {...form.register("notes")}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Record Payment
      </Button>
    </form>
  );
}