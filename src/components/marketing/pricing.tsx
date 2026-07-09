import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    description: "Perfect for small gyms starting their digital journey.",
    features: [
      "Up to 100 Members",
      "Attendance Tracking",
      "Payment Management",
      "Basic Reports",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹1,999",
    period: "/month",
    description: "Everything you need to efficiently run your gym.",
    features: [
      "Unlimited Members",
      "Trainer Management",
      "Attendance Tracking",
      "Payments & Reports",
      "Analytics Dashboard",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For chains and large fitness businesses.",
    features: [
      "Unlimited Branches",
      "Unlimited Members",
      "Advanced Analytics",
      "Custom Integrations",
      "Dedicated Manager",
      "24/7 Premium Support",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-muted/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Pricing
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Simple pricing for every gym
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Start small and upgrade as your gym grows.
            No hidden fees.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border bg-background p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/20"
                  : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold">
                {plan.name}
              </h3>

              <p className="mt-2 text-muted-foreground">
                {plan.description}
              </p>

              <div className="mt-8 flex items-end">
                <span className="text-5xl font-extrabold">
                  {plan.price}
                </span>

                <span className="ml-2 mb-1 text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <Check className="h-5 w-5 text-green-500" />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`mt-10 flex w-full items-center justify-center rounded-xl px-6 py-3 font-semibold transition ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border hover:bg-muted"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}