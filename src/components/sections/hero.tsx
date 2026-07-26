import Link from "next/link";
import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const ISSUES = [
  { id: "ENG-142", title: "Fix pagination on activity feed", priority: "high", label: "bug", assignee: "PR" },
  { id: "ENG-138", title: "Ship roadmap read-only share links", priority: "medium", label: "feature", assignee: "TH" },
  { id: "ENG-129", title: "Cycle burndown chart flickers on resize", priority: "low", label: "bug", assignee: "AW" },
  { id: "ENG-121", title: "GitHub sync: close on squash-merge", priority: "high", label: "integration", assignee: "PR" },
];

const PRIORITY_COLOR: Record<string, string> = {
  high: "bg-accent",
  medium: "bg-accent-2",
  low: "bg-ink-faint",
};

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
          <Eyebrow>Now in v2</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-xl font-display text-4xl font-800 leading-[1.05] md:text-6xl lg:mx-0">
            Project management that keeps up with how fast you ship.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-soft lg:mx-0">
            Issue tracking, sprints, and roadmaps built for engineering
            teams &mdash; fast enough that using it never feels like a tax
            on shipping.
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
                Cycle 14 &middot; Engineering
              </span>
            </div>
            <div className="border-b border-line-soft px-4 py-3">
              <div className="flex items-center justify-between text-xs text-ink-faint">
                <span>68% complete</span>
                <span>6 days left</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-inset">
                <div className="h-full w-[68%] rounded-full bg-accent" />
              </div>
            </div>
            <ul className="divide-y divide-line-soft">
              {ISSUES.map((issue) => (
                <li key={issue.id} className="flex items-center gap-3 px-4 py-3.5">
                  <span
                    aria-hidden
                    className={`h-2 w-2 shrink-0 rounded-full ${PRIORITY_COLOR[issue.priority]}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-ink">{issue.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-ink-faint">
                      <span className="font-mono">{issue.id}</span>
                      <span className="rounded-full bg-bg-inset px-2 py-0.5">
                        {issue.label}
                      </span>
                    </div>
                  </div>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[10px] font-semibold text-accent">
                    {issue.assignee}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
