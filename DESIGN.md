---
omd: 0.1
brand: Akara Rahsa
bootstrapped_from: hyundaicard
bootstrapped_at: "2026-07-10T22:30:00+07:00"
---

# Design System of Akara Rahsa

<!-- omd:unresolved: color.accent_warm — suggesting rose (#E8B4B8) as warm accent, tune after visual review -->
<!-- omd:unresolved: typography.display — Playfair Display suggested as Youandi stand-in, verify license fit -->

## 1. Visual Theme & Atmosphere

Akara Rahsa is a wedding-content brand, and its visual identity draws from the same discipline as the most celebrated editorial monochrome systems: an almost-ink-black (#1a1a1a) on a clean white (#FFFFFF) ground, with a single warm accent — a blush rose (#E8B4B8) — as the only color, used sparingly and deliberately. The signature is typography: Playfair Display for headings (borrowing the editorial gravitas that the Hyundai Card identity established with its proprietary Youandi) paired with Noto Sans for body text in Indonesian and English. The atmosphere is gallery-like but warmer — generous whitespace, high contrast, and a quiet confidence that reads as understated luxury rather than cold minimalism. The warmth enters through the accent and through the subject matter: this is a brand about weddings, so the restraint of black-and-white is softened by a single romantic gesture in rose, applied only to headings, dividers, and the primary button. Every element earns its place, and the result feels less like a utility and more like an invitation — a wedding invitation, curated with the same care as a design publication.

## 2. Color Palette & Roles

The palette is deliberately restrained: a near-black ink on a white ground, with one warm accent reserved for brand moments.

| Role | Value | Usage |
| --- | --- | --- |
| Ground | #FFFFFF | Page and surface background; the dominant field |
| Ink | #1A1A1A | Body text, headings, primary brand color; deep near-black for softer contrast than pure #000 |
| Accent — rose | #E8B4B8 | Primary button, section dividers, decorative headings, selected brand moments |
| Accent — ink secondary | #555555 | Secondary text, metadata, captions |

The rose accent is the brand's one chromatic gesture — it should never exceed roughly 10% of any viewport. It exists to signal warmth and romance; outside of those moments, the experience remains in near-black and white.

## 3. Typography Rules

Typography carries the editorial weight of the brand. The display layer uses Playfair Display (weights 600 for headings, 700 for display moments) — a serif face chosen for its editorial gravitas and romantic curves, standing in for the proprietary spirit of a custom brand face. Body text is set in Noto Sans (weights 300, 400, 500) for legibility across Indonesian and Latin content.

| Token | Value |
| --- | --- |
| Display / branding | Playfair Display (700 / 600) |
| Body | Noto Sans (400 / 500 / 300) |
| Body size | 15px (slightly larger than reference for readability in longer wedding storytelling) |
| Heading (section) | 28px / 600 (Playfair Display) |
| Heading (hero) | 48px / 700 (Playfair Display) |

Rule of thumb: let Playfair Display own the brand and headline moments — especially the hero, section titles, and any decorative pull-quote; let Noto Sans carry running text at 15px with comfortable leading (1.6). The editorial hierarchy is three steps: hero (48px) → section (28px) → body (15px).

## 4. Component Stylings

### Page Surface

- Background: #FFFFFF
- Text: #1A1A1A
- Border: none
- Padding: generous (section-level: 64px top/bottom, edge padding min 24px)
- Leading: 1.6
- Use: the base content canvas — white ground, near-black ink, maximal editorial restraint

### Heading

**Section heading**
- Font: Playfair Display 28px / 600
- Text: #1A1A1A
- Decoration: optional rose (#E8B4B8) underline divider (2px, 48px wide, centered or left-aligned per layout)
- Padding: editorial spacing above and below (section scale)
- Use: section-level titles; pair with Playfair Display for all brand moments

**Hero heading**
- Font: Playfair Display 48px / 700
- Text: #1A1A1A
- Decoration: none
- Use: top-of-page primary headline; the one display moment with full typographic weight

### Button

**Primary (pill)**
- Background: #E8B4B8 (rose)
- Text: #1A1A1A
- Border: none
- Radius: 9999px (full pill)
- Height: 48px
- Padding: 24px 32px
- Font: Noto Sans 15px / 500
- Use: primary CTA — "Jadwalkan Konsultasi", "Lihat Portofolio"

**Secondary (outline)**
- Background: transparent
- Text: #1A1A1A
- Border: 1px solid #1A1A1A
- Radius: 9999px
- Height: 48px
- Padding: 24px 32px
- Font: Noto Sans 15px / 500
- Use: secondary action — "Pelajari Lebih Lanjut"

### Header

**Transparent header**
- Background: transparent (lets white ground read through)
- Text: #1A1A1A
- Border: none
- Padding: edge-aligned to content grid
- Height: auto (min 64px)
- Font: Noto Sans 15px / 500
- Use: continuous surface from header into content; no chrome, no shadow

### Section Divider

- Height: 2px solid #E8B4B8
- Width: 48px
- Alignment: matches heading alignment
- Use: subtle rose accent between editorial sections

## 5. Layout Principles

The layout is editorial and invitation-like, built on generous whitespace and a continuous white ground. The transparent header dissolves into the content so the page reads as one uninterrupted surface. Hierarchy is established through the typographic step — hero (48px Playfair) → section (28px Playfair) → body (15px Noto Sans) — and through the rhythm of negative space rather than through dividers or boxes. The rose accent appears as a thin section divider and as the primary pill button — two small gestures of warmth in an otherwise monochrome field. On a multi-section landing page, each section breathes with 64px vertical padding, and content blocks align to a clean 12-column grid. Treat layout as editorial composition: let whitespace breathe, let the type hierarchy lead, and let the rose accent punctuate rather than decorate.

## 6. Depth & Elevation

This is a flat system. There are no shadows, gradients, or elevation layers — the header is transparent and surfaces sit at a single plane on the white ground. Depth comes from contrast (near-black ink against white) and from editorial spacing, not from stacking or drop shadows. Keep elements coplanar; if separation is needed, use whitespace and the typographic hierarchy. The only curvature is the pill button (9999px radius), which softens the action without implying lift. Restraint applies to depth exactly as it applies to color.

## 7. Do's and Don'ts

### Do
- Keep the palette restrained: #FFFFFF ground, #1A1A1A ink, #E8B4B8 rose as the sole warm accent.
- Reserve Playfair Display for headings and brand display moments.
- Set body in Noto Sans at 15px with 1.6 leading.
- Use the pill button (48px, 9999px radius) as the primary action shape.
- Keep the header transparent and surfaces flat.
- Apply rose accent sparingly — section dividers and primary button only.

### Don't
- Use rose (#E8B4B8) as a background fill or dominant color — it is an accent, not a surface.
- Add shadows, gradients, or elevation; the system is flat.
- Substitute a generic sans-serif for Playfair Display in brand moments.
- Crowd the layout — whitespace is structural.
- Box content with borders or fills; let contrast and spacing do the work.

## 8. Responsive Behavior

The editorial, whitespace-driven layout scales naturally from desktop (12-column grid, max-width 1200px) to tablet (8-column) to mobile (4-column). The typographic hierarchy compresses: hero 48px → 36px → 28px on mobile; section 28px stays at 28px but leading narrows; body 15px stays. The pill buttons remain touch-friendly at 48px height across all widths. The transparent header collapses to a hamburger menu on mobile, keeping the white ground uninterrupted. Adapt qualitatively: preserve generous whitespace, maintain the monochrome + one-rose-accent palette, keep the flat single-plane surface, and let the type hierarchy — not added chrome — communicate structure as the viewport narrows.

## 9. Agent Prompt Guide

When generating UI in the Akara Rahsa style, instruct the agent: "Design an editorial, monochrome-warm landing page — white (#FFFFFF) ground, near-black (#1A1A1A) ink, with a single rose (#E8B4B8) accent used sparingly (primary button, section dividers, selected headings). Use Playfair Display (weights 600/700) for headings and brand moments, and Noto Sans (15px, 1.6 leading) for body. Keep everything flat — no shadows, no gradients, no elevation, transparent header. Primary button is a pill at 48px height, rose fill, near-black text; secondary is outline. Section padding is 64px vertical. Whitespace is generous and structural. The rose accent should not exceed ~10% of any viewport. Typography hierarchy: hero 48px → section 28px → body 15px."

## 10. Voice & Tone

The voice is quietly confident and editorial, with a warmth that the Hyundai Card inspiration deliberately withholds. It speaks like a trusted wedding curator — knowledgeable, discerning, but never cold. There is no shouting, no urgency, no decorative flourish in the language. The message lands through clarity and taste. The tone moves between cultured authority (when describing craft) and warm invitation (when speaking to couples). Like the one-rose accent in the visual system, the voice lets a single note of warmth humanise an otherwise restrained editorial register.

## 11. Brand Narrative

Akara Rahsa began in 2026 as a wedding-content studio built on a simple belief: that a wedding story deserves the same editorial care as a feature in a design magazine. In a market where wedding media often leans toward the decorative and the generic, Akara Rahsa chose the opposite direction — restraint over ornament, editorial over ornamental, genuine narrative over formulaic coverage. Every couple's story is treated as a design problem: how to let their day feel like itself, framed with the same typographic discipline and visual quiet that a gallery applies to its exhibits. The brand's central idea is that the most luxurious thing you can give a wedding story is space — space to breathe, space to be seen, space to be remembered. The rose accent is not decoration; it is the one note of warmth that says this is not a cold gallery but a human one.

## 12. Principles

- **Edit relentlessly.** Every image, every word, every element earns its place. If it doesn't serve the story, remove it.
- **Let the couple lead.** The brand voice is editorial, but the couple's story is the content — frame it, do not overshadow it.
- **Restraint as luxury.** Remove before you add; whitespace and contrast do the structural work.
- **Flat and honest.** No shadows, no gradients, no chrome — a single clean plane.
- **One warm gesture.** The rose accent (#E8B4B8) is the system's only chromatic concession, reserved for the button and the section divider.
- **Typography is the signature.** Playfair Display carries the editorial weight; treat it as the brand's primary expressive material.

## 13. Personas

- **The discerning couple** — values craft and taste over flash; they chose Akara Rahsa because they trust editorial restraint over ornamental excess. They expect the interface to feel as curated as the final album.
- **The wedding vendor partner** — photographers, planners, venues who collaborate with Akara Rahsa and recommend the brand to their own clients. They look for professional credibility and visual sophistication.
- **The inspired browser** — not yet engaged or actively planning, but drawn to the editorial quality of the brand. They may not convert immediately, but the brand impression plants a seed for when the time comes.

## 14. States

The system favors flat, high-contrast defaults over elaborate interactive feedback. Default surface is #FFFFFF ground with #1A1A1A text. The primary button defaults to rose (#E8B4B8) fill with near-black text. Hover and pressed states are derived qualitatively in keeping with the monochrome-warm philosophy: the primary button shifts to a darker rose tone on hover; the secondary outline button inverts (fill #1A1A1A, text #FFFFFF); links underline on hover. Feedback is restrained — subtle opacity or tint shifts rather than colored state changes. No error or disabled states are specified; derive them with the same editorial restraint (e.g., a disabled button at 40% opacity, error text in near-black with a rose indicator).

## 15. Motion & Easing

Motion should be quiet, minimal, and unobtrusive — transitions that respect the editorial calm rather than drawing attention to themselves. The flat, restrained system implies subtle, understated movement: gentle fades (300–400ms, ease-out) for content reveals, clean crossfades for image transitions, and a slow, deliberate scroll rhythm enabled by generous section padding. For the rose accent elements (button hover, divider reveal), a slightly warmer easing curve (cubic-bezier(0.34, 1.56, 0.64, 1) — a gentle overshoot) can be used sparingly. Do not add motion as decoration; every transition should serve clarity and pace.

---

**Bootstrapped from:** Hyundai Card (hyundaicard)
**Context:** Wedding content creator landing page — calon pengantin + vendor pernikahan
**Delta:** Ink shifted from #000000 to #1A1A1A; rose accent (#E8B4B8) added as sole warm gesture; typography adapted from proprietary Youandi to Playfair Display + Noto Sans; body size increased to 15px for readability; voice warmed from editorial-neutral to editorial-warm.
