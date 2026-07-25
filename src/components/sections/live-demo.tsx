import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

export function LiveDemo() {
  return (
    <section id="live-demo" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>This is not a mockup</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Look for the button in the corner of your screen
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            That&apos;s the real GmLeads widget — the exact script every
            customer embeds, talking to our real production backend right
            now. Click it, send a message, or grab a time on the calendar.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl rounded-2xl border border-line bg-bg-raised p-10 md:p-14">
          <div className="grid gap-8 sm:grid-cols-3">
            <DemoStep n="1" title="You interact" body="Click the widget, say hello, or book a slot." />
            <DemoStep n="2" title="We identify &amp; score" body="Your session runs through the exact same identify → ICP pipeline every real visitor does." />
            <DemoStep n="3" title="It's real, end to end" body="A real session gets created, scored, and stored — visible in our dashboard like any customer's lead." />
          </div>

          <div className="pointer-events-none absolute -bottom-6 -right-6 hidden md:flex items-end gap-3">
            <span className="max-w-[160px] rotate-[-4deg] rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-xs font-semibold text-accent-2 shadow-lg">
              The widget is down here <ArrowDown />
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DemoStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-800 text-accent-ink">
        {n}
      </div>
      <h3 className="mt-4 font-display text-base font-700">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

function ArrowDown() {
  return (
    <svg
      className="mt-1 inline-block h-4 w-4 animate-bounce"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}
