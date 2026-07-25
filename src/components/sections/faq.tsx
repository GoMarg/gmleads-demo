import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const FAQS = [
  {
    q: "Can I migrate from Jira or Linear?",
    a: "Yes — importers for both preserve issue history, comments, and labels. Most teams are fully migrated in under an hour.",
  },
  {
    q: "Does Ashlar work for non-engineering teams?",
    a: "It's built for engineering workflows specifically — sprints, cycle time, code integrations. Support and design teams tend to be happier with something built for their own workflow.",
  },
  {
    q: "Is there a limit on issues or projects?",
    a: "No. Every plan, including free, has unlimited issues and projects. We charge per active teammate, not per ticket.",
  },
  {
    q: "What happens to our data if we cancel?",
    a: "You can export everything — issues, comments, history — at any time, from any plan, with no waiting period.",
  },
  {
    q: "Do you have an API?",
    a: "A full REST and webhook API, documented alongside everything else. See the docs for authentication and rate limits.",
  },
  {
    q: "Is there a self-hosted option?",
    a: "Not today. Ashlar is cloud-only, which is most of how we keep sync and integrations reliable without you managing infrastructure.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Good to know
          </h2>
        </div>
        <div className="mx-auto mt-14 max-w-2xl divide-y divide-line-soft border-y border-line-soft">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-700 marker:content-none">
                {item.q}
                <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-45">
                  <PlusIcon />
                </span>
              </summary>
              <p className="mt-3 pr-8 leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
