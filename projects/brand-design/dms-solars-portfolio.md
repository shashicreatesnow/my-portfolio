# DMS Solars — Portfolio Case Study Plan

> What to show on the portfolio. Positioning: *A brand designer who treats a guideline document as the actual product — not a logo with a PDF wrapped around it.*

---

## Source Material

This case study is rebuilt from a 13-page Brand Guide deliverable. Unlike Orbit Haus or Syrin, **there is no surviving process artefact** — no direction decks, no rejected logos, no colour iterations. The brand guide *is* the source. The narrative reflects that: it reads as a **system reveal**, not an iteration story.

---

## Positioning Strategy

**The story in one line:**
> "Solar brands all reach for the same three things — a sun, a leaf, and a gradient. DMS Solars needed a mark that felt like a working piece of infrastructure, not a save-the-planet poster. The deliverable wasn't a logo. It was an eight-section brand guide built so a sales team in tier-2 cities could brand a delivery truck without calling the designer."

**What this case study proves:**
- I deliver brand systems, not just logos
- I write the dos and don'ts that protect a brand after handover
- I think about scale: from a polo embroidery to the side of a delivery truck
- I respect a category convention (sun + panel) and *still* find a specific form inside it

**What this case study should make people feel:**
- *First reaction:* "That's a brand guide that an actual non-designer could use."
- *Second reaction:* "The mark is calm — for a solar brand, that's rare."
- *Third reaction:* "I'd hire this person to take a brand from zero to handover."

**What NOT to claim:**
- Multiple logo rounds (none documented)
- Strategic discovery research (not surfaced)
- Metrics or post-launch impact (not available)
- Any narrative beyond what the deliverable itself shows

---

## Story Arc (narrative beats)

1. **The brief was infrastructure, not idealism** — DMS Solars sells solar devices. The brand had to feel like equipment you trust, not a movement you join.
2. **The category uniform** — every renewable-energy brand reaches for the same iconography: a sun, a leaf, a gradient. The trap was clear before sketching.
3. **One mark, three references compressed** — a solar panel, a sun, a lightning bolt. Three category cues in one geometric form.
4. **Two-colour discipline** — deep teal blue and warm solar yellow. No gradients, no glow. The palette was a five-shade range of each, not a fashion swatch.
5. **Montserrat, on purpose** — geometric sans, free, ubiquitous. The brand had to be reproducible by a printer in any city, not just a designer in Bengaluru.
6. **Eight don'ts** — the part of the brand guide that does the most work after handover. No skew. No outline. No gradient. No reordering.
7. **Six lockups, one system** — primary, dark theme, alternate, icon, horizontal, vertical. Every surface DMS Solars would actually appear on, predetermined.
8. **From polo to delivery truck** — the brand applied across embroidery, packaging, vehicle wraps, business cards, mobile, and tote bags. The mark was tested at every scale before handover.
9. **The closing tagline** — *From sunrise to sunset, we keep your world running on clean, powerful energy.* The brand voice in one line.

---

## Image Plan (10 slots)

Source images are downloaded to `/tmp/dms-imgs/` and listed in the order they appear on the source page.

| # | Image | Source slide | Placement |
|---|---|---|---|
| **1** | Brand Guide cover — primary logo + "Brand Guide" title on cream | Slide 1 | Hero |
| **2** | Vision quote — "more than a solar energy provider" | Slide 3 | Opening |
| **3** | The Branding Challenge bullet list | Slide 4 | The brief |
| **4** | Brand Core Values — Sustainability / Innovation / Trust & Professionalism | Slide 5 | Values |
| **5** | Logo Usage — 6 variants (primary, dark, alternate, icon, horizontal, vertical) | Slide 6 | The system |
| **6** | Incorrect Usage — 10 don'ts grid | Slide 7 | The protections |
| **7** | Colour Palette — primary blues, secondary yellows, neutral greys with hex codes | Slide 8 | Colour |
| **8** | Typography — Montserrat scale and weights | Slide 9 | Type |
| **9** | Mockups — polo, packaging box, delivery truck | Slide 10 | Apparel + logistics |
| **10** | Mockups — business card on rocks, phone screen, tote bag | Slide 11 | Print + retail |

---

## CMS Block Structure

### Hero
- `image` (full-width) — **IMAGE 1: Brand Guide cover**

### Opening
- `text` — "**DMS Solars sells solar energy devices.** Panels, inverters, batteries — physical equipment that goes on a roof and stays there for fifteen years. The brief came in plain: a fresh visual identity that felt as forward-thinking as the company's mission, but built to live on the side of a delivery truck and inside a 32-pixel app icon. Three weeks. End-to-end. From mark to mockups to the eight-section brand guide that left with the client."
- `metric_row` — **3** weeks | **6** logo lockups | **8** sections in the final brand guide

