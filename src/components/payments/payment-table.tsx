import { prisma } from "@/lib/prisma";

export default async function PaymentTable() {
  const payments = await prisma.payment.findMany({
    include: {
      member: true,
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
          Record your first payment.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-6 py-4 text-left">Member</th>
            <th className="px-6 py-4 text-left">Amount</th>
            <th className="px-6 py-4 text-left">Method</th>
            <th className="px-6 py-4 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="px-6 py-4">
                {payment.member.firstName} {payment.member.lastName}
              </td>

              <td className="px-6 py-4">
                ₹{Number(payment.amount).toLocaleString()}
              </td>

              <td className="px-6 py-4">
                {payment.paymentMethod}
              </td>

              <td className="px-6 py-4">
                {payment.paymentDate.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}