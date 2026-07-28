"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GmLeadsWidget } from "@/components/gmleads-widget";

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
    </span>
  );
}

export function Hero() {
  const [stats, setStats] = useState({
    visitors: 1,
    leads: 0,
    latency: 18,
  });

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        visitors: prev.visitors + Math.floor(Math.random() * 2),
        leads: prev.leads + (Math.random() > 0.7 ? 1 : 0),
        latency: 15 + Math.floor(Math.random() * 10),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Embed demo widget with real key */}
      <GmLeadsWidget embedKey={process.env.NEXT_PUBLIC_EMBED_KEY || "gml_ccf85773339f942de0d7f68e406b713e9f52dda09d22f135"} />

      <div className="relative mx-auto max-w-7xl px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <StatusDot />
            <span className="text-xs font-medium text-white/40 uppercase tracking-widest">
              Now in Public Beta
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            Know every company
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              visiting your site.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
            The lightweight SDK that identifies anonymous visitors, qualifies leads, 
            and sends them to Slack — no forms required.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex items-center gap-4">
            <a
              href="#sdk"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </a>
            <a
              href="#docs"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white/90"
            >
              Documentation
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/40">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>TypeScript Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>MIT License</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Edge Compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{'<10KB gzipped'}</span>
            </div>
          </div>
        </motion.div>

        {/* Video demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-3xl"
        >
          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden shadow-2xl">
            <div className="aspect-video flex items-center justify-center">
              <button className="group flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white/20">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-sm font-medium text-white">Watch 2-minute demo</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Floating status card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-sm"
        >
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 text-xs font-bold">
                  {'</>'}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">GmLeads SDK</div>
                  <div className="text-xs text-white/40">v2.1.0</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">Connected</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/[0.02] p-3">
                <div className="text-xs text-white/40 mb-1">Visitor detected</div>
                <div className="text-lg font-semibold text-white">{stats.visitors}</div>
              </div>
              <div className="rounded-lg bg-white/[0.02] p-3">
                <div className="text-xs text-white/40 mb-1">Lead Qualified</div>
                <div className="text-lg font-semibold text-white">{stats.leads}</div>
              </div>
              <div className="rounded-lg bg-white/[0.02] p-3">
                <div className="text-xs text-white/40 mb-1">Latency</div>
                <div className="text-lg font-semibold text-white">{stats.latency}ms</div>
              </div>
              <div className="rounded-lg bg-white/[0.02] p-3">
                <div className="text-xs text-white/40 mb-1">Environment</div>
                <div className="text-lg font-semibold text-white">Production</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}