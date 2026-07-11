import Link from "next/link";
import { Plus } from "lucide-react";

import PaymentStats from "@/components/payments/payment-stats";
import PaymentSearch from "@/components/payments/payment-search";
import PaymentTable from "@/components/payments/payment-table";

interface PaymentsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function PaymentsPage({
  searchParams,
}: PaymentsPageProps) {
  const { search = "" } = await searchParams;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Payments
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage member payments.
          </p>
        </div>

        <Link
          href="/dashboard/payments/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Record Payment
        </Link>
      </div>

      <PaymentStats />

      <PaymentSearch />

      <PaymentTable search={search} />
    </div>
  );
}