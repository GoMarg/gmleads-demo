import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const FEATURES = [
  {
    title: "Company identification",
    body: "Resolve anonymous visitors to real companies from their IP — no cookies, no forms, nothing the visitor has to do.",
    icon: (
      <path d="M12 2 3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5Z" />
    ),
  },
  {
    title: "ICP scoring",
    body: "Every identified company is scored against your ideal-customer profile the moment they land — industry, size, and keywords you define.",
    icon: <path d="M3 3v18h18M7 15l4-6 3 3 5-8" />,
  },
  {
    title: "Real-time Slack alerts",
    body: "Qualified leads hit your team's Slack channel in seconds, with company, score, and page context — not a generic ping.",
    icon: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0" />,
  },
  {
    title: "Live chat & routing",
    body: "Visitors can message a rep directly from the widget. Conversations route to the right person's Slack DM automatically.",
    icon: <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    title: "Session replay",
    body: "See exactly which pages a lead viewed, in what order, before your rep ever picks up the conversation.",
    icon: <path d="M3 4h18v14H3zM3 8h18M8 4v4" />,
  },
  {
    title: "Lead routing",
    body: "Direct assignment, round robin, or a documented fallback rule — every qualified lead reaches the right rep automatically.",
    icon: <path d="M17 3 21 7l-4 4M21 7H9a4 4 0 0 0-4 4v0 M7 21 3 17l4-4M3 17h12a4 4 0 0 0 4-4v0" />,
  },
  {
    title: "CRM sync",
    body: "Qualified leads and booked meetings push straight into HubSpot — no manual data entry after the fact.",
    icon: <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />,
  },
  {
    title: "Booking, built in",
    body: "A visitor can grab time on a rep's calendar without ever leaving your site, straight from the widget.",
    icon: <path d="M3 4h18v17H3zM3 9h18M8 2v4M16 2v4M7 13h4M7 17h7" />,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Everything included</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            The whole pipeline, not just identification
          </h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
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
