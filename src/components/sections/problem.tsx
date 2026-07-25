import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const FACTS = [
  {
    stat: "95%+",
    label: "of website visitors leave without filling out a form",
  },
  {
    stat: "0",
    label: "of those visits show up anywhere in your CRM today",
  },
  {
    stat: "Days",
    label: "later, if ever, before sales even hears a deal was warm",
  },
];

export function Problem() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Most of your best leads never say hello.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            A director at your ideal-customer company visits your pricing
            page three times this week. Nobody on your team ever finds out.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-line bg-bg-raised p-8 text-center"
            >
              <div className="font-display text-4xl font-800 text-accent">{f.stat}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
