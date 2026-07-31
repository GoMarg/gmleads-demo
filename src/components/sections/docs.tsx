"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TABS = ["SDK Methods", "Events", "Webhooks", "API Reference"];
const TAB_CONTENT: Record<string, { description: string; code: string }> = {
  "SDK Methods": {
    description: "Initialize the SDK and manage the widget lifecycle with a simple, typed API.",
    code: `GmLeads.init({ key: 'gml_ccf85773339f942de0d7f68e406b713e9f52dda09d22f135' })
GmLeads.destroy()`,
  },
  "Events": {
    description: "Listen to real-time events as leads are captured and scored.",
    code: `// Lead captured
GmLeads.on('lead', (data) => {
  console.log(data.company, data.icpScore)
})

// Visitor identified
GmLeads.on('visitor', (data) => {
  console.log(data.page, data.duration)
})

// Intent score updated
GmLeads.on('score', (data) => {
  console.log(data.value, data.label)
})`,
  },
  "Webhooks": {
    description: "Receive HTTP POST requests when events occur in your pipeline.",
    code: `POST /webhooks/lead
{
  "event": "lead.captured",
  "data": {
    "company": "Acme Corp",
    "domain": "acme.com",
    "icp_score": 92,
    "email": "john@acme.com"
  }
}

POST /webhooks/visitor
{
  "event": "visitor.identified",
  "data": {
    "ip": "203.0.113.42",
    "page": "/pricing",
    "duration": 45
  }
}`,
  },
  "API Reference": {
    description: "RESTful endpoints for custom integrations and data retrieval.",
    code: `POST /v1/identify
Content-Type: application/json
{ "domain": "acme.com" }

→ { "visitor": { "company": "Acme Corp", "icp_score": 92 } }

POST /v1/lead
{ "visitor_id": "vis_123", "email": "john@acme.com" }

→ { "lead": { "id": "lead_456", "status": "qualified" } }

GET /v1/pipeline

→ { "total": 1234, "qualified": 456, "meetings": 89 }`,
  },
};

export function DocsSection() {
  const [tab, setTab] = useState("SDK Methods");

  return (
    <section id="docs" className="py-32 bg-black border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Developer-first from day one
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Clean API, typed responses, webhooks you can trust.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                  tab === t
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/50 hover:text-white/90 hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Description */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="text-white/80 leading-relaxed">
                {TAB_CONTENT[tab].description}
              </p>
            </div>

            {/* Code */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3">
                <span className="text-xs text-white/40 uppercase tracking-wider">Example</span>
                <button
                  onClick={() => navigator.clipboard.writeText(TAB_CONTENT[tab].code)}
                  className="text-xs text-white/50 hover:text-white/90 transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed text-white/80 font-mono whitespace-pre">
                  <code>{TAB_CONTENT[tab].code}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}