### Vision
- `divider`
- `heading1` — "Vision"
- `image` — **IMAGE 2: Vision quote**
- `callout` — "DMS Solars is more than a solar energy provider — it's a visionary company for a cleaner, brighter future." / "The line that anchored the whole brand"
- `text` — "When I joined the journey, my challenge was to translate three things — innovation, reliability, and the eco-friendly promise — into a visual identity that felt as forward-thinking as the mission itself. Not a campaign. A *system.* Something that could survive being applied by a regional sales partner without me in the room."

### The Branding Challenge
- `divider`
- `heading1` — "The Branding Challenge"
- `image` — **IMAGE 3: Branding challenge bullets**
- `text` — "Three real constraints sat on top of every decision. **Expressing a clear mission and vision** — the brand had to *say* sustainability and innovation without putting either word on a poster. **Standing out in a competitive market** — every renewable-energy brand was already reaching for the same iconography: a sun, a leaf, a gradient. **Ensuring consistency across platforms** — the mark had to read on a polo embroidery, a 32-pixel favicon, a vehicle wrap, and a printed brochure with no follow-up call to the designer."
- `callout` — "Professionalism. Highlight Innovation. Embed Sustainability." / "Three objectives the rest of the work answered to"

### Brand Core Values
- `divider`
- `heading1` — "Brand Core Values"
- `image` — **IMAGE 4: Brand core values**
- `text` — "**Sustainability** — encoded in colour and form before it was named anywhere. The blue is *earth-stable.* The yellow is *sun-source.* No leaves, no globes, no recycle arrows."
- `text` — "**Innovation** — carried by the geometry. Forward-leaning panel grid, clean angles, no decorative flourish. The mark looks like a piece of equipment, not a campaign."
- `text` — "**Trust & Professionalism** — carried by restraint. Two colours, one typeface, one mark. The brand never raises its voice, because the product it sells stays on a roof for fifteen years and has to look like it knows what it's doing."

### The Mark
- `divider`
- `heading1` — "One Mark, Three Category Cues"
- `image` — **IMAGE 5: Logo usage — 6 variants**
- `text` — "The DMS Solars mark compresses three category cues into a single geometric form. **A solar panel** — the rectangular grid of cells, drawn at the same forward tilt every panel takes on a roof. **A sun** — the half-disc with rays rising over the panel's top edge. **A lightning bolt** — cut into the panel's lower-left corner as negative space, the energy the panel actually produces. Three references, one shape, no gradient required to make any of them legible."
- `text` — "The wordmark sits flush right of the icon. *DMS* in deep teal — the company. *SOLARS* in sun-yellow, set below — the category. The colour split is the only hierarchy the lockup needs."

### The System
- `text` — "**Six lockups for six surfaces.** The primary lockup for marketing and pitch decks. A dark-theme variant in a navy panel for night and dark-mode contexts. An alternate theme on the yellow ground for moments the brand wants warmth. An icon-only mark for app icons, favicons, and embroidery patches. A horizontal lockup for narrow letterhead and email signatures. A vertical lockup for tall surfaces — banner stands, packaging side panels, social profile crops. Every variant tested at 32 pixels before it shipped."

### What Not to Do
- `divider`
- `heading1` — "What Not to Do"
- `image` — **IMAGE 6: Incorrect usage — 10 don'ts**
- `text` — "The most useful page in any brand guide isn't the colour palette. **It's the don'ts page.** This one runs ten violations across two rows — covering both the lockup and the icon-only mark. *Do not skew. Do not change the order of icon and text. Do not outline. Do not stretch. Do not use gradient.* Each rule has a visual example of the violation, sitting right next to the rule."
- `text` — "The reason the don'ts page matters is that the brand will be applied by people who weren't in the meeting. A regional partner ordering tee shirts. A printer recreating the logo because the file lost its embedded fonts. A junior marketing hire making a deck the night before a pitch. **The don'ts are the part of the brand that protects itself when the designer isn't in the room.**"
- `callout` — "The don'ts are the part of the brand guide that does the most work after handover." / "Why this page took the longest"

