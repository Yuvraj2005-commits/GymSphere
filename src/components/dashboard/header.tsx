"use client";

import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import UserMenu from "./user-menu";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-8 backdrop-blur-xl">
      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search members..."
          className="pl-10"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="rounded-xl border p-2 transition hover:bg-muted">
              <Bell className="h-5 w-5" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-80"
          >
            <div className="space-y-3">
              <h3 className="text-base font-semibold">
                Notifications
              </h3>

              <div className="rounded-lg border border-dashed p-6 text-center">
                <Bell className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

                <p className="font-medium">
                  No notifications
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  You're all caught up.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}