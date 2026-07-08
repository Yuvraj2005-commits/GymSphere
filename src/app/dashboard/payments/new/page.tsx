import PaymentForm from "@/components/payments/payment-form";

export default function NewPaymentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Record Payment
        </h1>

        <p className="mt-2 text-muted-foreground">
          Record a member payment.
        </p>
      </div>

      <PaymentForm />
    </div>
  );
}