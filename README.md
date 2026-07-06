# Finders, Keepers — Web

A curated, seasonal physical-mail club. "We do the finding. You do the keeping."

## Status: Stage 1 of 5 complete

This repo currently contains **Stage 1 only**: the design system and every public
page, built with realistic content but no live backend. Nothing below has been
built yet and none of it should be assumed to work:

- Accounts / authentication (Login, Signup, Account pages are static UI shells)
- Payments / subscriptions (Pricing page links to Contact, not real checkout)
- Admin CMS / website editor
- Lost Letters backend (find-by-code form is present but disabled)
- Transactional email (contact and newsletter forms show an honest
  "not connected yet" message on submit instead of pretending to send anything)

Everything else — layout, responsive behaviour, copy, the icon library, the
seasonal edition system, SEO metadata/sitemap — is real and functional.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- next/font (Fraunces for display/headings, Spectral for body, Caveat for rare
  decorative accents) — see `lib/fonts.ts`. These are close free stand-ins picked
  because no licensed brand font files were supplied; swap them there once real
  fonts are chosen.
- Content lives in `content/*.ts` as typed mock data, shaped the way a future
  CMS/database would return it, so Stage 2 is a data-source swap rather than a
  rebuild.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Design tokens

Brand colours and fonts are defined in `app/globals.css` under `@theme` (Tailwind
v4's CSS-based config) — e.g. `bg-fk-plum`, `text-fk-mint`, `font-display`,
`font-body`. Seasonal edition palettes live separately in `content/palettes.ts`
since they vary per edition rather than being global brand colours.

Palette hex values and the three founder profiles in `content/founders.ts` are
realistic placeholders, not measurements from a final brand guide — replace them
with the real values/photos when available.

## Deploying (Vercel)

1. Push to GitHub (already done — `clairebbarr/FindersKeepers`, `master` branch).
2. At https://vercel.com/new, **Import Git Repository**, select this repo.
   Next.js is auto-detected — no build config needed. Click Deploy.
3. Once deployed: Project → Settings → Domains → add `finderskeepersletters.com`,
   then set the DNS records Vercel gives you at your domain registrar.

This step needs your own Vercel account login (browser OAuth), which can't be
done from an automated session — do this part yourself, then hand off any
build errors.

## Starting Stage 2 (Supabase)

Copy `.env.example` to `.env.local` and fill in the Supabase values once you've
created a project at https://supabase.com/dashboard → New Project → Project
Settings → API:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only — never expose to the browser)

`lib/supabase/client.ts` and `lib/supabase/server.ts` are already in place
(Supabase's official Next.js App Router SSR pattern) but **not wired into any
page yet** — deliberately, so the current Vercel deployment can't break from
missing env vars. Once real credentials exist, add the same values as
environment variables in the Vercel project (Settings → Environment
Variables) before wiring up login/signup/database features.

Also needed later:
- A Stripe account (API keys + webhook secret) for Stage 3 subscriptions/checkout
- A Resend account (API key) for Stage 5 transactional email

## Project structure

```
app/                  Routes (App Router)
components/brand/     Hand-authored SVG icon library, Wordmark, ArchivalFrame
components/layout/    SiteHeader, SiteFooter, LegalPage wrapper
components/sections/  Homepage section components
components/ui/        Reskinned Button, Card, Badge, Input primitives
content/               Typed mock content (editions, founders, journal, pricing, FAQ, copy, palettes)
lib/fonts.ts           Font configuration
```
