# Finders, Keepers — Web

A curated, seasonal physical-mail club. "We do the finding. You do the keeping."

## Status: Stage 1 complete, Stage 2 (Supabase) partially live

**Live and real:**
- Full public site (Stage 1) — design system, every page, seasonal editions
- Supabase auth — real login/signup, session cookies, sign out
- Three real admin accounts (Claire = owner, Catherine + Leah = admin) with
  role-based access enforced by RLS + a defense-in-depth trigger (verified: a
  regular signed-up user cannot self-promote their own role)
- **Click-to-edit CMS**: signed-in admins see a small floating admin button
  (bottom-right corner — deliberately compact so it never overlaps page
  content). Opening it and switching on "Edit this site" makes marked text
  fields directly editable in place (saves on blur) and images get a "Change
  photo" upload overlay (uploads to Supabase Storage, replacing the fallback
  colour block). Wired on: Home (hero/promise text, edition cover art, founder
  photos), Keepers (photos + bios), About, What Arrives, Pricing, and Lost
  Letters (intro text), plus every edition cover image sitewide. Extend the
  same `EditableText` / `EditableImage` components to remaining pages the same way.
- Newsletter signups ("Leave your name in the drawer") save to a real
  `newsletter_subscribers` table
- **Contact form** saves to a real `contact_messages` table and (once
  `RESEND_API_KEY` is set) sends the submitter an autoresponder and notifies
  all 3 admins
- **Signup notifications**: every new signup emails all 3 admins (once
  `RESEND_API_KEY` is set)
- **Colour editing**, two scopes, both verified end-to-end: click the 🎨
  button that appears on a coloured section in edit mode, pick a colour, then
  choose **"Just this block"** (stored per-block, doesn't affect anything
  else) or **"Everywhere on the site"** (updates the shared brand token —
  every element using that colour changes at once, since they all read the
  same CSS variable). The same "everywhere" tokens can also be managed from
  a plain list at `/admin/colours`.
- **Full admin dashboard** at `/admin` (admin/owner only, redirects everyone
  else): overview stats, `/admin/messages` (contact submissions, mark
  handled), `/admin/subscribers` (newsletter list), `/admin/colours` (brand
  colour tokens, with generic labels — Background/Paper/Ink/Primary/Secondary
  keep their meaning, the rest are Accent 1/2/3 so they read as freely
  adjustable).
- **Journal posts**: admins get an "+ Add Journal Post" button on `/journal`
  in edit mode. New posts are saved to a real `journal_posts` table with the
  date and author set automatically (today's date, the admin's own name) —
  merged with the static starter posts, newest first.

**Still placeholders, not wired yet:**
- Payments / subscriptions (Pricing page links to Contact, not real checkout) — Stage 3
- Lost Letters backend (find-by-code form is present but disabled) — Stage 4
- A full drag-and-drop visual page-builder (rearranging layout, swapping a
  colour block for an image block, etc.) — what's built is click-to-edit
  *text*, *images*, and *colours* on the existing layout, not a general
  design tool

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Supabase (`@supabase/ssr` + `@supabase/supabase-js`) — auth, Postgres, storage
- next/font (Fraunces for display/headings, Spectral for body, Caveat for rare
  decorative accents) — see `lib/fonts.ts`. Close free stand-ins; no licensed
  brand font files were supplied yet.
- Content defaults live in `content/*.ts` as typed mock data; the CMS
  (`site_content` / `media_assets` tables) overrides them when a row exists,
  falling back to these defaults otherwise.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase values — ask whoever set up the project
