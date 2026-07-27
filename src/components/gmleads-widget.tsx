"use client";

import { useEffect } from "react";
import Script from "next/script";

// The real, production GmLeads widget — same script every actual customer
// embeds. WIDGET_URL is env-configurable so switching from the Cloudflare
// Pages URL to the intended cdn.gmleads.io domain later is a one-line
// change, not a code change (see .env.example).
const WIDGET_URL =
  process.env.NEXT_PUBLIC_WIDGET_URL ??
  "https://gmleads-widget-production.pages.dev/widget.js";
const DEFAULT_EMBED_KEY = process.env.NEXT_PUBLIC_EMBED_KEY ?? "";

interface GmLeadsWidgetProps {
  /** Optional dynamic embed key. If provided, overrides the env var default. */
  embedKey?: string;
  /** Optional accent color. Defaults to #3ddc84 */
  accentColor?: string;
}

export function GmLeadsWidget({ embedKey, accentColor }: GmLeadsWidgetProps) {
  const resolvedKey = embedKey ?? DEFAULT_EMBED_KEY;
  const resolvedColor = accentColor ?? "#3ddc84";

  // If a dynamic embedKey is provided, use programmatic init() instead of
  // the static <Script> tag. This supports the Configure → Generate → Preview
  // flow where the key isn't known at build time.
  useEffect(() => {
    if (!embedKey) return;

    const w = window as unknown as {
      GmLeads?: {
        init: (config: { key: string; accentColor?: string }) => void;
        destroy: () => void;
        version: string;
      };
    };

    // The widget script may already be loaded (e.g. from a <Script> tag
    // elsewhere on the page, or from a previous init). Destroy any existing
    // instance before re-initializing with the new key.
    if (w.GmLeads) {
      try { w.GmLeads.destroy(); } catch {}
      w.GmLeads.init({ key: embedKey, accentColor: resolvedColor });
    } else {
      // Script not yet loaded — load it dynamically; the entry.ts auto-init
      // will find the data-key attribute on the script tag.
      const script = document.createElement("script");
      script.src = WIDGET_URL;
      script.setAttribute("data-key", embedKey);
      script.setAttribute("data-accent-color", resolvedColor);
      script.async = true;
      document.body.appendChild(script);

      return () => {
        script.remove();
        if (w.GmLeads) {
          try { w.GmLeads.destroy(); } catch {}
        }
      };
    }

    return () => {
      if (w.GmLeads) {
        try { w.GmLeads.destroy(); } catch {}
      }
    };
  }, [embedKey, resolvedColor]);

  // Static embed from env var — use the standard Next.js Script approach.
  // Only rendered when no dynamic key is provided and the env var is set.
  // Next.js <Script> handles deduplication internally.
  if (!embedKey && resolvedKey) {
    return (
      <Script
        src={WIDGET_URL}
        data-key={resolvedKey}
        data-accent-color={resolvedColor}
        strategy="afterInteractive"
        async
      />
    );
  }

  // Dynamic key mode renders nothing here — the useEffect handles it.
  // This ensures the widget doesn't double-initialize from both paths.
  if (embedKey) {
    return null;
  }

  // No key configured at all
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "NEXT_PUBLIC_EMBED_KEY is not set — the GmLeads widget will not load."
    );
  }
  return null;
}
