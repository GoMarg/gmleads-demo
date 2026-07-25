import Link from "next/link";
import { Container } from "../container";

export function Cta() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-raised px-8 py-16 text-center md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-50"
            style={{
              background:
                "radial-gradient(480px 260px at 50% 0%, var(--accent-soft), transparent 70%)",
            }}
          />
          <h2 className="mx-auto max-w-xl font-display text-3xl font-800 leading-tight md:text-5xl">
            Your team could be shipping on Ashlar by tomorrow morning.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-ink-soft">
            Free for teams under 10. No credit card, no sales call required
            to get started.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#features"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
            >
              Start for free
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink-faint"
            >
              See pricing
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
