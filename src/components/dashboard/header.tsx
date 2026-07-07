"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import UserMenu from "./user-menu";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-8 backdrop-blur-xl">
      <div className="relative w-80">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search members..."
          className="pl-10"
        />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <button className="rounded-xl border p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}