import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const STEPS = [
  {
    n: "01",
    title: "A visitor lands on your site",
    body: "Our widget loads quietly in the corner — no cookie banners, no forms, nothing for the visitor to notice or fill out.",
  },
  {
    n: "02",
    title: "We identify the company",
    body: "Their IP is resolved to a real company through our identify pipeline, then scored against your ideal-customer profile — industry, size, and the keywords that actually matter to you.",
  },
  {
    n: "03",
    title: "Your team gets alerted instantly",
    body: "If they qualify, a Slack message lands in your alerts channel within seconds — company, fit score, and pages viewed, not a vague \"someone's on your site.\"",
  },
  {
    n: "04",
    title: "The visitor can chat or book, right there",
    body: "They can start a conversation or grab time on a rep's calendar without leaving the page. Everything routes to the right person automatically.",
  },
  {
    n: "05",
    title: "It's all in your dashboard and CRM",
    body: "Session replay, funnel analytics, and response-time tracking on your side. A synced activity record in HubSpot on theirs.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            From anonymous visitor to Slack alert in under a minute
          </h2>
        </div>
        <ol className="mx-auto mt-16 max-w-3xl">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className={`flex gap-6 py-8 ${i !== STEPS.length - 1 ? "border-b border-line-soft" : ""}`}
            >
              <span className="font-display text-2xl font-800 text-ink-faint">{s.n}</span>
              <div>
                <h3 className="font-display text-xl font-700">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
