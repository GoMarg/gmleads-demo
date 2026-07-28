# gmleads-demo

A fictional B2B SaaS company — **Ashlar**, an issue tracker for
engineering teams — with the real, live GmLeads widget installed on its
site. Ashlar's branding, copy, product, pricing, docs, and blog are all
invented for this repo; none of it describes GmLeads. The point is the
opposite of a GmLeads marketing page: a visitor experiences the GmLeads
widget exactly the way a real customer's end-users would encounter it on
someone else's product — discovered in the corner of a page they came to
for other reasons, not pitched at them.

The widget itself is not staged. It's the real production widget script,
pointed at a real production workspace, talking to the real backend.
Nothing about the widget or its behavior is mocked.

Separate from `gmleads-dashboard` deliberately — independent release
cadence, no risk of demo changes affecting the actual product, and a
clean line between "internal tool" (dashboard) and "public face"
(this repo).

## Stack

Next.js 16 (App Router) / React 19 / Tailwind 4 / TypeScript — matches
`gmleads-dashboard/web`'s stack for consistency.

## Structure

- `/` — Ashlar's homepage: hero, customer logos, features, testimonials,
  FAQ, CTA.
- `/pricing` — Free / Team / Enterprise tiers.
- `/docs` — a real (if modest) documentation page for Ashlar's invented
  product.
- `/blog` — a few sample posts, written in Ashlar's own voice.

All copy, logos, testimonials, and blog posts describe the fictional
Ashlar product and its fictional customers — consistent internal
fiction, not a claim about anything real. The one real thing on the
site is the GmLeads widget in the corner.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_EMBED_KEY
npm run dev
```

## Environment variables

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_WIDGET_URL` | **Optional.** The SDK has a built-in default (`gmleads-widget-production.pages.dev/widget.js`). Only set this to override for local development (e.g. `http://localhost:5173/widget.js`) or staging. |
| `NEXT_PUBLIC_EMBED_KEY` | The embed key for the dedicated **GmLeads Demo** workspace (production) — a real workspace created specifically for this site, kept separate from any infrastructure-verification workspace. |

## Deployment

Vercel, same as `gmleads-dashboard`'s frontend.

## Philosophy

The widget on this page is the actual product, not a recording or a
staged flow. A real visit here creates a real session, runs through the
real identify → ICP scoring pipeline, and would trigger a real Slack
alert if one were configured for this workspace. Everything around the
widget — Ashlar itself — is invented so the widget can be discovered the
way a real end-user would discover it on a real customer's site, not
presented as a feature of a GmLeads marketing page. If the widget's
behavior here ever looks fake, that's a bug, not a design choice.
