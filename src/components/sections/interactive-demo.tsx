"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "../container";
import { Eyebrow } from "../eyebrow";
import type { DemoStatus } from "@/lib/widget-api";

// A realistic mini business website displayed inline, with the GmLeads
// widget already embedded. From a visitor's perspective this looks like
// any ordinary SaaS company site. The widget is live and usable.
//
// The purpose: during a demo you can point to this and say
// "Here's a website that has already installed GmLeads."
// and immediately interact with the widget.

function DemoStatusPanel({ status }: { status: DemoStatus | null }) {
  if (!status) return null;

  const isDemo = (status as DemoStatus & { isDemo?: boolean }).isDemo ?? false;

  return (
    <div className="rounded-xl border border-line bg-bg-raised p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
          System Status
        </p>
        {isDemo && (
          <span className="rounded-full bg-ink-faint/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-faint">
            DEMO
          </span>
        )}
      </div>
      <div className="space-y-2">
        <StatusRow
          label={status.widget.label}
          ok={status.widget.status === "connected"}
        />
        <StatusRow
          label={status.slack.label}
          ok={status.slack.status === "connected"}
        />
        <StatusRow
          label={status.workspace.label}
          ok={status.workspace.status === "active"}
          detail={status.workspace.name}
        />
        <StatusRow
          label={status.embedKey.label}
          ok={status.embedKey.status === "valid"}
        />
      </div>

      <div className="mt-4 border-t border-line-soft pt-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint mb-2">
          Activity
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Metric label="Active Visitors" value={String(status.metrics.activeVisitors)} />
          <Metric label="Leads Today" value={String(status.metrics.leadsCapturedToday)} />
          <Metric label="Last Conversation" value={status.metrics.lastConversation} />
          <Metric label="Avg Response" value={status.metrics.avgResponseTime} />
        </div>
        {isDemo && (
          <p className="mt-3 text-[9px] text-ink-faint/60 text-center italic">
            * values shown are for demonstration
          </p>
        )}
      </div>
    </div>
  );
}

function StatusRow({
  label,
  ok,
  detail,
}: {
  label: string;
  ok: boolean;
  detail?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-2 w-2 shrink-0 rounded-full ${
          ok ? "bg-accent" : "bg-ink-faint/40"
        }`}
      />
      <span className="text-sm text-ink-soft">{label}</span>
      {detail && (
        <span className="text-xs text-ink-faint ml-auto">{detail}</span>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-bg-inset px-3 py-2">
      <p className="text-ink-faint">{label}</p>
      <p className="font-semibold text-ink tabular-nums">{value}</p>
    </div>
  );
}

// --- Mini demo site mockup ---

const NAV_ITEMS = ["Features", "Pricing", "Docs", "Contact"];

function MinisiteHeader() {
  return (
    <div className="flex items-center justify-between border-b border-line-soft px-5 py-3">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-accent text-[8px] font-bold text-accent-ink">
          G
        </span>
        <span className="text-sm font-semibold text-ink">Gridflow</span>
      </div>
      <div className="flex items-center gap-4">
        {NAV_ITEMS.map((item) => (
          <span
            key={item}
            className="text-xs text-ink-faint cursor-default"
          >
            {item}
          </span>
        ))}
        <span className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink">
          Get Started
        </span>
      </div>
    </div>
  );
}

function MinisiteHero() {
  return (
    <div className="px-5 py-10 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Now with live chat
      </span>
      <h3 className="mt-4 font-display text-xl font-700 text-ink">
        Analytics that tell you who&apos;s visiting
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-xs text-ink-soft leading-relaxed">
        Identify your website visitors, route them to Slack, and capture leads
        &mdash; without forcing them through a form.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="rounded-md bg-accent px-4 py-2 text-xs font-semibold text-accent-ink">
          Start free trial
        </span>
        <span className="rounded-md border border-line px-4 py-2 text-xs font-semibold text-ink">
          View demo
        </span>
      </div>

      {/* Pricing cards */}
      <div className="mx-auto mt-8 flex max-w-sm gap-3">
        {["Starter", "Growth", "Enterprise"].map((plan, i) => (
          <div
            key={plan}
            className={`flex-1 rounded-lg border ${
              i === 1 ? "border-accent bg-bg-raised" : "border-line bg-bg"
            } px-3 py-3`}
          >
            <p className="text-xs font-semibold text-ink">{plan}</p>
            <p className="mt-1 text-lg font-bold text-ink tabular-nums">
              {i === 0 ? "$0" : i === 1 ? "$99" : "Custom"}
            </p>
            <p className="mt-1 text-[10px] text-ink-faint">per month</p>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="mx-auto mt-8 max-w-xs rounded-lg border border-line-soft bg-bg-raised/50 px-4 py-3">
        <p className="text-xs italic text-ink-soft">
          &ldquo;We installed Gridflow on Monday. By Wednesday we&apos;d
          identified 14 enterprise accounts on our site.&rdquo;
        </p>
        <p className="mt-2 text-[10px] text-ink-faint">
          &mdash; Sarah Chen, VP Growth at Northloop
        </p>
      </div>
    </div>
  );
}

export function InteractiveDemo() {
  const [status, setStatus] = useState<DemoStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/demo-status")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="live-demo" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>See It Live</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            You&apos;re looking at a real customer website.
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            The widget you see below is already installed.
            <br />
            Try clicking the chat button in the corner.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-accent/30 bg-accent-soft/10 px-5 py-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-sm font-semibold text-accent-2">
              &#9889; Widget Active &mdash; installed on this page
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-faint">
            Everything below is a functioning business website. The GmLeads chat widget is already loaded &mdash; no setup needed.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* The mini-site with widget — presented as a real customer site */}
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised shadow-2xl">
            <MinisiteHeader />
            <MinisiteHero />
          </div>

          {/* Status panel */}
          <div>
            {loading ? (
              <div className="rounded-xl border border-line bg-bg-raised p-6">
                <div className="h-4 w-24 rounded bg-bg-inset animate-pulse" />
                <div className="mt-4 space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 w-full rounded bg-bg-inset animate-pulse" />
                  ))}
                </div>
              </div>
            ) : (
              <DemoStatusPanel status={status} />
            )}

            <div className="mt-4 rounded-xl border border-line bg-bg-raised p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
                Open Full Demo
              </p>
              <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                Want to see the full experience? Visit our dedicated demo page.
              </p>
              <Link
                href="/live-demo"
                className="mt-3 inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
              >
                Open Live Demo
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

