import Link from "next/link";
import { Container } from "../container";

export function Hero() {
  return (
    <section id="product" className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-30"
        style={{
          background:
            "radial-gradient(560px 320px at 50% -8%, var(--accent-soft), transparent 70%)",
        }}
      />
      <Container className="flex flex-col items-center text-center">
        <h1 className="max-w-3xl font-display text-4xl font-800 leading-[1.05] md:text-6xl">
          Ship faster.
          <br />
          Argue about the roadmap less.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          Ashlar is the issue tracker, sprint board, and release workflow
          built for engineering teams who&apos;d rather be shipping than
          managing tickets.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#features"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
          >
            Start for free
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink-faint"
          >
            Read the docs
          </Link>
        </div>
        <p className="mt-5 text-xs text-ink-faint">
          No credit card required. Free for teams under 10.
        </p>
      </Container>
    </section>
  );
}
