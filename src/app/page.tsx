import {
  Navbar,
  Hero,
  Trusted,
  Features,
  DashboardPreview,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <DashboardPreview />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}