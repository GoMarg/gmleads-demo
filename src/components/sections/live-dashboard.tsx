"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

// The owner's-eye view of what installing GmLeads produces — deliberately
// framed as "what Ashlar's team sees," never as "here's what we know about
// you." Company names reuse the site's existing fictional customer set
// (see customer-logos.tsx) rather than inventing new ones.
const COMPANIES = ["Northloop", "Voxel", "Brightcast", "Kindred Labs", "Parallax", "Fernway"];

const STAGES = [
  { label: "Visitor detected", detail: "New session on /pricing" },
  { label: "Company resolved", detail: "" },
  { label: "Session created", detail: "3rd visit this month" },
  { label: "Lead qualified", detail: "ICP match — Series B, 100+ employees" },
  { label: "Slack notified", detail: "#sales-leads pinged" },
  { label: "CRM updated", detail: "Contact synced to HubSpot" },
  { label: "Meeting booked", detail: "Demo scheduled via Google Calendar" },
];

function detailFor(stageLabel: string, staticDetail: string, company: string) {
  if (stageLabel === "Company resolved") {
    return `${company} — SaaS, ${180 + company.length * 11} employees`;
  }
  return staticDetail;
}

const SCRIPT = COMPANIES.flatMap((company) =>
  STAGES.map((stage) => ({ company, stage }))
);

const STAGE_ICON: Record<string, React.ReactNode> = {
  "Visitor detected": <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />,
  "Company resolved": <path d="M3 21h18M6 21V7l6-4 6 4v14M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1" />,
  "Session created": <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 5v5l3.5 2" />,
  "Lead qualified": <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  "Slack notified": <path d="M9 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2V5a2 2 0 0 0-2-2Zm0 6H5a2 2 0 1 0 0 4h4v-4Zm6-6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2V5a2 2 0 0 1 2-2ZM9 15H7a2 2 0 1 0 0 4h2v-4Zm6 0h4a2 2 0 1 1 0 4h-4v-4Zm0-6h2a2 2 0 1 0 0-4h-2v4Zm-6 0v4h4V9Z" />,
  "CRM updated": <path d="M4 4h16v4H4zM4 10h16v10H4z" />,
  "Meeting booked": <path d="M8 2v4M16 2v4M3.5 9h17M4 5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />,
};

type FeedItem = {
  id: number;
  label: string;
  detail: string;
};

