import {
  DashboardPreview,
  Features,
  Hero,
  Navbar,
} from "@/components/marketing";

export default function Home() {
  return (
    <main className="min-h-screen">

      <Navbar />

      <Hero />

      <Features />

      <DashboardPreview />

    </main>
  );
}