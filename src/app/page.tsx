import {
  Navbar,
  Hero,
  // Trusted,
  Features,
} from "@/components/marketing";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
       <Hero />
       <Features />
     
    </main>
  );
}