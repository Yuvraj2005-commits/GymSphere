import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary p-2 text-primary-foreground">
            <Dumbbell className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold">
            GymSphere
          </span>
        </div>

        <div className="flex gap-8 text-sm text-muted-foreground">
          <Link href="#features">Features</Link>

          <Link href="#pricing">Pricing</Link>

          <Link href="#faq">FAQ</Link>

          <Link href="/login">Login</Link>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} GymSphere.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}