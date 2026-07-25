import { Container } from "../container";

// Deliberately not a "trusted by" customer-logo bar — this product doesn't
// have public customers yet, and faking one would be dishonest. What's
// real: the integrations already built and shipped.
const INTEGRATIONS = ["Slack", "HubSpot", "Leadfeeder", "RB2B"];

export function IntegratesWith() {
  return (
    <section className="border-y border-line-soft py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">
            Plugs into what you already use
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {INTEGRATIONS.map((name) => (
              <li
                key={name}
                className="font-display text-lg font-700 text-ink-soft transition-colors hover:text-ink"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
