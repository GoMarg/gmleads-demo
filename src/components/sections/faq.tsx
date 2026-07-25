import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const FAQS = [
  {
    q: "Do I need to change anything on my website?",
    a: "No. You add one script tag. It renders in an isolated shadow DOM, so it can't be affected by your site's styles and can't affect them either.",
  },
  {
    q: "Does this identify individual people, or just companies?",
    a: "Companies only. We deliberately never resolve a visitor to a named individual — no name, no personal email, no LinkedIn profile. That's a hard line in how the identify pipeline is built, not a setting you can turn off.",
  },
  {
    q: "Is this GDPR/CCPA compliant?",
    a: "Visitors in a gated jurisdiction (EU, UK, and California today) are shown a consent gate before any identification happens, and it fails closed — if we can't tell where someone is, we treat them as gated by default.",
  },
  {
    q: "How fast are the Slack alerts, really?",
    a: "Seconds from a qualifying visit to a message in your channel, not minutes and not a daily digest — that's the entire point.",
  },
  {
    q: "I already use a tool like this — can I switch providers?",
    a: "Identification is built behind a provider-agnostic interface specifically so this isn't a one-way door. Swapping providers is a configuration change, not a rebuild.",
  },
  {
    q: "What happens to visitors who never show up as a match?",
    a: "Nothing is fabricated. If we can't confidently identify a company, the session is honestly marked as unknown rather than guessed at.",
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