export function LiveDashboard() {
  const indexRef = useRef(3);
  const [feed, setFeed] = useState<FeedItem[]>(() =>
    Array.from({ length: 4 }, (_, i) => {
      const { company, stage } = SCRIPT[i];
      return { id: i, label: stage.label, detail: detailFor(stage.label, stage.detail, company) };
    }).reverse()
  );
  const [visitors, setVisitors] = useState(182);
  const [sessions, setSessions] = useState(47);
  const [companies, setCompanies] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      indexRef.current += 1;
      const next = indexRef.current;
      const { company, stage } = SCRIPT[next % SCRIPT.length];
      setFeed((f) => [{ id: next, label: stage.label, detail: detailFor(stage.label, stage.detail, company) }, ...f].slice(0, 6));
      if (stage.label === "Visitor detected") setVisitors((v) => v + 1);
      if (stage.label === "Session created") setSessions((s) => s + 1);
      if (stage.label === "Company resolved") setCompanies((c) => c + 1);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="live-demo" className="py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1fr] lg:items-start">
        <div>
          <Eyebrow>Behind the scenes</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            This is what installing GmLeads looks like.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Ashlar dropped in one script tag. Everything on the right is the
            kind of thing that starts happening automatically &mdash; this
            is an illustrative feed, not a recording of you.
          </p>

          <ul className="mt-10 space-y-6">
            <BulletItem
              title="Visitor & company identification"
              body="Know who's on your site and which company they work for, automatically."
            />
            <BulletItem
              title="Instant Slack & CRM routing"
              body="High-intent visitors route straight to the right channel or rep — no dashboard-checking required."
            />
            <BulletItem
              title="Zero visitor-facing friction"
              body="None of this shows up to your visitors. It shows up in your dashboard and your Slack."
            />
          </ul>
        </div>

        <div className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised shadow-2xl">
            <div className="flex items-center justify-between border-b border-line-soft px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-semibold text-ink">Ashlar &middot; Owner view</span>
              </div>
              <span className="text-[11px] text-ink-faint">gmleads dashboard</span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-line-soft border-b border-line-soft">
              <Stat label="Visitors today" value={visitors} />
              <Stat label="Sessions" value={sessions} />
              <Stat label="Companies ID'd" value={companies} />
            </div>

            <ul className="divide-y divide-line-soft">
              {feed.map((item) => (
                <li key={item.id} className="flex items-start gap-3 px-5 py-3.5 animate-[nudge-in_0.35s_ease-out]">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {STAGE_ICON[item.label]}
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-600 text-ink">{item.label}</p>
                    <p className="mt-0.5 truncate text-xs text-ink-soft">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-line-soft p-3">
              <SlackWindow channel="sales-leads">
                <SlackMessage
                  time="2:14 PM"
                  title="New enterprise visitor"
                  fields={[
                    ["Company", "Northloop"],
                    ["Employees", "210"],
                    ["Page", "/pricing"],
                  ]}
                />
              </SlackWindow>
              <SlackWindow dm="Sarah Kim">
                <SlackMessage
                  time="2:16 PM"
                  title="High-value returning visitor"
                  fields={[
                    ["Company", "Voxel"],
                    ["Visit", "3rd this month"],
                  ]}
                />
              </SlackWindow>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-ink-faint">
            Illustrative — cycles through sample activity, not real visitor data.
          </p>
        </div>
      </Container>
    </section>
  );
}

function BulletItem({ title, body }: { title: string; body: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <div>
        <p className="font-700 text-ink">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{body}</p>
      </div>
    </li>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-4 py-3.5 text-center">
      <div className="font-display text-xl font-800 tabular-nums text-ink">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-[0.06em] text-ink-faint">{label}</div>
    </div>
  );
}

// Styled to be recognizable as an actual Slack screenshot, not a labeled
// diagram — Slack's own dark-theme palette (near-black, not our green
// accent) is what sells that, since our site's own chrome would otherwise
// read as "just another card on this page."
function SlackWindow({
  channel,
  dm,
  children,
}: {
  channel?: string;
  dm?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-black/40">
      <div className="flex items-center gap-1.5 bg-[#1a1d21] px-3 py-2 border-b border-white/10">
        {channel ? (
          <>
            <span className="text-[13px] text-white/40">#</span>
            <span className="text-[13px] font-700 text-white">{channel}</span>
          </>
        ) : (
          <>
            <span className="flex h-4 w-4 items-center justify-center rounded bg-accent-2 text-[9px] font-800 text-accent-ink">
              {dm?.[0]}
            </span>
            <span className="text-[13px] font-700 text-white">{dm}</span>
          </>
        )}
      </div>
      <div className="bg-[#222529] px-3 py-3">{children}</div>
    </div>
  );
}

function SlackMessage({
  time,
  title,
  fields,
}: {
  time: string;
  title: string;
  fields: [string, string][];
}) {
  return (
    <div className="flex gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-800 text-accent-ink">
        G
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[13px] font-700 text-white">GmLeads</span>
          <span className="rounded bg-white/10 px-1 py-px text-[9px] font-700 text-white/50">APP</span>
          <span className="text-[11px] text-white/40">{time}</span>
        </div>
        <div className="mt-1 rounded border-l-[3px] border-accent bg-white/[0.04] py-2 pl-3 pr-2">
          <p className="text-[13px] font-700 text-white">{title}</p>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
            {fields.map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] text-white/40">{k}</p>
                <p className="text-[12px] text-white/90">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
