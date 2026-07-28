"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FRAMEWORKS = ["Next.js", "React", "HTML", "Vue"] as const;
type Framework = typeof FRAMEWORKS[number];

const DEMO_KEY = "gml_ccf85773339f942de0d7f68e406b713e9f52dda09d22f135";

const CODE: Record<Framework, string> = {
  "Next.js": `# Install
npm install @gmleads/sdk

# .env.local
NEXT_PUBLIC_GMLEADS_KEY=${DEMO_KEY}

# app/layout.tsx
import { GmLeads } from '@gmleads/sdk'

GmLeads.init({
  key: process.env.NEXT_PUBLIC_GMLEADS_KEY
})`,
  "React": `# Install
npm install @gmleads/sdk

# App.tsx
import { GmLeads } from '@gmleads/sdk'

function App() {
  useEffect(() => {
    GmLeads.init({ key: '${DEMO_KEY}' })
  }, [])
  return <YourApp />
}`,
  "HTML": `<!-- Add to your <head> -->
<script
  src="https://gmleads-widget-production.pages.dev/widget.js"
  data-key="${DEMO_KEY}"
  async
></script>`,
  "Vue": `# Install
npm install @gmleads/sdk

# main.ts
import { createApp } from 'vue'
import { GmLeads } from '@gmleads/sdk'
import App from './App.vue'

const app = createApp(App)
app.use(GmLeads, { key: '${DEMO_KEY}' })
app.mount('#app')`
};

export function SDKSection() {
  const [framework, setFramework] = useState<Framework>("Next.js");
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [sdkConnected, setSdkConnected] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE[framework]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Terminal typing animation
  useEffect(() => {
    const text = "> GmLeads SDK detected — installation verified";
    let i = 0;
    setTerminalText("");
    setShowSuccess(false);
    const interval = setInterval(() => {
      if (i < text.length) {
        setTerminalText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setShowSuccess(true);
        setSdkConnected(true);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [framework]);

  return (
    <section id="sdk" className="py-32 bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Install in under 60 seconds
          </h2>
          <p className="mt-4 text-lg text-white/50">
            One SDK. All major frameworks. Drop-in setup.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Code installer */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <div className="flex items-center gap-1">
                {FRAMEWORKS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFramework(f)}
                    className={`px-4 py-2 text-sm rounded-lg transition-all ${
                      framework === f
                        ? "bg-white text-black font-medium"
                        : "text-white/50 hover:text-white/90"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCopy}
                className="text-sm text-white/50 hover:text-white/90 transition-colors"
              >
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>

            {/* Code */}
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm leading-relaxed text-white/80 font-mono whitespace-pre">
                <code>{CODE[framework]}</code>
              </pre>
            </div>

            {/* Terminal */}
            <div className="border-t border-white/[0.06] px-6 py-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-400 font-mono">{terminalText}</span>
                {showSuccess && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-400"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </div>
          </div>

          {/* API Key card */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Public Demo Workspace</h3>
              <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                PRODUCTION
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-white/40 mb-1">Environment</div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-white">Production</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-white/40 mb-1">Purpose</div>
                <div className="text-sm text-white/80">Safe to use for evaluating the SDK</div>
              </div>

              <div>
                <div className="text-xs text-white/40 mb-1">API Key</div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-white/80 font-mono bg-white/5 rounded px-2 py-1 break-all">
                    {DEMO_KEY}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(DEMO_KEY);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-xs text-white/50 hover:text-white/90 shrink-0"
                  >
                    {copied ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 w-full rounded-full bg-white py-2.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Generate My API Key
            </button>
          </div>
        </div>

        {/* Generate modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-md w-full rounded-2xl border border-white/[0.06] bg-black p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  Get your API key
                </h3>
                <p className="text-white/50 mb-6">
                  Four simple steps to start capturing leads.
                </p>

                <div className="space-y-4">
                  {[
                    { num: "1", title: "Create workspace", desc: "Set up your team and Slack channel" },
                    { num: "2", title: "Generate SDK key", desc: "One-click key generation" },
                    { num: "3", title: "Install SDK", desc: "Copy-paste into your app" },
                    { num: "4", title: "Start receiving leads", desc: "Watch leads flow into Slack" },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">
                        {step.num}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{step.title}</div>
                        <div className="text-xs text-white/50">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="mt-8 w-full rounded-full border border-white/10 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white/90"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}