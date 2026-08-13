"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const WIDGET_URL =
  process.env.NEXT_PUBLIC_WIDGET_URL ??
  "https://gmleads-widget-production.pages.dev/widget.js";
const DEFAULT_EMBED_KEY = process.env.NEXT_PUBLIC_EMBED_KEY ?? "";

interface GmLeadsWidgetProps {
  embedKey?: string;
  accentColor?: string;
  label?: string;
}

export function GmLeadsWidget({ embedKey, accentColor, label }: GmLeadsWidgetProps) {
  const resolvedKey = embedKey ?? DEFAULT_EMBED_KEY;
  const resolvedColor = accentColor ?? "#3b82f6";
  const destroyRef = useRef<() => void>(null);
  const initedRef = useRef(false);

  useEffect(() => {
    if (!embedKey || !resolvedKey) return;

    // Clean up any previous init
    if (typeof destroyRef.current === "function") {
      destroyRef.current();
    }

    initedRef.current = true;

    const w = window as unknown as {
      GmLeads?: {
        init: (config: { key: string; accentColor?: string; label?: string }) => void;
        destroy: () => void;
        version: string;
      };
    };

    if (w.GmLeads) {
      w.GmLeads.destroy();
      w.GmLeads.init({ key: embedKey, accentColor: resolvedColor, label });
      destroyRef.current = () => {
        if (w.GmLeads) w.GmLeads.destroy();
      };
    } else {
      const script = document.createElement("script");
      script.src = WIDGET_URL;
      script.setAttribute("data-key", embedKey);
      script.setAttribute("data-accent-color", resolvedColor);
      if (label) script.setAttribute("data-label", label);
      script.async = true;
      document.body.appendChild(script);

      destroyRef.current = () => {
        script.remove();
        if (w.GmLeads) w.GmLeads.destroy();
      };
    }

    return () => {
      if (typeof destroyRef.current === "function") {
        destroyRef.current();
        destroyRef.current = null;
      }
      initedRef.current = false;
    };
  }, [embedKey, resolvedColor, resolvedKey, label]);

  // Static embed from env var — handled via Standard Script approach.
  if (!embedKey && resolvedKey) {
    return (
      <Script
        src={WIDGET_URL}
        data-key={resolvedKey}
        data-accent-color={resolvedColor}
        data-label={label}
        strategy="afterInteractive"
        async
      />
    );
  }

  if (embedKey) return null;

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "NEXT_PUBLIC_EMBED_KEY is not set — the GmLeads widget will not load."
    );
  }
  return null;
}
