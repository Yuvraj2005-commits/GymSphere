"use client";

import {
  Brain,
  CreditCard,
  Users,
  Activity,
  Dumbbell,
  Salad,
} from "lucide-react";

import FeatureCard from "@/components/common/feature-card";
import GradientBadge from "@/components/common/gradient-badge";
import SectionContainer from "@/components/common/section-container";
import SectionHeading from "@/components/common/section-heading";

const features = [
  {
    icon: Users,
    title: "Member Management",
    description:
      "Manage members, memberships, renewals and profiles effortlessly.",
  },
  {
    icon: Activity,
    title: "Attendance Tracking",
    description:
      "QR-based attendance with real-time check-ins and reports.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Track invoices, subscriptions and monthly revenue in one place.",
  },
  {
    icon: Brain,
    title: "AI Workout Planner",
    description:
      "Generate personalized workout plans using Gemini AI.",
  },
  {
    icon: Salad,
    title: "AI Diet Plans",
    description:
      "Create nutrition plans based on fitness goals and lifestyle.",
  },
  {
    icon: Dumbbell,
    title: "Trainer Dashboard",
    description:
      "Assign workouts, monitor progress and manage clients efficiently.",
  },
];

export default function Features() {
  return (
    <SectionContainer className="bg-muted/20" id="features">
      <SectionHeading
        badge={<GradientBadge>Powerful Features</GradientBadge>}
        title="Everything Your Gym Needs"
        description="GymSphere combines management, AI, analytics and automation into one powerful platform."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </SectionContainer>
  );
}