"use client";

import { useState } from "react";
import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

interface DeveloperGuideProps {
  embedKey: string;
}

const FRAMEWORKS = [
  { name: "HTML", icon: "{" },
  { name: "React", icon: "\u269B" },
  { name: "Next.js", icon: "\u25B2" },
  { name: "Vue", icon: "\u25BC" },
];

export function DeveloperGuide({ embedKey }: DeveloperGuideProps) {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const snippet = `<script
  src="https://gmleads-widget-production.pages.dev/widget.js"
  data-key="${embedKey}"
></script>`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setActiveStep(2);
      // Progress through remaining steps for visual effect
      setTimeout(() => setActiveStep(3), 1000);
      setTimeout(() => setActiveStep(4), 2500);
      setTimeout(() => setCopied(false), 5000);
    } catch {
      // Clipboard API may be unavailable
    }
  }

  const STEPS = [
    { label: "Copy Script", done: activeStep > 1 },
    { label: "Paste Into Website", done: activeStep > 2 },
    { label: "Website Connected", done: activeStep > 3 },
    { label: "Widget Live", done: activeStep > 3 },
  ];

  return (
    <section id="developer-guide" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Developer Guide</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            One line of code.
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Copy the script below and paste it just before your closing
            {" "}<code className="rounded bg-bg-inset px-1.5 py-0.5 text-sm font-mono text-ink">
              {"</body>"}
            </code>{" "}
            tag. That&apos;s it.
          </p>
        </div>

        {/* Installation progress indicator */}
        <div className="mx-auto mt-12 max-w-lg">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    step.done
                      ? "border-accent bg-accent"
                      : i === activeStep
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-bg"
                  }`}
                >
                  {step.done ? (
                    <svg className="h-3.5 w-3.5 text-accent-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <span className={`text-xs font-semibold ${i === activeStep ? "text-accent" : "text-ink-faint"}`}>
                      {i + 1}
                    </span>
                  )}
                </div>
                <span className={`mt-1.5 text-[10px] font-medium ${step.done ? "text-accent" : i === activeStep ? "text-ink" : "text-ink-faint"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 relative">
            <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-line-soft">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Snippet card */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-line-soft px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                <span className="ml-3 text-xs text-ink-faint font-mono">
                  index.html
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
              >
                {copied ? (
                  <>
                    <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Syntax-highlighted code */}
            <pre className="overflow-x-auto px-5 py-6 text-left font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-ink-faint">{'<'}</span>
                <span className="text-accent">script</span>
                {'\n  '}
                <span className="text-ink-faint">src</span>
                <span className="text-ink-faint">=</span>
                <span className="text-accent-2">{'"https://gmleads-widget-production.pages.dev/widget.js"'}</span>
                {'\n  '}
                <span className="text-ink-faint">data-key</span>
                <span className="text-ink-faint">=</span>
                <span className="text-accent-2">{`"${embedKey}"`}</span>
                {'\n'}
                <span className="text-ink-faint">{'></'}</span>
                <span className="text-accent">script</span>
                <span className="text-ink-faint">{'>'}</span>
              </code>
            </pre>
          </div>

          {/* Framework badges */}
          <div className="mt-6">
            <p className="text-center text-xs text-ink-faint mb-3">
              Works with every framework
            </p>
            <div className="flex items-center justify-center gap-2">
              {FRAMEWORKS.map((fw) => (
                <div
                  key={fw.name}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-bg-raised px-3 py-1.5"
                >
                  <span className="text-xs">{fw.icon}</span>
                  <span className="text-xs text-ink-soft">{fw.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Install info */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-ink-faint">
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Install time: {String.fromCharCode(60)} 2 minutes
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              All modern browsers
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


