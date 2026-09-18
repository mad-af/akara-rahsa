---
brand: Akara Rahsa
version: 2
supersedes: akara-rahsa/DESIGN.md (v1, light editorial)
---

# Design System of Akara Rahsa, v2

v1 specified a white ground, a flat surface with no shadows, a blush rose accent,
and "quiet, minimal, unobtrusive" motion. v2 deliberately inverts the first and
the last of those. The brand sells *film*, and a light photo-brochure is what
every competitor already looks like. This system is built so the work is the
loudest thing on the page.

Three things carry over unchanged: Playfair Display, Noto Sans, and editorial
restraint. Rose is retired.

---

## 1. Atmosphere

Near-black ground, warm film-white text, and a single pale champagne gold. The
register is a darkened screening room: the page recedes so footage and
photography come forward. Whitespace stays structural, type stays editorial, and
colour is used once.

The ground carries a very faint cool cast rather than being neutral warm. That is
deliberate: it makes the gold read warm by contrast, without the gold itself
needing to be orange.

**Why this gold.** The reflexive "premium" palette is a beige ground with a brass
accent around `#B08947`. It is the most over-used combination in this category
and it makes a brand invisible. The ground here is near-black, which already
puts the system in dark-luxury territory rather than warm-craft.

The first pass over-corrected. It used a pale champagne, `#E3CE9B`, at only 56
percent saturation, which read as cream and was genuinely hard to pick out. The
accent is now `#E8B93C`: same hue family, 79 percent saturation. It sits 36
saturation points and 9 lightness points away from brass, so the distinction
that mattered is intact while the accent actually reads as gold.

---

## 2. Tokens

Defined once in `src/styles/global.css` inside `@theme static`.

| Role | Token | Value | Contrast on ground |
| --- | --- | --- | --- |
| Ground | `--color-ground` | `#0B0B0C` | n/a |
| Elevated surface | `--color-ground-lift` | `#141416` | n/a |
| Hairline | `--color-line` | `#26262A` | n/a |
| Soft hairline | `--color-line-soft` | `#1B1B1E` | n/a |
| Text primary | `--color-paper` | `#F2EFE9` | 15.9:1 |
| Text secondary | `--color-paper-dim` | `#9A968E` | 6.7:1 |
| Text decorative | `--color-paper-faint` | `#6B6862` | 3.4:1, never body copy |
| Accent | `--color-gold` | `#E8B93C` | 10.7:1 |
| Accent muted | `--color-gold-dim` | `#907328` | 4.4:1, rules only, never text |
| Accent channels | `--gold-rgb` | `232 185 60` | for translucent variants |
| Bar height | `--nav-h` | `64px` | reserved by the hero and pinned sections |

`@theme static` is required, not stylistic. Tailwind v4 tree-shakes theme
variables it cannot see used, and the budget tool reads the accent at runtime
through `getComputedStyle`, which Tailwind has no way to detect.

`--gold-rgb` deliberately lives in a plain `:root` block rather than in `@theme`.
The `--color-*` namespace belongs to Tailwind, which would try to generate
utilities from a bare channel triplet. It exists because CSS `rgb()` cannot take
a hex custom property, so without it every translucent gold has to hardcode the
numbers. The first pass did exactly that in five places across three files, which
turned changing the accent into a hunt. Any new faded gold uses
`rgb(var(--gold-rgb) / a)`, never a literal.

`--nav-h` exists for the same reason. The hero subtracts it from `100dvh` and
every pinned section reserves it as top padding; hardcoding it meant changing the
bar silently pushed the hero past the fold.

---

## 3. The three locks

Each is enforced in code, not by discipline alone.

**Theme lock.** The whole site is dark. No section inverts to a light ground
mid-scroll. v1's CTA block flipped to dark against a white page; here there is
nothing to flip to, so that section is distinguished by scale and space instead.

