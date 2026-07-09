import {
  Dumbbell,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

const brands = [
  {
    icon: Dumbbell,
    name: "FitZone",
  },
  {
    icon: Trophy,
    name: "Power Gym",
  },
  {
    icon: Users,
    name: "Elite Fitness",
  },
  {
    icon: ShieldCheck,
    name: "Muscle Hub",
  },
];

export default function Trusted() {
  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by Fitness Businesses
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {brands.map((brand) => {
            const Icon = brand.icon;

            return (
              <div
                key={brand.name}
                className="flex items-center justify-center gap-3 rounded-2xl border bg-background p-6 shadow-sm transition hover:shadow-lg"
              >
                <Icon className="h-7 w-7 text-primary" />

                <span className="font-semibold">
                  {brand.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}