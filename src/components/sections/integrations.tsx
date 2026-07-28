"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTEGRATIONS = [
  {
    name: "Slack",
    href: "https://slack.com",
    svg: (
      <path
        d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.315A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.52v-6.315zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.164 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 9.921a2.528 2.528 0 0 1 2.521 2.522 2.528 2.528 0 0 1-2.521 2.522 2.528 2.528 0 0 1-2.521-2.522v-2.522h2.521zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.315A2.528 2.528 0 0 1 24 15.164a2.528 2.528 0 0 1-2.522 2.521h-6.312z"
        fill="currentColor"
      />
    ),
    description: "Route qualified leads directly to your sales channel with rich context, company data, and intent signals.",
    dataSent: "Company name, domain, ICP score, visitor email, page URL, intent signals",
    eventsReceived: "lead.captured, visitor.identified, score.updated",
    difficulty: "Easy",
    docs: "https://docs.gmleads.com/slack",
  },
  {
    name: "HubSpot",
    href: "https://hubspot.com",
    svg: (
      <path
        d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.993 2.198 2.198 0 0 0-1.267-1.993L13.79.49a2.198 2.198 0 0 0-2.198 0L9.09 1.098a2.198 2.198 0 0 0-1.267 1.993v2.846L3.59 7.93a2.198 2.198 0 0 0-1.267 1.993v4.424a2.198 2.198 0 0 0 1.267 1.993l4.502 1.608a2.198 2.198 0 0 0 2.198 0l4.502-1.608a2.198 2.198 0 0 0 1.267-1.993V9.923a2.198 2.198 0 0 0-1.267-1.993zm-1.267 4.424l-4.502 1.608a.746.746 0 0 1-.746 0L6.147 12.354V9.923l4.502-1.608a.746.746 0 0 1 .746 0l4.502 1.608v2.431zM13.79 2.098l2.198.784v2.431l-2.198.784-2.198-.784V2.882l2.198-.784zM6.147 9.923l2.198-.784 2.198.784v2.431l-2.198.784-2.198-.784V9.923zM3.59 9.923v2.431l2.198.784 2.198-.784V9.923L3.59 9.923zm12.577 2.431v2.431l-2.198.784-2.198-.784V12.354l2.198-.784 2.198.784zM6.147 12.354l2.198.784 2.198-.784v2.431l-2.198.784-2.198-.784v-2.431z"
        fill="currentColor"
      />
    ),
    description: "Auto-create contacts and deals in HubSpot CRM with enriched company data and lead scoring.",
    dataSent: "Contact info, company name, deal value, lead score, custom properties",
    eventsReceived: "contact.created, deal.created, property_changed",
    difficulty: "Easy",
    docs: "https://docs.gmleads.com/hubspot",
  },
  {
    name: "Salesforce",
    href: "https://salesforce.com",
    svg: (
      <path
        d="M13.404 2.063c-1.625 0-2.86.56-3.74 1.264a5.96 5.96 0 0 0-1.82 2.24c-.39.84-.59 1.76-.59 2.76 0 .88.15 1.72.44 2.5.29.78.72 1.46 1.27 2.04.55.58 1.21 1.04 1.98 1.38.77.34 1.63.51 2.58.51.88 0 1.68-.13 2.4-.39.72-.26 1.33-.63 1.82-1.1.49-.47.87-1.03 1.14-1.68.27-.65.41-1.36.41-2.14 0-.88-.15-1.72-.44-2.5-.29-.78-.72-1.46-1.27-2.04-.55-.58-1.21-1.04-1.98-1.38-.77-.34-1.63-.51-2.58-.51zm0 1.5c.74 0 1.39.2 1.95.6.56.4 1 .99 1.26 1.49.17.5.26 1.04.26 1.62 0 .58-.09 1.12-.26 1.62-.17.5-.42.93-.76 1.29-.34.36-.76.64-1.26.84-.5.2-1.08.3-1.73.3-.74 0-1.39-.2-1.95-.6-.56-.4-1-.99-1.26-1.49-.17-.5-.26-1.04-.26-1.62 0-.58.09-1.12.26-1.62.17-.5.42-.93.76-1.29.34-.36.76-.64 1.26-.84.5-.2 1.08-.3 1.73-.3zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5s10.5 4.701 10.5 10.5-4.701 10.5-10.5 10.5z"
        fill="currentColor"
      />
    ),
    description: "Sync leads to Salesforce with custom objects, lead sources, and automated follow-up tasks.",
    dataSent: "Lead info, account name, opportunity data, custom fields, lead source",
    eventsReceived: "lead.created, task.created, record.updated",
    difficulty: "Medium",
    docs: "https://docs.gmleads.com/salesforce",
  },
  {
    name: "Zapier",
    href: "https://zapier.com",
    svg: (
      <path
        d="M24 12L18 1.5H6L0 12l6 10.5h12L24 12zm-5.85 1.26L12 21.75l-6.15-8.49L12 3.75l6.15 8.51zM12 5.25l-3.15 4.35L12 14.25l3.15-4.35L12 5.25z"
        fill="currentColor"
      />
    ),
    description: "Trigger 5,000+ app workflows automatically when a lead is captured or scored.",
    dataSent: "All lead data, custom fields, event payload",
    eventsReceived: "All GmLeads events",
    difficulty: "Easy",
    docs: "https://docs.gmleads.com/zapier",
  },
  {
    name: "Webhooks",
    href: "#",
    svg: (
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
        fill="currentColor"
      />
    ),
    description: "Send real-time lead events to any endpoint with retries, signatures, and delivery guarantees.",
    dataSent: "Full event payload with HMAC signature",
    eventsReceived: "All events via HTTP POST",
    difficulty: "Medium",
    docs: "https://docs.gmleads.com/webhooks",
  },
  {
    name: "Notion",
    href: "https://notion.so",
    svg: (
      <path
        d="M4.459 4.208c.746.606 1.026.93 1.026 1.572v9.44c0 .643-.28.966-1.026 1.572L0 18.361V5.639l4.459-1.431zM16.541 4.208c-.746.606-1.026.93-1.026 1.572v9.44c0 .643.28.966 1.026 1.572L24 18.361V5.639l-7.459-1.431zM7.974 14.5l2.79 3.26 2.79-3.26h-5.58zM16.026 9.5l-2.79 3.26-2.79-3.26h5.58z"
        fill="currentColor"
      />
    ),
    description: "Log leads and visitor data directly into Notion databases for team collaboration.",
    dataSent: "Lead info, company data, visitor attributes",
    eventsReceived: "lead.captured, visitor.identified",
    difficulty: "Easy",
    docs: "https://docs.gmleads.com/notion",
  },
  {
    name: "Airtable",
    href: "https://airtable.com",
    svg: (
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    description: "Push qualified leads into Airtable bases with custom fields and views.",
    dataSent: "All lead fields, custom properties",
    eventsReceived: "lead.captured, score.updated",
    difficulty: "Easy",
    docs: "https://docs.gmleads.com/airtable",
  },
  {
    name: "Pipedrive",
    href: "https://pipedrive.com",
    svg: (
      <path
        d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.82l7 3.5v7.36l-7-3.5V9.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"
        fill="currentColor"
      />
    ),
    description: "Add deals and contacts to Pipedrive pipelines with automatic stage assignment.",
    dataSent: "Deal info, contact details, organization, value",
    eventsReceived: "deal.created, person.added",
    difficulty: "Easy",
    docs: "https://docs.gmleads.com/pipedrive",
  },
];

export function IntegrationsSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="integrations" className="py-32 bg-black border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Built for your stack
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Connects to the tools you already use.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INTEGRATIONS.map((int, i) => (
            <motion.button
              key={int.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setSelected(int.name)}
              className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/20 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center text-white/80 group-hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  {int.svg}
                </svg>
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                {int.name}
              </span>
              <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
            </motion.button>
          ))}
        </div>

        {/* Details panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              {(() => {
                const int = INTEGRATIONS.find((i) => i.name === selected);
                if (!int) return null;
                return (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{int.name}</h3>
                      <p className="text-sm text-white/70 mb-4">{int.description}</p>
                      <a
                        href={int.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        View documentation →
                      </a>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-white/40 mb-1">Data sent</div>
                        <div className="text-sm text-white/80">{int.dataSent}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">Events received</div>
                        <div className="text-sm text-white/80 font-mono">{int.eventsReceived}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">Setup difficulty</div>
                        <div className="text-sm text-white/80">{int.difficulty}</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <button
                onClick={() => setSelected(null)}
                className="mt-4 text-sm text-white/50 hover:text-white/90"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}