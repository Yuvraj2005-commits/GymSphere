import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Gym Owner",
    review:
      "GymSphere helped us manage attendance, payments and members effortlessly. Highly recommended!",
  },
  {
    name: "Priya Singh",
    role: "Fitness Studio",
    review:
      "The dashboard is clean, fast and saves us hours every week. Our staff loves using it.",
  },
  {
    name: "Amit Kumar",
    role: "CrossFit Center",
    review:
      "Excellent reporting and member management. Exactly what we needed to grow our business.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Trusted by Gym Owners
          </h2>

          <p className="mt-4 text-muted-foreground">
            Thousands of fitness professionals rely on GymSphere to manage their business.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border bg-background p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-muted-foreground">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}