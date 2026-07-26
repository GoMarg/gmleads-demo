"use client";

import { useEffect, useState } from "react";
import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const SNIPPET = `<script
  src="https://gmleads-widget-production.pages.dev/widget.js"
  data-key="your-embed-key"
></script>`;

const CHECKLIST = [
  "Visitor session created",
  "Company resolved",
  "Slack notifications enabled",
  "Dashboard starts filling",
  "CRM ready",
  "Live activity",
];

const STEP_MS = 650;
const PAUSE_MS = 2600;

// Deliberately no arrows or pipeline diagram here — just items quietly
// turning green in sequence, looped. That reads as "this is already
// working" rather than "here's how it works."
function useSequentialReveal(count: number) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    function step(i: number) {
      if (cancelled) return;
      setRevealed(i);
      if (i < count) {
        timer = setTimeout(() => step(i + 1), STEP_MS);
      } else {
        timer = setTimeout(() => step(0), PAUSE_MS);
      }
    }

    timer = setTimeout(() => step(1), STEP_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [count]);

  return revealed;
}

export function Install() {
  const [copied, setCopied] = useState(false);
  const revealed = useSequentialReveal(CHECKLIST.length);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (permissions, insecure context) —
      // the snippet is still selectable by hand, so this is a soft failure.
    }
  }

  return (
    <section className="py-24 md:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div className="min-w-0">
          <Eyebrow>Installation</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-5xl">
            One line of code.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Everything else happens automatically.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-bg-raised shadow-2xl">
            <div className="flex items-center justify-between border-b border-line-soft px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                <span className="ml-3 text-xs text-ink-faint">index.html</span>
              </div>
              <button
                onClick={handleCopy}
                className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto px-5 py-6 text-left font-mono text-[13px] leading-relaxed text-ink">
              <code>{SNIPPET}</code>
            </pre>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-line bg-bg-raised p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
            What happens after installation
          </p>
          <ul className="mt-5 space-y-2.5">
            {CHECKLIST.map((label, i) => {
              const done = i < revealed;
              return (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-line-soft bg-bg px-4 py-3"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      done ? "border-accent bg-accent" : "border-line bg-transparent"
                    }`}
                  >
                    {done && (
                      <svg
                        className="h-3 w-3 text-accent-ink"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      done ? "text-ink" : "text-ink-faint"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
