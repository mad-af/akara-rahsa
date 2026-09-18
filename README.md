# Akara Rahsa, v2

Company website for Akara Rahsa, a wedding content creator studio in Indonesia.
Cinematic and video-first: a dark black-and-gold system built so footage and
photography carry the page.

Astro 7 (static) + Tailwind v4 + GSAP. Replaces the v1 site in
`../akara-rahsa`.

## Run it

```sh
bun install
bun dev          # http://localhost:4321
bun run build    # -> dist/
bun run preview
```

## Deploy target is not hardcoded

v1 pinned `site` and `base` to GitHub Pages. Both are environment driven now, so
the same build works anywhere. Copy `.env.example` to `.env`:

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Canonical origin, used for the sitemap and OG tags |
| `BASE_PATH` | `/` for a root domain or Cloudflare Pages; `/<repo>` for a GitHub Pages project site |
| `GOOGLE_FORM_SCRIPT_URL` | Apps Script endpoint behind the contact form |

If `GOOGLE_FORM_SCRIPT_URL` is unset the contact form says so instead of
silently pretending to send.

## What still needs you

Everything visual is a labelled placeholder. Search for `TODO:` to find them all.

1. **Hero footage.** `public/video/` currently holds a graded, trimmed stock clip
   as a stand-in. `public/video/README.md` has the encode recipe and the
   Cloudflare Stream / Vimeo swap path, which is the better option once a real
   clip exists.
2. **Photography.** Placeholders are hot-linked from Pexels. Replace the URLs in
   `src/config/services.ts` and `src/config/portfolio.ts`. Prefer low-key frames;
   see `DESIGN.md` section 7 for why.
3. **Logo.** `src/components/Wordmark.astro` sets the name in Playfair. The
   favicon is an "A" monogram. Both are stand-ins for a real mark.
4. **Open Graph image.** `public/og.jpg`, 1200x630, does not exist yet.

## Layout of the source

```
src/config/     one source of truth for contact details, pricing, services, projects
src/lib/        shared IndexedDB and formatting for the tools
src/scripts/    GSAP registration and the shared reduced-motion guard
src/components/ Header, Footer, HeroVideo, ServiceStack, ReelPan, Icon, Wordmark
src/pages/      landing, contact, links, 404, portofolio/[slug], tools/*
```

## Defects carried over from v1 and fixed here

1. **Both calculators silently stopped saving.** They opened the same IndexedDB
   database at the same version, each creating only its own object store, so
   whichever tool a visitor opened second could never persist anything. Their
   bare `catch` blocks swallowed the error. Fixed in `src/lib/storage.ts`, which
   opens one database at version 2 and creates both stores. Existing v1 data is
   migrated in place, not discarded.
2. **The contact form reported success on failure**, writing the same
   "Pesan terkirim!" message from its `catch` block as from the happy path.
3. **Four dead links on the landing page.** It linked to `/portofolio/1` through
   `/portofolio/4`, routes that were never built. Now a real dynamic route.
4. **The budget tool's WhatsApp button used a placeholder number**,
   `6280000000000`, while every other CTA used the real one.
5. **The footer pointed at the wrong Instagram account**, `akarahsa` rather than
   `akara_stories`.
6. **Row names were interpolated into an HTML attribute** through an escape
   helper that did not escape double quotes. Rows are built with
   `createElement` now.
7. **No page had a meta description.** The v1 layout accepted the prop and
   dropped it.

## Checks worth re-running after changes

```sh
grep -rn $'—\|–' src/          # must be empty: no em or en dashes in copy
grep -rn "addEventListener('scroll'" src/ # must be empty: ScrollTrigger only
```

In the browser: turn on Reduce Motion and reload. Every section must render
complete and static, and the hero must not request a single video byte.

For the tools, the regression test is ordering: use the budget calculator, then
the savings planner, then reload. Both must still hold their data.
