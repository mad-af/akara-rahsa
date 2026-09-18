# Akara Rahsa, v2

Company website for Akara Rahsa, a wedding content creator studio in Indonesia.
Cinematic and video-first: a dark black-and-gold system built so footage and
photography carry the page.

Astro 7 (static) + Tailwind v4 + GSAP.

This replaced the v1 site in the same repository. **v1 is not gone**: its nine
commits live on the `v1-archive` branch and the `v1.0.0` tag.

```sh
git fetch origin v1-archive
git checkout v1-archive     # the old light editorial site
```

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

## Cloudflare Workers

`wrangler.jsonc` is committed, and it has to stay that way. Without it Workers
Builds runs a non-interactive setup that injects the `@astrojs/cloudflare`
adapter and then expects `IMAGES` and `SESSION` bindings. Every route here is
prerendered, so there is no server entry and no adapter to install — the config
just points at `dist/`.

```bash
bun run deploy   # astro build && wrangler deploy
```

In the Workers Builds settings use `bun run build` as the build command and
`bunx wrangler deploy` as the deploy command, and set `SITE_URL` there if the
canonical origin ever differs from the default in `astro.config.mjs`.

## What still needs you

Everything visual is a labelled placeholder. Search for `TODO:` to find them all.

1. **Hero footage.** `public/video/` currently holds a graded, trimmed stock clip
   as a stand-in. `public/video/README.md` has the encode recipe and the
   Cloudflare Stream / Vimeo swap path, which is the better option once a real
   clip exists.
2. **Photography.** Placeholders are hot-linked from Pexels. Replace the URLs in
   `src/config/services.ts` and `src/config/portfolio.ts`. Prefer low-key frames;
   see `DESIGN.md` section 7 for why.
3. **Logo.** `src/components/Wordmark.astro` sets the name in Playfair, and the
   icon set is built from that same letterform. Both are honest stand-ins, but
   neither is a drawn mark.

## Icons and share image

These are generated rather than drawn by hand. One command rebuilds the whole
set:

```bash
bun run icons
```

That runs `scripts/generate_icons.py` (pulls the letterforms out of the font and
writes `public/favicon.svg`), then `scripts/render_icons.mjs` (rasterises each
size in Chromium via Playwright), then the packing step for `favicon.ico`.

The mark is an **"AR" monogram set in Playfair Display at weight 900, converted
to outlines**, knocked out of a gold tile. The pair is kerned with the font's own
A/R value rather than set loose.

Four things about it are deliberate and should not be undone:

- **It is not a `<text>` element.** A favicon renders isolated from the page, so
  it can never reach the webfont, and a text element silently falls back to
  whatever serif the system happens to have.

- **The stroke on the path is optical compensation, not decoration.** Playfair is
  a didone, so its hairlines fall below a device pixel at small sizes and
  disappear, leaving a lopsided blob rather than a letter. Stroking each contour
  in its own colour thickens it uniformly, lifting the hairline back over a pixel
  without altering the letterform.

- **The compensation is expressed in device pixels, then converted per size.**
  That is the unit that actually governs the problem: a hairline vanishes because
  of how many pixels it lands on, which is a property of the output size, not of
  the artwork. `COMPENSATION_PX` in the generator holds the ramp.

- **There is a ceiling as well as a floor, and it is tight.** Two letters in the
  tile are half the height the old single "A" was, so their counters are one or
  two pixels at 16px. Above roughly 0.35px of compensation those counters close
  and the mark becomes a blob — the opposite of the failure the stroke exists to
  prevent. The values in the ramp were measured against renders at every size by
  counting enclosed background pixels, not eyeballed. If you retune it, check
  both ends.

**The raster sizes are generated, not scaled from one master**, because each
carries a different amount of that compensation. `favicon.ico` is packed by hand
for the same reason: Pillow's ICO writer rescales a single image to every size,
which would throw the ramp away.

`public/og-default.jpg` is the full wordmark, not the monogram, and is unaffected
by any of this.

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