npm run dev
```

Open http://localhost:3000. Log in at `/login` with one of the three admin
accounts to see the edit mode toggle.

## Database

Schema lives in `supabase/migrations/*.sql`, applied in filename order. To
apply against a real project:

```bash
npm run db:migrate   # reads SUPABASE_DB_URL from .env.local
```

Use the **connection pooling** string (Session mode, port 5432) from Supabase
Dashboard → Project Settings → Database, not the direct `db.<ref>.supabase.co`
host — that one is IPv6-only and won't work from most local networks/CI.

Key tables: `profiles` (role: customer/editor/admin/owner), `site_content`
(the CMS text store, also used for per-block colour overrides), `site_colors`
(global brand colour tokens), `media_assets` (uploaded image URLs),
`newsletter_subscribers`, `contact_messages`, `journal_posts`.
All have RLS enabled — public read where the site needs it, admin-only write,
enforced by an `is_admin()` helper + a role-escalation-prevention trigger on
`profiles`.

## Deploying (Vercel)

1. Push to GitHub (already done — `clairebbarr/FindersKeepers`, `master` branch).
2. At https://vercel.com/new, **Import Git Repository**, select this repo.
   Next.js is auto-detected — no build config needed.
3. **Before deploying**, add these Environment Variables in the Vercel project
   (Settings → Environment Variables) — the site will 500 on every page
   without them, since auth now runs on every request via middleware:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY` (optional — without it, signup/contact still saves data,
     it just skips sending email)
4. Deploy. Then: Project → Settings → Domains → add `finderskeepersletters.com`
   and set the DNS records Vercel gives you at your domain registrar.

This step needs your own Vercel account login (browser OAuth), which can't be
done from an automated session — do this part yourself, then hand off any
build errors.

### "This page couldn't load / A server error occurred" on login or signup

This means a Server Action crashed. By far the most common cause: the 3
Supabase environment variables above aren't set on Vercel, or they were added
*after* the last deploy — Vercel doesn't retroactively inject new env vars
into an already-built deployment, you need to trigger a fresh deploy after
adding/changing them (Deployments → ⋯ → Redeploy). Auth code now fails with a
clear on-page message instead of a blank crash if this is the cause, which
should make it obvious. If it still happens, check Vercel → your project →
Deployments → the failing deployment → Functions/Logs for the actual server
error — that's something only someone with dashboard access can see.

## Design tokens

Brand colours and fonts are defined in `app/globals.css` under `@theme` (Tailwind
v4's CSS-based config) — e.g. `bg-fk-plum`, `text-fk-mint`, `font-display`,
`font-body`. Seasonal edition palettes live separately in `content/palettes.ts`
since they vary per edition rather than being global brand colours.

## Still needed for later stages

- A Stripe account (API keys + webhook secret) for Stage 3 subscriptions/checkout
- A Resend account (API key) for Stage 5 branded transactional email

## Project structure

```
app/                    Routes (App Router)
app/admin/              Admin dashboard (overview, messages, subscribers, colours) — admin-only
components/admin/       EditModeContext, AdminBar, EditableText, EditableImage, ColorEditableSection
components/brand/       Hand-authored SVG icon library, Wordmark, PublisherMark
components/layout/      SiteHeader, SiteFooter, LegalPage wrapper
components/sections/    Homepage section components
components/ui/          Reskinned Button, Card, Badge, Input primitives
content/                Typed default content (editions, founders, journal, pricing, FAQ, copy, palettes)
lib/auth/               Login/signup/sign-out server actions, current-profile helper
lib/site-content/       Read (get.ts), text/image writes (actions.ts), colour tokens +
                         writes (color-tokens.ts, color-actions.ts) for the CMS store
lib/newsletter/         Newsletter signup server action
lib/contact/            Contact form + mark-handled server actions
lib/email/              Resend wrapper (resend.ts) + branded HTML templates (templates.ts)
lib/journal/            Merge static + DB journal posts (get.ts), create-post action (actions.ts)
lib/supabase/           Browser/server/middleware Supabase clients, errors.ts (Next.js
                         dynamic-rendering signal helper — see comments, don't remove)
supabase/migrations/    SQL schema, applied via scripts/db-migrate.mjs
middleware.ts           Session-refresh middleware. Deliberately using the classic
                         "middleware.ts" name rather than Next 16's newer "proxy.ts" —
                         safer bet for Vercel production compatibility on a brand-new
                         Next.js version, at the cost of one harmless dev-time warning.
```
