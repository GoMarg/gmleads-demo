import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GmLeadsWidget } from "@/components/gmleads-widget";
import { Hero } from "@/components/sections/hero";
import { IntegratesWith } from "@/components/sections/integrates-with";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LiveDemo } from "@/components/sections/live-demo";
import { Features } from "@/components/sections/features";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <IntegratesWith />
        <Problem />
        <HowItWorks />
        <LiveDemo />
        <Features />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <GmLeadsWidget />
    </>
  );
}
