import Link from "next/link";
import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const STEPS = [
  {
    label: "Visitor arrives",
    detail: "IP 203.0.113.42 seen on /pricing",
    tag: "Identifying…",
    icon: (
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 0c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10M12 2C9.5 4.7 8 8.2 8 12s1.5 7.3 4 10M2.5 9h19M2.5 15h19" />
    ),
  },
  {
    label: "Company resolved",
    detail: "Acme Inc. — SaaS, 340 employees",
    tag: "ICP score 92",
    icon: (
      <path d="M3 21h18M6 21V7l6-4 6 4v14M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1" />
    ),
  },
  {
    label: "Slack alert sent",
    detail: "DM to #sales-leads: “Acme Inc. is on pricing right now”",
    tag: "Routed instantly",
    icon: (
      <path d="M9 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2V5a2 2 0 0 0-2-2Zm0 6H5a2 2 0 1 0 0 4h4v-4Zm6-6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2V5a2 2 0 0 1 2-2ZM9 15H7a2 2 0 1 0 0 4h2v-4Zm6 0h4a2 2 0 1 1 0 4h-4v-4Zm0-6h2a2 2 0 1 0 0-4h-2v4Zm-6 0v4h4V9Z" />
    ),
  },
  {
    label: "Lead captured",
    detail: "jane@acme.com added to your pipeline",
    tag: "No form filled",
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  },
];

export function Hero() {
  return (
    <section id="product" className="relative overflow-hidden pt-24 pb-24 md:pt-32 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-30"
        style={{
          background:
            "radial-gradient(560px 320px at 50% -8%, var(--accent-soft), transparent 70%)",
        }}
      />
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div className="text-center lg:text-left">
          <Eyebrow>Live on this page</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-xl font-display text-4xl font-800 leading-[1.05] md:text-6xl lg:mx-0">
            You just got identified.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-soft lg:mx-0">
            Ashlar runs GmLeads on this exact page. The moment you landed
            here, it resolved your IP to a company, scored it against our
            ICP, and could have pinged our Slack &mdash; before you filled out
            a single form.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="/pricing"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
            >
              Start for free
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink-faint"
            >
              Read the docs
            </Link>
          </div>
          <p className="mx-auto mt-5 flex max-w-lg items-center justify-center gap-2 text-xs text-ink-faint lg:mx-0 lg:justify-start">
            <span aria-hidden>&#8594;</span>
            That bubble in the bottom-right corner isn&apos;t a screenshot.
            It&apos;s the real widget &mdash; click it.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-60 blur-2xl"
            style={{ background: "var(--accent-soft)" }}
          />
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-line-soft px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
              <span className="ml-3 text-xs text-ink-faint">
                gmleads &middot; identification pipeline
              </span>
            </div>
            <ol className="divide-y divide-line-soft">
              {STEPS.map((step, i) => (
                <li key={step.label} className="flex items-start gap-3 px-4 py-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {step.icon}
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-700 text-ink">{step.label}</p>
                      <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                        {step.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                      {step.detail}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className="sr-only">
                      then
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-4 text-center text-xs text-ink-faint">
            Illustrative &mdash; your real data, not a recording.
          </p>
        </div>
      </Container>
    </section>
  );
}
