# gmleads-demo

The public demo/marketing site for GmLeads — a single landing page whose
centerpiece is the real, live GmLeads widget, talking to the real
production backend. Nothing on this site is staged or mocked.

Separate from `gmleads-dashboard` deliberately — independent release
cadence, no risk of demo changes affecting the actual product, and a
clean line between "internal tool" (dashboard) and "public face"
(this repo).

## Stack

Next.js 16 (App Router) / React 19 / Tailwind 4 / TypeScript — matches
`gmleads-dashboard/web`'s stack for consistency.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_EMBED_KEY
npm run dev
```

## Environment variables

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_WIDGET_URL` | The GmLeads widget script to embed. Defaults to the live Cloudflare Pages build (`gmleads-widget-production.pages.dev/widget.js`) if unset — the aspirational `cdn.gmleads.io` domain isn't provisioned yet. Change here, not in code, once it is. |
| `NEXT_PUBLIC_EMBED_KEY` | The embed key for the dedicated **GmLeads Demo** workspace (production) — a real workspace created specifically for this site, kept separate from any infrastructure-verification workspace. |

## Deployment

Vercel, same as `gmleads-dashboard`'s frontend.

## Philosophy

The widget on this page is the actual product, not a recording or a
staged flow. A real visit here creates a real session, runs through the
real identify → ICP scoring pipeline, and would trigger a real Slack
alert if one were configured for this workspace. If something here ever
looks fake, that's a bug, not a design choice.
