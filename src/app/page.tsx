import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GmLeadsWidget } from "@/components/gmleads-widget";
import { WidgetNudge } from "@/components/widget-nudge";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
      <Footer />
      <GmLeadsWidget />
      <WidgetNudge />
    </>
  );
}
