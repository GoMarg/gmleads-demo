import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { GmLeadsWidget } from "@/components/gmleads-widget";

export const metadata: Metadata = {
  title: "Pricing — Ashlar",
  description: "Simple, per-seat pricing. Free for teams under 10.",
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    unit: "forever",
    description: "For small teams getting started.",
    features: [
      "Up to 10 teammates",
      "Unlimited issues & projects",
      "Sprints & roadmaps",
      "GitHub & GitLab sync",
      "30-day history",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Team",
    price: "$8",
    unit: "per user / month",
    description: "For teams that have outgrown spreadsheets and sticky notes.",
    features: [
      "Unlimited teammates",
      "Everything in Free",
      "Automation rules",
      "Advanced analytics",
      "Unlimited history",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "annual billing",
    description: "For organizations with real compliance and scale needs.",
    features: [
      "Everything in Team",
      "SSO & SCIM provisioning",
      "Audit log",
      "99.9% uptime SLA",
      "Dedicated support",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-800 leading-tight md:text-5xl">
              Simple pricing. No per-ticket fees.
            </h1>
            <p className="mt-5 text-lg text-ink-soft">
              Free for teams under 10. Everyone else pays per active
              teammate — never per issue, project, or integration.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-accent bg-bg-raised"
                    : "border-line bg-bg-raised/50"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-2">
                    Most popular
                  </span>
                )}
                <h2 className="font-display text-xl font-700">{plan.name}</h2>
                <p className="mt-2 text-sm text-ink-faint">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-800">{plan.price}</span>
                  <span className="text-sm text-ink-faint">{plan.unit}</span>
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`mt-8 rounded-lg px-5 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90 ${
                    plan.highlighted
                      ? "bg-accent text-accent-ink"
                      : "border border-line text-ink"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
      <GmLeadsWidget />
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
