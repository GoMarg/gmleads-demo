"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GmLeadsWidget } from "@/components/gmleads-widget";
import type { DemoStatus } from "@/lib/widget-api";

const EMBED_KEY = process.env.NEXT_PUBLIC_DEMO_EMBED_KEY ?? process.env.NEXT_PUBLIC_EMBED_KEY ?? "";

// This is a dedicated live demo page that looks and feels like a real
// SaaS business website, with the GmLeads widget already installed.
//
// During a demo, you can navigate here and say:
//   "Here's a website that has already installed GmLeads."
// and immediately interact with the widget.
//
// The widget is the same production widget package customers receive.
// The only difference is configuration — this page uses our demo workspace.

const NAV_ITEMS = ["Features", "Testimonials"];

const FEATURES = [
  {
    title: "Visitor Identification",
    body: "Know which companies are visiting your site — even when they don't fill out a form.",
    icon: (
      <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    ),
  },
  {
    title: "Slack Routing",
    body: "High-intent visitors are routed to the right channel or rep automatically.",
    icon: (
      <path d="M9 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2V5a2 2 0 0 0-2-2Zm0 6H5a2 2 0 1 0 0 4h4v-4Zm6-6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2V5a2 2 0 0 1 2-2ZM9 15H7a2 2 0 1 0 0 4h2v-4Zm6 0h4a2 2 0 1 1 0 4h-4v-4Zm0-6h2a2 2 0 1 0 0-4h-2v4Zm-6 0v4h4V9Z" />
    ),
  },
  {
    title: "Lead Capture",
    body: "Start conversations, qualify leads, and book meetings — all from the widget.",
    icon: (
      <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />
    ),
  },
];

const TESTIMONIALS = [
  { quote: "We installed Gridflow on Monday. By Wednesday we'd identified 14 enterprise accounts on our site.", author: "Sarah Chen", role: "VP Growth, Northloop" },
  { quote: "The Slack integration alone saves our SDR team hours every day.", author: "Marcus Rivera", role: "Head of Sales, Voxel" },
  { quote: "Visitor identification accuracy is incredible. We're seeing accounts we never knew were visiting.", author: "Aisha Patel", role: "CEO, Brightcast" },
];

export function DemoWebsite() {
  const [status, setStatus] = useState<DemoStatus | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/demo-status")
      .then((res) => res.ok ? res.json() : null)
      .then(setStatus);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-line-soft bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/live-demo" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-accent text-xs font-bold text-accent-ink">
              G
            </span>
            <span className="font-display text-lg font-700 tracking-tight">Gridflow</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors hover:text-ink"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-line-soft bg-bg px-6 py-4 md:hidden">
            {NAV_ITEMS.map((item) => (
              <div key={item} className="py-2 text-sm text-ink-soft">{item}</div>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-30"
            style={{ background: "radial-gradient(560px 320px at 50% -8%, var(--accent-soft), transparent 70%)" }}
          />
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Live Demo — Widget Installed
            </span>
            <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-800 leading-[1.05] md:text-6xl">
              Turn website traffic into pipeline.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-ink-soft leading-relaxed">
              Gridflow identifies your anonymous website visitors, routes them
              to Slack, and captures leads — without forcing them through a form.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <span className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-ink cursor-pointer transition-transform hover:scale-[1.02]">
                Start free trial
              </span>
              <span className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink cursor-pointer transition-colors hover:border-ink-faint">
                Talk to sales
              </span>
            </div>

            {/* Status indicators */}
            {status && (
              <div className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-3 text-xs text-ink-faint">
                <span className="flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-raised px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Widget Connected
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-raised px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {status.slack.label}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-raised px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {status.metrics.leadsCapturedToday} leads today
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-line-soft py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-800 leading-tight md:text-4xl">
                Everything you need to capture leads
              </h2>
              <p className="mt-4 text-lg text-ink-soft">
                Gridflow does the work so your team can focus on closing.
              </p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-bg p-7">
                  <svg className="h-6 w-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                  <h3 className="mt-4 font-display text-base font-700">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="border-t border-line-soft py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-800 leading-tight md:text-4xl">
                Trusted by growing teams
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className="rounded-2xl border border-line bg-bg-raised p-6">
                  <p className="text-sm italic text-ink-soft leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-line-soft pt-4">
                    <p className="text-sm font-600 text-ink">{t.author}</p>
                    <p className="text-xs text-ink-faint">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-line-soft py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-accent text-[8px] font-bold text-accent-ink">
                  G
                </span>
                <span className="text-sm font-semibold text-ink">Gridflow</span>
              </div>
              <div className="flex items-center gap-6 text-xs text-ink-faint">
                <Link href="/" className="transition-colors hover:text-ink">Back to Ashlar</Link>
                <Link href="/#configure" className="transition-colors hover:text-ink">Try GmLeads</Link>
                <span>Privacy</span>
                <span>Terms</span>
              </div>
              <p className="text-xs text-ink-faint">
                &copy; {new Date().getFullYear()} Gridflow, Inc.
              </p>
            </div>
            <p className="mt-6 text-center text-[10px] text-ink-faint/50">
              Demo website. The GmLeads widget is real and connected to a live workspace.
            </p>
          </div>
        </footer>
      </main>

      {/* The real GmLeads widget — same package customers receive */}
      <GmLeadsWidget embedKey={EMBED_KEY} accentColor="#3b82f6" label="Chat with Gridflow" />
    </div>
  );
}

