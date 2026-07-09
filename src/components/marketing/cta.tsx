import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl rounded-3xl bg-primary px-10 py-20 text-center text-primary-foreground">
        <h2 className="text-5xl font-bold">
          Ready to Grow Your Gym?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">
          Join thousands of fitness businesses already
          using GymSphere to simplify management.
        </p>

        <Link
          href="/register"
          className="mt-10 inline-flex rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
        >
          Start Free Today
        </Link>
      </div>
    </section>
  );
}