"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GmLeadsWidget } from "@/components/gmleads-widget";
import { WidgetNudge } from "@/components/widget-nudge";
import { Hero } from "@/components/sections/hero";
import { CustomerLogos } from "@/components/sections/customer-logos";
import { Features } from "@/components/sections/features";
import { InteractiveDemo } from "@/components/sections/interactive-demo";
import { WidgetOnboarding } from "@/components/sections/widget-onboarding";
import { EmbedCredentials } from "@/components/sections/embed-credentials";
import { WidgetPreview } from "@/components/sections/widget-preview";
import { DeveloperGuide } from "@/components/sections/developer-guide";
import { Integrations } from "@/components/sections/integrations";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

interface GeneratedWidget {
  embedKey: string;
  workspaceName: string;
  allowedDomain: string;
  environment: string;
  createdAt: string;
  adminPassword?: string;
}

export default function Home() {
  const [generatedWidget, setGeneratedWidget] = useState<GeneratedWidget | null>(null);

  function handleGenerated(response: GeneratedWidget) {
    setGeneratedWidget(response);
    // Scroll to credentials section after a brief delay
    setTimeout(() => {
      document.getElementById("credentials")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  const activeEmbedKey = generatedWidget?.embedKey;

  return (
    <>
      <Nav />
      <main>
        {/* Learn section */}
        <Hero />
        <CustomerLogos />
        <Features />

        {/* Interactive Demo — widget already installed */}
        <InteractiveDemo />

        {/* Configure Your Widget — onboarding flow */}
        <WidgetOnboarding onGenerated={handleGenerated} />

        {/* After generation: show credentials, preview, and install guide */}
        {generatedWidget && (
          <>
            <EmbedCredentials
              embedKey={generatedWidget.embedKey}
              workspaceName={generatedWidget.workspaceName}
              allowedDomain={generatedWidget.allowedDomain}
              environment={generatedWidget.environment}
              createdAt={generatedWidget.createdAt}
            />
            <WidgetPreview embedKey={generatedWidget.embedKey} />
            <DeveloperGuide embedKey={generatedWidget.embedKey} />
          </>
        )}

        {/* Always-visible sections */}
        <Integrations />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
      {/* Pass generated embed key so GmLeadsWidget re-inits with the new key.
          Falls back to NEXT_PUBLIC_EMBED_KEY env var when no key generated yet. */}
      <GmLeadsWidget embedKey={activeEmbedKey} />
      <WidgetNudge />
    </>
  );
}

