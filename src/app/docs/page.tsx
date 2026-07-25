import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { GmLeadsWidget } from "@/components/gmleads-widget";

export const metadata: Metadata = {
  title: "Documentation — Ashlar",
  description: "Set up Ashlar, connect your stack, and start tracking issues.",
};

const SECTIONS = [
  {
    id: "getting-started",
    title: "Getting started",
    body: (
      <>
        <p>
          Create a workspace, invite your team, and pick a project key —
          a short prefix like <code>ENG</code> or <code>API</code> that
          prefixes every issue you create (<code>ENG-142</code>). Existing
          Jira or Linear workspaces can be imported directly from{" "}
          <strong>Settings &rarr; Import</strong>, preserving issue history,
          comments, and labels.
        </p>
        <p>
          Every new workspace starts on the Free plan — up to 10 teammates,
          unlimited issues and projects, no credit card required.
        </p>
      </>
    ),
  },
  {
    id: "issues",
    title: "Issues",
    body: (
      <>
        <p>
          Create an issue with <code>C</code>, or from the command palette
          (<code>Cmd+K</code>). Issues support priority, assignee, labels,
          cycle, and a linked project — all editable inline, without opening
          a separate form.
        </p>
        <p>
          Reference an issue in a commit message (
          <code>Fixes ENG-142</code>) on a connected GitHub or GitLab repo
          and it closes automatically when the commit merges to your default
          branch.
        </p>
      </>
    ),
  },
  {
    id: "sprints",
    title: "Sprints & cycles",
    body: (
      <>
        <p>
          Cycles run on a fixed cadence you set per team (weekly,
          biweekly, or a custom length). At the start of each cycle, Ashlar
          proposes a scope pulled from your backlog, weighted by priority
          and each teammate&apos;s recent throughput — you adjust before
          confirming, it never auto-commits scope on your behalf.
        </p>
        <p>
          Burndown, scope-change, and carryover are tracked automatically
          per cycle and visible on the team&apos;s cycle page.
        </p>
      </>
    ),
  },
  {
    id: "roadmaps",
    title: "Roadmaps",
    body: (
      <p>
        A roadmap is a filterable timeline built from your existing
        projects and their target dates — there&apos;s no separate roadmap
        data to keep in sync. Group by team, quarter, or initiative, and
        share a read-only link with stakeholders who don&apos;t have a seat.
      </p>
    ),
  },
  {
    id: "automation",
    title: "Automation rules",
    body: (
      <>
        <p>
          Rules follow a plain <code>when / then</code> structure —
          for example: <em>when an issue sits in &quot;In Review&quot; for
          more than 12 hours, then notify the reviewer&apos;s channel</em>.
          Rules are scoped per team and visible to everyone on that team, so
          nobody inherits invisible automation.
        </p>
        <p>
          Common starting points: auto-assign by code ownership, auto-label
          by reporting source, and auto-close issues untouched for 60 days.
        </p>
      </>
    ),
  },
  {
    id: "integrations",
    title: "Integrations",
    body: (
      <p>
        GitHub and GitLab sync bidirectionally — link a PR to an issue and
        its status follows the PR&apos;s lifecycle. Slack notifications post
        to a channel per team. Figma links preview inline on the issue.
        Each integration is configured once, per workspace, from{" "}
        <strong>Settings &rarr; Integrations</strong>.
      </p>
    ),
  },
  {
    id: "api",
    title: "API & webhooks",
    body: (
      <>
        <p>
          A REST API covers issues, projects, cycles, and comments, and is
          authenticated with a personal API key generated from{" "}
          <strong>Settings &rarr; API keys</strong>. Requests are rate
          limited to 600 per minute per key.
        </p>
        <p>
          Webhooks fire on issue create, update, and status change — point
          one at any HTTPS endpoint from{" "}
          <strong>Settings &rarr; Webhooks</strong> and pick the event
          types you care about.
        </p>
      </>
    ),
  },
];

export default function DocsPage() {
  return (
    <>
      <Nav />
      <main className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-[200px_1fr]">
            <aside className="hidden md:block">
              <div className="sticky top-24">
                <Eyebrow>Docs</Eyebrow>
                <nav className="mt-6 space-y-1">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-bg-raised hover:text-ink"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="max-w-2xl">
              <div className="md:hidden">
                <Eyebrow>Docs</Eyebrow>
              </div>
              <h1 className="mt-4 font-display text-4xl font-800 leading-tight md:text-5xl">
                Documentation
              </h1>
              <p className="mt-5 text-lg text-ink-soft">
                Everything you need to set up a workspace, connect your
                stack, and start tracking issues.
              </p>

              <div className="mt-16 space-y-16">
                {SECTIONS.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24">
                    <h2 className="font-display text-xl font-700">{s.title}</h2>
                    <div className="prose-docs mt-4 space-y-4 text-[15px] leading-relaxed text-ink-soft [&_code]:rounded [&_code]:bg-bg-inset [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-ink [&_strong]:text-ink [&_em]:text-ink">
                      {s.body}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <GmLeadsWidget />
    </>
  );
}
