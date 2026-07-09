import { prisma } from "@/lib/prisma";

export default async function RecentPayments() {
  const payments = await prisma.payment.findMany({
    take: 5,
    include: {
      member: true,
    },
    orderBy: {
      paymentDate: "desc",
    },
  });

  return (
    <div className="rounded-xl border bg-background p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Payments
      </h2>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium">
                {payment.member.firstName}{" "}
                {payment.member.lastName}
              </p>

              <p className="text-sm text-muted-foreground">
                {payment.paymentMethod}
              </p>
            </div>

            <p className="font-bold text-green-600">
              ₹{Number(payment.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}