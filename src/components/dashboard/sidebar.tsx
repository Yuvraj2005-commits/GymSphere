"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CalendarDays,
  CreditCard,
  BadgeDollarSign,
  Settings,
  Dumbbell,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Trainers",
    href: "/dashboard/trainers",
    icon: UserCog,
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: CalendarDays,
  },
  {
    title: "Plans",
    href: "/dashboard/plans",
    icon: BadgeDollarSign,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Dumbbell className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">
          GymSphere
        </span>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}