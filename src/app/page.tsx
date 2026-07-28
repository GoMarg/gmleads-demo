import { Hero } from "@/components/sections/hero";
import { SDKSection } from "@/components/sections/sdk";
import { DocsSection } from "@/components/sections/docs";
import { WorkflowSection } from "@/components/sections/workflow";
import { IntegrationsSection } from "@/components/sections/integrations";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <SDKSection />
      <DocsSection />
      <WorkflowSection />
      <IntegrationsSection />
    </main>
  );
}