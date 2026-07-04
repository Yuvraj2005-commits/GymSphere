"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import GradientBadge from "@/components/common/gradient-badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 lg:flex-row lg:justify-between">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <GradientBadge>AI Powered SaaS</GradientBadge>

          <h1 className="text-5xl font-black tracking-tight lg:text-7xl">
            Run Your Gym
            <span className="block text-blue-600">Smarter With AI</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Everything you need to manage members, trainers, attendance,
            payments, analytics and AI workout generation — all from one modern
            dashboard.
          </p>

          <div className="mt-10 flex gap-4">
            <Button size="lg">Start Free</Button>

            <Button size="lg" variant="outline">
              Watch Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-muted-foreground">Gyms</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">25K+</h2>
              <p className="text-muted-foreground">Members</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">99%</h2>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-16 lg:mt-0"
        >
          <div className="w-[420px] rounded-3xl border bg-card p-8 shadow-2xl">
            <div className="mb-6 flex justify-between">
              <span>Revenue</span>
              <span className="font-bold text-green-500">₹1,24,500</span>
            </div>

            <div className="mb-6 flex justify-between">
              <span>Members</span>
              <span className="font-bold">245</span>
            </div>

            <div className="mb-6 flex justify-between">
              <span>Today's Check-ins</span>
              <span className="font-bold">182</span>
            </div>

            <div className="flex justify-between">
              <span>Growth</span>
              <span className="font-bold text-green-500">+18%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
