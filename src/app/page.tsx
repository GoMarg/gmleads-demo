import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GmLeadsWidget } from "@/components/gmleads-widget";
import { WidgetNudge } from "@/components/widget-nudge";
import { Hero } from "@/components/sections/hero";
import { CustomerLogos } from "@/components/sections/customer-logos";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CustomerLogos />
        <Features />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <GmLeadsWidget />
      <WidgetNudge />
    </>
  );
}
