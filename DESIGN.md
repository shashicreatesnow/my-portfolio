# Design System — Shashi Pratap Singh Portfolio

## Product Context
- **What this is:** Personal portfolio + CMS for a product & brand designer who builds AI systems
- **Who it's for:** Hiring managers, clients, collaborators in the AI/product space
- **Space/industry:** AI / design — peers researched: Anthropic, Linear, Vercel, Mistral, Cursor
- **Project type:** Marketing/editorial site (public) + admin CMS (untouched by this system)
- **Memorable thing:** "Serious AI craft" — this person engineers design systems, the colorful 3D brain is the signature moment

## Aesthetic Direction
- **Direction:** Ink & Signal — dark editorial precision ("terminal phosphor meets print studio")
- **Decoration level:** intentional — paper grain survives as subtle dark texture; the brain is the only vivid object
- **Mood:** A precision instrument made by hand. Dark stage, bone type, one electric accent.
- **Rationale:** Previous cream/terracotta palette read as "Anthropic at 60% opacity" (user: "looks like cloud"). Dark carbon + lime is ownable in the AI space — no major lab uses it.

## Color — "Ink & Signal Lime" (v2, replaces paper theme 2026-07-26)
- **Approach:** restrained — monochrome carbon base, ONE accent, brain carries all multicolor
- **Backgrounds:** default `#0A0A09` (near-true black — user: "more blacker", no green cast) · surface `#141312` · popover `#1B1A18`
- **Text:** primary `#F2EFE9` (bone) · muted `#A9A69A` · soft `#7E7B6F` · on-accent `#101208`
- **Border:** `#262421` (hairlines, dashed rules)
- **Accent:** `#C8F03F` Signal Lime — CTAs, active nav underline, italic serif accents, node dots. NEVER orange/coral/terracotta (reads as Claude/Anthropic).
- **Destructive:** `#FF4557` (errors only, never decorative)
- **Prism (3D brain + card image fallbacks):** rose `#FF6F91` · ochre `#FFA14E` · wheat `#FFD84D` · sage `#35B6C9` · plum `#9A7BFF`
- **Light mode (future/optional):** porcelain `#FAFAF7` · surface `#FFFFFF` · ink `#16150F` · muted `#6E6A61` · border `#E4E2DB` · accent stays `#C8F03F` for fills but use deepened `#7A9C0E` for text-level accent (contrast)
- **Dark mode:** IS the default. No separate dark variant needed.

## Typography (unchanged from v1 — part of the brand voice)
- **Display/Hero:** Geist Medium — 68px / 1.06 / -3.5%
- **Serif accents:** Instrument Serif Italic — hero accent line, arrows, pull quotes, "made by hand, mostly"
- **Body:** Geist Regular — 16.5px / 1.65
- **Kicker:** Geist Medium 11px, +20% tracking, uppercase
- **Code/Data:** Geist Mono
- **Loading:** Google Fonts (Geist, Instrument Serif, Geist Mono)
- **Scale:** H1 36 · H2 28 · H3 22 · H4 18 · body 16.5 · small 14 · meta 13 · kicker 11

## Spacing
- **Base unit:** 4px
- **Density:** spacious (editorial breathing room)
- **Scale:** xs(4) sm(8) md(12) lg(16) xl(20) 2xl(24) 3xl(32) 4xl(40) 5xl(48) 6xl(56) 7xl(64) 8xl(80)

## Layout
- **Approach:** hybrid — centered editorial hero, grid-disciplined work sections
- **Max content width:** 1080px (sections), 800px (case study prose)
- **Border radius:** sm 12 · md 14 · lg 16 · xl 20 · full 9999

## Motion
- **Approach:** intentional — fade-up on first paint, accent underline slide (280ms cubic-bezier(0.22,1,0.36,1)), node pulse
- **Duration:** micro 100ms · short 220ms · medium 280ms · long 700ms
- **Respect** prefers-reduced-motion

## Safe choices vs Risks
- **Safe:** monochrome base, one-accent discipline, bone-not-white text, typography unchanged
- **Risk 1:** dark portfolio in a sea of cream designer sites — memorable
- **Risk 2:** Signal Lime — loud, ownable, zero AI-brand collisions
- **Risk 3:** brain as the sole multicolor moment — everything else stays disciplined so it lands

## Rollout status
- [x] Direction locked + previews approved (accent-options.html, variant A)
- [x] Figma variables updated (Primitives renamed carbon/bone/lime + revalued 2026-07-26; primary Button rebound to accent)
- [x] Site implementation (globals.css token swap + hero/card fixes, 2026-07-26)
- [x] Live deploy (2026-07-26)

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-26 | Ink & Signal Lime v2 palette created | Cream/terracotta felt "cloud"-like and Anthropic-adjacent; researched Anthropic/Linear/Vercel/Mistral/Cursor; user chose "serious AI craft" + full rethink; explicitly banned orange (reads as Claude) |
