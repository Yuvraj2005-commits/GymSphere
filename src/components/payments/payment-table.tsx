import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentOwner } from "@/lib/current-owner";

import DeletePaymentDialog from "./delete-payment-dialog";

interface PaymentTableProps {
  search?: string;
}

export default async function PaymentTable({
  search = "",
}: PaymentTableProps) {
  const owner = await getCurrentOwner();

  if (!owner) {
    redirect("/dashboard/onboarding");
  }

  const payments = await prisma.payment.findMany({
    where: {
      member: {
        gymId: owner.gymId,

        ...(search
          ? {
              OR: [
                {
                  firstName: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },
    },

    include: {
      member: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },

    orderBy: {
      paymentDate: "desc",
    },
  });

  if (payments.length === 0) {
    return (
      <div className="rounded-xl border p-16 text-center">
        <h2 className="text-2xl font-bold">
          No Payments Yet
        </h2>

        <p className="mt-2 text-muted-foreground">
          Record your first payment to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Member
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Amount
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Method
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Date
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-b transition-colors hover:bg-muted/30"
            >
              <td className="px-6 py-4 font-medium">
                {payment.member.firstName}{" "}
                {payment.member.lastName}
              </td>

              <td className="px-6 py-4 font-semibold text-green-600">
                ₹{Number(payment.amount).toLocaleString("en-IN")}
              </td>

              <td className="px-6 py-4">
                {payment.paymentMethod}
              </td>

              <td className="px-6 py-4">
                {payment.paymentDate.toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-center">
                <DeletePaymentDialog
                  paymentId={payment.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}