**Colour lock.** Gold is the only accent, everywhere, including states. There is
no red error colour and no green success colour. Failure is signalled by weight
and wording. v1's `.remove-btn:hover` used `#c65b4a`; it now brightens to
`--color-paper`.

**Shape lock.** Radius 0 on every rectangular surface: buttons, inputs, cards,
image tiles, the video frame. The only curve in the system is a true circle, used
for the donut and its legend dots. Nothing in between. The square corner is the
film frame. (v1's `DESIGN.md` called for a `9999px` pill while the shipped button
was square; that drift is resolved to square.)

---

## 4. Typography

Playfair Display for display, Noto Sans for body, both self-hosted through
Fontsource. v1 loaded four families from Google Fonts over a render-blocking
stylesheet, two of which (Cormorant Garamond, Jost) were never used.

**The dark-ground correction.** Playfair is a high-contrast didone. Its hairlines
catch light beautifully at display sizes on a dark ground, and break up below
them. So:

- Playfair only at **1.5rem and above**. Below that, Noto Sans, always.
- Numbers that update live carry `font-variant-numeric: tabular-nums` so they do
  not jitter as they change.

Both rules are applied in the tools, where v1 set Playfair at 20px and 16px
inside the donut and the breakdown column.

---

## 5. Motion

`MOTION_INTENSITY` is high, but every animation states its reason. Four kinds
qualify: hierarchy, storytelling, feedback, state transition. "It looked good" is
not one of them, and an animation whose reason cannot be written in a sentence is
deleted rather than kept.

The full inventory:

| Where | What | Why |
| --- | --- | --- |
| Hero headline | SplitText line-mask wipe | Hierarchy. The headline must land before anything competes with it. |
| Hero supporting copy | Fade and rise, after the headline | Hierarchy. The CTA arriving last makes it the end of the eye path. |
| Hero video | Cross-fade from poster on `canplay` | State transition. Marks the handoff so the swap does not read as a flicker. |
| Manifesto | Word opacity scrubbed against scroll | Storytelling. Paces the brand statement to reading speed. |
| Layanan | Pinned sticky-stack, outgoing panel recedes | Storytelling. Each service is a chapter, not a spec to compare. |
| Portofolio | Pinned horizontal pan | Storytelling. A reel is horizontal; the pan reads as scrubbing a timeline. |
| Section reveals | Fade and rise on entry | Hierarchy. Sequences attention without pinning. |
| Closing rule | Gold hairline draws in | Hierarchy. Points at the one action that matters. |
| Nav overlay | Curtain down via `clip-path` | State transition. Marks the move into a full-screen navigation mode, not a dropdown. |
| Nav labels | Masked wipe, 0.06s stagger | Hierarchy. Sets reading order before the eye starts choosing. |
| Nav preview | Cross-fade on hover | Feedback. Binds the pointer to the item under it, so a text-only menu still previews the work. |
| Budget donut | Fade and scale, once, on first non-zero total | State transition. Marks the budget no longer being empty. |

**Hard rules.**

- Only `transform`, `opacity` and `clip-path` are animated. Never a layout property.
- No `window.addEventListener('scroll')`. ScrollTrigger or IntersectionObserver.
- `prefers-reduced-motion: reduce` collapses everything to the finished static
  state, and the hero video is never fetched at all.
- No marquee. The budget of one goes unused: there is no real client roster to
  put in it, and inventing one would be fabricated social proof.

---

## 6. Layout

Eight sections on the landing page, eight distinct layout families. No section
repeats another's shape.

The uppercase micro-label is rationed to `ceil(sections / 3)`, which is 3, spent
on the hero, Portofolio and Harga. Every other section is headline-only. There
are no numbered section labels, no scroll cues, no locale or time strips, no
decorative status dots, and no captions overlaid on images.

Three services are never three equal cards. That layout invites comparison
shopping and is the most templated shape there is; they are a pinned stack.

