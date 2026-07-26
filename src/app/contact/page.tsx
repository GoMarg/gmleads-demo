"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { GmLeadsWidget } from "@/components/gmleads-widget";

const CHANNELS = [
  { label: "Sales", value: "sales@ashlar.example" },
  { label: "Support", value: "support@ashlar.example" },
  { label: "Office", value: "San Francisco, CA" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Nav />
      <main className="py-24 md:py-32">
        <Container className="grid gap-16 md:grid-cols-[1fr_320px]">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-800 leading-tight md:text-5xl">
              Talk to us
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">
              Questions about a plan, a migration, or rolling Ashlar out to
              a larger team &mdash; send us a note and we&apos;ll get back
              to you.
            </p>

            {submitted ? (
              <div className="mt-10 max-w-md rounded-2xl border border-line bg-bg-raised p-8">
                <p className="font-display text-lg font-700">Message sent.</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Thanks for reaching out &mdash; we&apos;ll follow up shortly.
                </p>
              </div>
            ) : (
              <form
                className="mt-10 max-w-md space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-line bg-bg-raised px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink-faint"
                  />
                </Field>
                <Field label="Work email" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-line bg-bg-raised px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink-faint"
                  />
                </Field>
                <Field label="Message" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-lg border border-line bg-bg-raised px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink-faint"
                  />
                </Field>
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            {CHANNELS.map((c) => (
              <div key={c.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
                  {c.label}
                </p>
                <p className="mt-1.5 text-sm text-ink">{c.value}</p>
              </div>
            ))}
          </aside>
        </Container>
      </main>
      <Footer />
      <GmLeadsWidget />
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-600 text-ink">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
