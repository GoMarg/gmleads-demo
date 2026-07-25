"use client";

import Script from "next/script";

// The real, production GmLeads widget — same script every actual customer
// embeds. WIDGET_URL is env-configurable so switching from the Cloudflare
// Pages URL to the intended cdn.gmleads.io domain later is a one-line
// change, not a code change (see .env.example).
const WIDGET_URL =
  process.env.NEXT_PUBLIC_WIDGET_URL ??
  "https://gmleads-widget-production.pages.dev/widget.js";
const EMBED_KEY = process.env.NEXT_PUBLIC_EMBED_KEY ?? "";

export function GmLeadsWidget() {
  if (!EMBED_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_EMBED_KEY is not set — the GmLeads widget will not load."
      );
    }
    return null;
  }

  return (
    <Script
      src={WIDGET_URL}
      data-key={EMBED_KEY}
      data-accent-color="#3ddc84"
      strategy="afterInteractive"
      async
    />
  );
}