**Navigation is a full-screen moment, not a bar.** The first pass used a
conventional horizontal bar with five text links plus a separate mobile drawer.
That is the most common shape on the web and it read as chrome sitting on top of
the film. The bar is now a wordmark, the primary CTA and a trigger, at `--nav-h`;
everything else lives in an overlay.

Two rules hold it together:

- **The CTA stays in the bar.** The primary action is never behind an extra
  click. That is what separates this from a plain hamburger.
- **One pattern for every width.** There is no second navigation mechanism to
  keep in sync.

The bar sits above the overlay and stays visible while it is open, so the trigger
doubles as the close control and the wordmark never disappears.

**The bar is fixed and transparent, not sticky.** Sticky kept it in normal flow,
which pushed the hero down by `--nav-h` and left the page background showing
behind it. The bar was already transparent; there was simply nothing behind it to
see. Fixed lets the hero fill the viewport so the footage runs under the bar and
the two read as one surface.

That has consequences worth stating, because they are easy to reintroduce:

- Pages that are not full-bleed reserve the height themselves, via
  `padding-top: calc(var(--nav-h) + 4rem)`. The bar no longer reserves it.
- The hero is `100dvh`, not `100dvh` minus the bar, and its copy is
  bottom-aligned so it never collides with the bar at the top.
- Bar text now sits over live footage, so the hero scrim carries a soft top
  falloff. It is a gradient, not a strip: a solid band would just reinstate the
  bar this removes.
- Once the page scrolls past the hero the bar takes a translucent surface with a
  blur, because below the hero there is no scrim to sit on.
- A fixed bar does not move when body padding compensates for the scrollbar
  during the scroll lock, so it reads the same gap through `--sb-gap` and would
  otherwise visibly jump as the menu opens.

The overlay is a dialog and is built as one: `aria-modal`, a focus trap that
wraps in both directions, `inert` on everything outside it, Escape to close, and
focus returned to the trigger afterwards. The trigger's label is visually hidden
on narrow screens rather than `display: none`, because the latter strips it from
the name computation and leaves an unnamed button.

### The WhatsApp shortcut

WhatsApp is the channel this audience actually uses, so it gets a standing
affordance in the bottom right rather than only living inside page CTAs. Two
decisions there look like mistakes unless they are written down:

- **It is gold, not WhatsApp green.** The colour lock allows one accent. Dropping
  `#25D366` onto a near-black editorial page reads as a sticker, and the glyph is
  recognisable by shape without it.
- **It is square.** The shape lock is radius 0 for rectangular surfaces, and the
  circle is reserved for the donut. A round button would be the only pill on the
  site.

It stays hidden while the hero is on screen, because the hero already carries
"Jadwalkan Konsultasi" and two controls competing for one intent in a single
viewport is worse than none. It also stands down while the navigation overlay is
open, coordinated through a `data-menu-open` flag on `<html>` so neither
component has to import the other.

---

## 7. Imagery

All photography is placeholder until real work lands. Every slot is marked
`TODO` with the dimensions it needs.

Two rules that outlive the placeholders:

- **Low-key frames only.** Bright, high-key, white-dress-in-sunlight images fight
  a near-black ground and make the page look like two designs stapled together.
  This is the most likely reason the site could come to feel wrong.
- **One grade.** The `.graded` utility applies a single saturation, contrast and
  brightness treatment to all editorial imagery, so frames from different shoots
  read as one body of work. Drop it once the real work is consistently graded.

---

## 8. Voice

Indonesian first, `lang="id"`. Quietly confident and editorial, warm without
decoration. It speaks like a trusted curator, not a vendor.

**No em-dashes or en-dashes anywhere in visible copy.** Use a comma, a period, or
a plain hyphen. The v1 copy carried thirty of them; the check is
`grep -rn $'—\|–' src/`, and it must return nothing.

Claims must be honest. The contact form says a message failed when it failed, and
the tools say "Gagal menyimpan" when a write did not commit. v1 reported success
in both cases regardless.
