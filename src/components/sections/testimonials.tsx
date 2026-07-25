import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

// Fictional quotes for a fictional company, consistent with the rest of
// Ashlar's invented identity — not a claim about anything real.
const QUOTES = [
  {
    quote:
      "We moved off three tools onto Ashlar in an afternoon. Cycle time dropped almost immediately — mostly because people stopped avoiding the tracker.",
    name: "Priya Raman",
    role: "Head of Engineering, Fernway",
  },
  {
    quote:
      "The roadmap view is the first one our CEO has actually opened voluntarily. That alone paid for the upgrade.",
    name: "Tomás Herrera",
    role: "VP Product, Northloop",
  },
  {
    quote:
      "Automation rules replaced an entire afternoon of triage every Monday. It's the most boring feature and the one I'd fight hardest to keep.",
    name: "Ada Whitfield",
    role: "Engineering Manager, Voxel",
  },
];

export function Testimonials() {
  return (
    <section id="customers" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Customers</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Teams that switched, and stayed
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {QUOTES.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-line bg-bg-raised p-7"
            >
              <blockquote className="text-[15px] leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-semibold text-ink">{t.name}</div>
                <div className="text-ink-faint">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
