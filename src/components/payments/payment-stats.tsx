import { prisma } from "@/lib/prisma";

export default async function PaymentStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const payments = await prisma.payment.findMany({
    select: {
      amount: true,
      paymentDate: true,
    },
  });

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  const todayRevenue = payments
    .filter((payment) => payment.paymentDate >= today)
    .reduce(
      (sum, payment) => sum + Number(payment.amount),
      0
    );

  const totalPayments = payments.length;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          Total Revenue
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₹{totalRevenue.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          Today's Revenue
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          ₹{todayRevenue.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          Total Payments
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {totalPayments}
        </h2>
      </div>
    </div>
  );
}