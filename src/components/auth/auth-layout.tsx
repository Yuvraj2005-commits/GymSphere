import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground">
        <div>
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="rounded-xl bg-white/20 p-3">
              <Dumbbell className="h-7 w-7" />
            </div>

            <span className="text-3xl font-bold">
              GymSphere
            </span>
          </Link>
        </div>

        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Manage your gym
            <br />
            smarter.
          </h2>

          <p className="mt-6 max-w-md text-lg opacity-90">
            Members, attendance, payments, trainers,
            reports and analytics — all in one place.
          </p>
        </div>

        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} GymSphere
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">
              {title}
            </h1>

            <p className="mt-2 text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}