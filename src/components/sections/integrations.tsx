import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

const INTEGRATIONS = [
  { name: "Slack", icon: <path d="M9 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2V5a2 2 0 0 0-2-2Zm0 6H5a2 2 0 1 0 0 4h4v-4Zm6-6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2V5a2 2 0 0 1 2-2ZM9 15H7a2 2 0 1 0 0 4h2v-4Zm6 0h4a2 2 0 1 1 0 4h-4v-4Zm0-6h2a2 2 0 1 0 0-4h-2v4Zm-6 0v4h4V9Z" /> },
  { name: "HubSpot", icon: <path d="M12 2v6M12 16v6M4 12h6M14 12h6M7 7l3 3M14 14l3 3M17 7l-3 3M10 14l-3 3" /> },
  { name: "Salesforce", icon: <path d="M4 15a4 4 0 0 1 4-4 5 5 0 0 1 9.4-1.5A3.5 3.5 0 0 1 17 17H7a3 3 0 0 1-3-2Z" /> },
  { name: "Zapier", icon: <path d="M13 2 3 14h9l-1 8 10-12h-9z" /> },
  { name: "Webhook", icon: <path d="M8 17a4 4 0 1 1 3.8-5.2M12 3v7m0 0 3-3m-3 3-3-3M18 15a3 3 0 1 1-2.8 4.1" /> },
  { name: "API", icon: <path d="M8 3 3 8l5 5M16 3l5 5-5 5M14 3 10 21" /> },
  { name: "Google Calendar", icon: <path d="M8 2v4M16 2v4M3.5 9h17M4 5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /> },
];

export function Integrations() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Integrations</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Routes to the tools you already use
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            No new dashboard to check. Events land where your team already works.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-4">
          {INTEGRATIONS.map((integration) => (
            <div
              key={integration.name}
              className="flex w-[calc(50%-0.5rem)] flex-col items-center gap-3 rounded-2xl border border-line bg-bg-raised px-4 py-8 text-center sm:w-[calc(25%-0.75rem)]"
            >
              <svg
                className="h-6 w-6 text-ink-soft"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {integration.icon}
              </svg>
              <span className="text-sm font-600 text-ink">{integration.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
