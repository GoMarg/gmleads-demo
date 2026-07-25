import Link from "next/link";
import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] opacity-40"
        style={{
          background:
            "radial-gradient(560px 320px at 50% -10%, var(--accent-soft), transparent 70%)",
        }}
      />
      <Container className="flex flex-col items-center text-center">
        <Eyebrow>Live product demo</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-800 leading-[1.05] md:text-6xl">
          Know who&apos;s on your site.
          <br />
          <span className="text-accent">Before they leave.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          GmLeads identifies the companies visiting your website, scores them
          against your ideal customer profile, and alerts your sales team in
          Slack — in real time. No forms required.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#live-demo"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
          >
            Try the live demo below
          </Link>
          <Link
            href="#how-it-works"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink-faint"
          >
            How it works
          </Link>
        </div>
        <p className="mt-5 text-xs text-ink-faint">
          The widget on this page is our real production build. Nothing here is staged.
        </p>
      </Container>
    </section>
  );
}
