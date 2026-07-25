import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const FEATURES = [
  {
    title: "Issue tracking that stays out of your way",
    body: "Create, triage, and close issues in seconds. Keyboard-first, no five-click forms.",
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  },
  {
    title: "Sprints that plan themselves",
    body: "Cycle planning pulls from your backlog automatically, weighted by priority and team capacity.",
    icon: <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />,
  },
  {
    title: "Roadmaps stakeholders actually read",
    body: "A live, filterable timeline — not a quarterly slide deck that's out of date by Tuesday.",
    icon: <path d="M3 3v18h18M7 15l4-6 3 3 5-8" />,
  },
  {
    title: "Ships with your existing stack",
    body: "GitHub, GitLab, Slack, and Figma sync bidirectionally. Close an issue from a commit message.",
    icon: <path d="M17 3 21 7l-4 4M21 7H9a4 4 0 0 0-4 4v0 M7 21 3 17l4-4M3 17h12a4 4 0 0 0 4-4v0" />,
  },
  {
    title: "Automation for the busywork",
    body: "Auto-assign, auto-label, auto-close stale issues. Rules you write once, in plain language.",
    icon: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  },
  {
    title: "Analytics that inform, not decorate",
    body: "Cycle time, throughput, and bottlenecks — the numbers that actually change how you plan.",
    icon: <path d="M3 3v18h18M8 17V9M13 17V5M18 17v-7" />,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Product</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Everything your team needs. Nothing it doesn&apos;t.
          </h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-bg p-7">
              <svg
                className="h-6 w-6 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {f.icon}
              </svg>
              <h3 className="mt-4 font-display text-base font-700">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
