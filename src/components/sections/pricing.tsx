import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-xl rounded-2xl border border-line bg-bg-raised p-10 text-center md:p-16">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Coming soon
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            We&apos;re still finalizing plans while we work with early
            customers. If you want early access or to help shape pricing,
            reach out directly.
          </p>
          <a
            href="mailto:hello@gomarg.com"
            className="mt-7 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-85"
          >
            Get in touch
          </a>
        </div>
      </Container>
    </section>
  );
}
