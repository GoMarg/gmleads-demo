import { Container } from "../container";

// Ashlar is an invented company for this demo — these are its (equally
// invented) customers, consistent with that fiction. Not a claim about
// GmLeads' real customers.
const LOGOS = ["Fernway", "Northloop", "Voxel", "Brightcast", "Kindred Labs", "Parallax"];

export function CustomerLogos() {
  return (
    <section className="border-y border-line-soft py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
            Trusted by engineering teams at
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {LOGOS.map((name) => (
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