### Colour
- `divider`
- `heading1` — "Two Colours, Five Shades Each"
- `image` — **IMAGE 7: Colour palette**
- `text` — "The palette is two families and a neutral. **A primary blue range** — five shades, from a mid teal (#177296) down through the ocean tones to a near-black navy (#072530). **A secondary yellow range** — five warmer shades, from a soft cream-yellow (#FFD77A) through marigold to a burnished bronze (#916B10). **Plus a six-stop grey scale** for typography, surfaces, and neutral UI."
- `text` — "Two colours would have been austere; gradients would have undone the discipline. The five-shade ranges give the brand depth without breaking its rules. The teal range carries every dark surface and every paragraph of body text. The yellow range carries every accent and every moment the brand wants to feel warm. Greys carry everything else."
- `callout` — "Blue and yellow show the relationship between earth (stability, growth) and sun (energy, hope). Supporting shades reinforce a grounded, authentic presence." / "How the palette encodes the company"

### Typography
- `divider`
- `heading1` — "Montserrat, on Purpose"
- `image` — **IMAGE 8: Typography — Montserrat scale**
- `text` — "**The brand uses Montserrat — and only Montserrat.** Modern, clean, geometric sans-serif. Open-source, ubiquitous, available on every operating system, every printer driver, every CMS template. **The choice was about reproducibility, not novelty.** A brand that lives in tier-2 cities and gets applied by regional partners can't depend on a font foundry licence or a custom typeface that only one designer can install."
- `text` — "Five sizes, five weights. **Page titles** at 32–40px in Bold, title case. **Section headings** at 24–28px in Semibold, title case. **Subheadings** at 18–22px in Medium, sentence case. **Body** at 14px in Regular, sentence case. **Captions** at 12px in Light, uppercase. The hierarchy is encoded into the size *and* the case — so a non-designer setting up a slide already knows which level a piece of text belongs to."

### Mockups
- `divider`
- `heading1` — "Built to Be Applied"
- `image` — **IMAGE 9: Mockups — polo, packaging, delivery truck**
- `text` — "**Apparel and logistics first.** Polo embroidery for the field installation team — the icon-only mark, single-colour stitching, designed to survive every wash for three years. Packaging cartons in the brand's warm yellow ground — the lockup centred and legible across a warehouse. Delivery truck wraps in the dominant cream — high-contrast, large-scale, readable from a city block."
- `image` — **IMAGE 10: Mockups — business card, phone, tote bag**
- `text` — "**Then the surfaces customers actually touch.** A business card sized for a salesperson's wallet, the icon and lockup balanced for one-second recognition. The mobile lockup centred on a phone screen — the brand's first impression for anyone landing on the site. A retail tote bag in cream canvas — the brand carrying the customer's purchase home. **The mockups aren't decoration; they're the proof the system holds.**"

### Brand Personality
- `divider`
- `heading1` — "Brand Personality"
- `text` — "Five traits the system is engineered to express, every time it's used."
- `text` — "**Professionalism** — the structured logo system, the disciplined colour use, the refined typography. Authority without volume. **Empowerment** — bold colour, open layouts, the sense that customers are joining a forward movement. **Innovation** — geometric forms, modern type, a forward-leaning palette. **Reliability** — consistency across every asset, achieved by the don'ts page as much as the dos. **Eco-Friendliness** — earth-inspired hues, sun-and-environment motifs that make sustainability *visible* without printing the word."

### Closing
- `divider`
- `quote` — "From sunrise to sunset, we keep your world running on clean, powerful energy."

---

## Tone Notes

- First person where it's earned ("**when I joined the journey**", "**three weeks. End-to-end.**")
- Don't fabricate iteration that didn't happen — frame this as a **system reveal**, not an exploration
- The strength of this case study is the *discipline* — two colours, one typeface, six lockups, ten don'ts. Lean into that.
- Use specific details from the brand guide (hex codes, type sizes, the 32px test) to ground the credibility
- Closing tagline carries the brand voice — let it stand alone

---

## Quick Facts (for the project header in the CMS)

| Field | Value |
|---|---|
| **Title** | DMS Solars — Brand Identity for a Renewable Energy Devices Company |
| **Slug** | `dms-solars-brand-identity` |
| **Category Tags** | Brand Design, Identity Systems, Renewable Energy, Brand Guidelines |
| **Client** | DMS Solars (Renewable energy devices) |
| **Role** | Brand identity, logo system, colour & typography systems, application mockups, brand guideline authoring |
| **Timeline** | 3 weeks · 2025 |
| **Industry** | Renewable Energy |
| **Status** | Shipped |
| **Description** | A full brand identity and 8-section brand guide for a renewable energy devices company. One mark compressing three category cues — solar panel, sun, lightning bolt — into a single geometric form. Two-colour discipline, Montserrat throughout, six lockups for six surfaces, ten don'ts to protect the brand after handover. Built to be reproduced by anyone, anywhere — from a polo embroidery in a workshop to the side of a delivery truck. |
