"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Floating Navigation ───────────────────────────────────────────
function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4"
    >
      <nav
        className={`flex items-center gap-8 rounded-full px-6 py-2.5 transition-all duration-500 ${
          scrolled
            ? "w-[95%] max-w-5xl border border-white/[0.06] bg-black/70 shadow-2xl shadow-black/50 backdrop-blur-2xl"
            : "w-auto border border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
            <span className="text-[11px] font-bold text-black">G</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">
            GmLeads
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#sdk" className="text-[13px] font-medium text-white/50 transition-colors hover:text-white/90">
            SDK
          </Link>
          <Link href="/live-demo" className="text-[13px] font-medium text-white/50 transition-colors hover:text-white/90">
            Live Demo
          </Link>
          <Link href="/#docs" className="text-[13px] font-medium text-white/50 transition-colors hover:text-white/90">
            Docs
          </Link>
          <Link href="/#pricing" className="text-[13px] font-medium text-white/50 transition-colors hover:text-white/90">
            Pricing
          </Link>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/live-demo"
            className="hidden text-[13px] font-medium text-white/50 transition-colors hover:text-white/90 md:block"
          >
            Live Demo
          </Link>
          <button className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98]">
            Get Started
          </button>
        </div>
      </nav>
    </motion.div>
  );
}

// ─── Animated Status Dot ───────────────────────────────────────────
function StatusDot({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2" style={{ color }}>
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ backgroundColor: color }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </span>
      <span className="text-[11px] font-medium text-white/40 tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

// ─── SDK Detection Animation ──────────────────────────────────────
function SDKDetector() {
  const [phase, setPhase] = useState<"idle" | "detecting" | "found">("idle");

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      while (mounted) {
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;
        setPhase("detecting");
        await new Promise((r) => setTimeout(r, 1500));
        if (!mounted) break;
        setPhase("found");
        await new Promise((r) => setTimeout(r, 3000));
        if (!mounted) break;
        setPhase("idle");
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/20 text-[10px] text-blue-400 font-bold">
            {'</>'}
          </div>
          <span className="text-xs font-medium text-white/60">GmLeads SDK</span>
        </div>
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-medium text-white/25 uppercase tracking-wider"
            >
              Waiting
            </motion.span>
          )}
          {phase === "detecting" && (
            <motion.span
              key="detecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-[10px] font-medium text-blue-400 uppercase tracking-wider"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Detecting
            </motion.span>
          )}
          {phase === "found" && (
            <motion.span
              key="found"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 text-[10px] font-medium text-green-400 uppercase tracking-wider"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Connected
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Visitor Identification Card ──────────────────────────────────
function VisitorCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    const h = setTimeout(() => setVisible(false), 5000);
    const r = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 8000);
    return () => {
      clearTimeout(t);
      clearTimeout(h);
      clearTimeout(r);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">
              AC
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Acme Corp</span>
                <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                  ICP 92
                </span>
              </div>
              <div className="mt-0.5 text-xs text-white/40">
                Enterprise SaaS · 500-1000 employees
              </div>
              <div className="mt-2 flex items-center gap-3 text-[11px] text-white/30">
                <span>Pricing page · 45s</span>
                <span>3 pages viewed</span>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-[10px] text-white/30 mb-1">
                  <span>Buying intent</span>
                  <span>High</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Slack Notification ───────────────────────────────────────────
function SlackNotification() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    const h = setTimeout(() => setVisible(false), 6000);
    const r = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 6000);
    }, 10000);
    return () => {
      clearTimeout(t);
      clearTimeout(h);
      clearTimeout(r);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#4A154B]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
                <path d="M5.042 15.166a2.52 2.52 0 0 1-2.52 2.52A2.52 2.52 0 0 1 0 15.166a2.52 2.52 0 0 1 2.52-2.52h2.522v2.52zM6.313 15.166a2.52 2.52 0 0 1 2.52-2.52 2.52 2.52 0 0 1 2.52 2.52v6.313a2.52 2.52 0 0 1-2.52 2.52 2.52 2.52 0 0 1-2.52-2.52v-6.313zM8.833 5.042a2.52 2.52 0 0 1-2.52-2.52A2.52 2.52 0 0 1 8.833 0a2.52 2.52 0 0 1 2.52 2.52v2.522H8.833zM8.833 6.313a2.52 2.52 0 0 1 2.52 2.52 2.52 2.52 0 0 1-2.52 2.52H2.52A2.52 2.52 0 0 1 0 8.833a2.52 2.52 0 0 1 2.52-2.52h6.313z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">#sales-leads</span>
                <span className="text-[10px] text-white/30">now</span>
              </div>
              <p className="mt-0.5 text-sm text-white/70">
                New high-intent lead from <span className="font-medium text-white">Acme Corp</span>
              </p>
              <div className="mt-1.5 flex items-center gap-2 text-[11px]">
                <span className="rounded-md bg-blue-500/15 px-1.5 py-0.5 text-blue-400">
                  Score: 92
                </span>
                <span className="text-white/30">Industry: Enterprise SaaS</span>
              </div>
              <div className="mt-2 flex gap-2">
                <button className="rounded-md border border-white/[0.06] px-3 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white">
                  View profile
                </button>
                <button className="rounded-md bg-blue-500 px-3 py-1 text-[11px] font-medium text-white transition-colors hover:bg-blue-600">
                  Assign to rep
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 opacity-[0.08]"
        style={{ background: "radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)" }}
      />

      <FloatingNav />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 pt-32 md:pt-40">
        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <StatusDot label="Live" color="#3b82f6" />
          <span className="text-white/[0.04]">·</span>
          <span className="text-[11px] font-medium text-white/30 tracking-wide uppercase">
            Now in public beta
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-4xl text-center text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Identify every{" "}
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            anonymous visitor
          </span>{" "}
          before they leave.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/50 md:text-xl"
        >
          GmLeads plugs into your website in 60 seconds and starts routing
          qualified leads to Slack — no forms, no friction, no manual work.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button className="group relative rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98]">
            Start Free Trial
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </button>
          <button className="rounded-full border border-white/[0.08] px-8 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/[0.15] hover:text-white/90">
            Watch Demo
          </button>
        </motion.div>

        {/* Product demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] shadow-2xl shadow-black/50">
            {/* Browser bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-full bg-white/[0.04] px-4 py-1">
                <svg className="h-3 w-3 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
                <span className="text-[11px] text-white/30">yourcompany.com</span>
              </div>
              <div className="w-8" />
            </div>
            {/* Demo cards */}
            <div className="space-y-3 p-4">
              <SDKDetector />
              <VisitorCard />
              <SlackNotification />
            </div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}