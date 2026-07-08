import { prisma } from "@/lib/prisma";
import PaymentFormClient from "./payment-form-client";

export default async function PaymentForm() {
  const members = await prisma.member.findMany({
    orderBy: {
      firstName: "asc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return (
    <PaymentFormClient
      members={members}
    />
  );
}