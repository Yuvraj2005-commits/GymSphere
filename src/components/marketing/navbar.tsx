"use client";

import Link from "next/link";
import { Dumbbell, Menu } from "lucide-react";

import { siteConfig } from "@/config/site";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-primary p-2 text-primary-foreground">
            <Dumbbell className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost">Login</Button>

          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <div className="mt-10 flex flex-col gap-6">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-lg font-medium"
                >
                  {item.title}
                </Link>
              ))}

              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
