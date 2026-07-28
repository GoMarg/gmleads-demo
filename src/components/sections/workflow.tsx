"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { icon: "👤", title: "Visitor", subtitle: "Someone lands on your site", color: "blue" },
  { icon: "📦", title: "SDK", subtitle: "GmLeads initializes instantly", color: "purple" },
  { icon: "🎯", title: "Intent Detection", subtitle: "AI analyzes behavior", color: "blue" },
  { icon: "✅", title: "Lead Qualification", subtitle: "ICP scoring & enrichment", color: "purple" },
  { icon: "💬", title: "Slack", subtitle: "Lead routed to sales channel", color: "green" },
  { icon: "🔄", title: "CRM", subtitle: "Contact auto-created in CRM", color: "blue" },
];

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-black border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            What the SDK does
          </h2>
          <p className="mt-4 text-lg text-white/50">
            From anonymous visit to qualified lead — automatically.
          </p>
        </div>

        <div className="relative">
          {/* Animated lead particle */}
          <AnimatePresence>
            {activeStep < STEPS.length - 1 && (
              <motion.div
                key="particle"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
                style={{
                  top: `${(activeStep / (STEPS.length - 1)) * 100}%`,
                }}
              >
                <div className="h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connecting line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-transparent -translate-x-px" />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <motion.div
                    animate={{
                      scale: activeStep === i ? 1.02 : 1,
                      borderColor: activeStep === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                    }}
                    className="inline-block rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 transition-all max-w-sm"
                  >
                    <div className="text-2xl mb-3">{step.icon}</div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-white/50 mt-1">{step.subtitle}</p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{
                      scale: activeStep === i ? 1.5 : 1,
                      backgroundColor: activeStep === i ? "#3b82f6" : "#3b82f6",
                    }}
                    className="h-3 w-3 rounded-full bg-blue-500 ring-4 ring-black transition-all"
                  />
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}