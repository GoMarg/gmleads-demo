# Release Candidate Checklist — GmLeads Demo Redesign

## Build & Code Quality
- [x] Build succeeds with no errors (14 routes, 0 TypeScript errors)
- [x] No dead code or placeholder text remains
- [x] Production environment variables documented in `.env.example`
- [x] Dead `install.tsx` removed
- [x] Unused `onBackToConfig` prop removed
- [x] Widget initialization consolidated to single source of truth (`GmLeadsWidget`)

## End-to-End Functionality
- [ ] Generate a real workspace through the server-side proxy (`POST /api/generate-embed`)
- [ ] Confirm an embed key is returned
- [ ] Copy the installation snippet from `DeveloperGuide`
- [ ] Paste it into a blank HTML page
- [ ] Verify the widget appears on the test page
- [ ] Send a message through the widget
- [ ] Verify Slack receives the notification (if configured)
- [ ] Verify the lead appears in the backend dashboard
- [ ] Verify CRM integration works (if enabled)

## Regression Testing
- [ ] Interactive Demo section still works with live widget
- [ ] `/live-demo` page still works with pre-configured widget
- [ ] Generated widget replaces the demo widget correctly (no double-init)
- [ ] Repeated embed key generation doesn't leak widget instances
- [ ] Refreshing the page restores the expected state

## Browser Testing
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

## Responsive Testing
- [ ] Mobile portrait (375px)
- [ ] Mobile landscape (667px)
- [ ] Tablet (768px)
- [ ] Desktop (1280px)
- [ ] Ultrawide (1920px+)

## Accessibility
- [ ] Keyboard navigation works through all sections
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader labels present on icon-only buttons
- [ ] Color contrast meets WCAG AA standards
- [ ] Reduced-motion mode respected (prefers-reduced-motion)

## Performance
- [ ] Widget bundle size acceptable
- [ ] Initial page load completes within reasonable time
- [ ] Widget initialization time is fast
- [ ] No memory leaks after repeatedly opening/closing the widget

## Security
- [x] No admin credentials reach the client (server-side proxy)
- [x] API route validates input via Zod schema
- [ ] Invalid requests are rejected cleanly (400/401/503)
- [ ] Sensitive errors aren't exposed to the browser

## Pre-Demo Setup
- [ ] Create one permanent demo workspace
- [ ] Configure one demo Slack channel
- [ ] Record a few realistic conversations
- [ ] Generate a few existing leads
- [ ] Set a stable demo embed key in environment variables

## Demo Script

1. Open the landing page (`/`)
2. Show the Interactive Demo with the live widget
3. Scroll to Configure Widget — fill in fields
4. Generate an embed key
5. Show the widget reconfiguring with the new key
6. Copy the installation snippet
7. Open `/live-demo` and demonstrate a conversation
8. If available, show the Slack notification or lead appearing in the backend

---

**Status:** Feature implementation complete. Ready for release validation.

