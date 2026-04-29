# Syrin — Portfolio Case Study Plan

> What to show on the portfolio. Positioning: *A brand designer who tells the story of how the work got made — including the reversals, the close calls, and the specific moments a decision turned.*

---

## Positioning Strategy

**The story in one line:**
> "Most AI brand work is a logo with a backstory invented after the fact. This was the opposite — three real strategic directions, three real logo concepts, two real font systems, and one moment, the day before the client meeting, when I changed my own recommendation."

**What this case study proves:**
- I run a real client process — research, options, decks, decisions
- I have opinions and I revise them when the evidence demands it
- I can write about brand design like someone who actually did it, not like someone who read about it
- The system is a system, not a logo plus colors

**What this case study should make people feel:**
- *First reaction:* "I didn't think a brand case study could read like this."
- *Second reaction:* "I can see exactly how every decision got made."
- *Third reaction:* "I want to talk to this person."

**What NOT to show:**
- Final logo as the hero — it's a payoff, not the lede
- Bullet-pointed process diagrams
- "Brand identity that elevates a category-leading SaaS" — corporate brand-speak

---

## Story Arc (narrative beats)

1. **The brief that read like every other brief** — the founder sends a Notion doc with two reference sites. Both are blue. Both are dark mode.
2. **Three days of not sketching** — five AI brands, three thousand lines of notes, one pattern: the category has a uniform.
3. **Three directions, on purpose** — AI+HUMAN, EVERYTHINGISAI, MINIMAL. Each could have won. I had to argue all three honestly.
4. **The decision principle** — the brand has to argue the same thing as the product.
5. **Three logos, and the one I almost picked wrong** — The Knight was the cleverest mark on the page. The Spinner was the right one. I changed my recommendation the day before the meeting.
6. **The font choice was a navigation argument** — not typography
7. **Color as depth cue** — black and white on the surface, color only when the user goes deeper
8. **Eight documents to one brand** — the deck-by-deck cadence as the real deliverable
9. **The page that took longest** — the BTS sketches

---

## Image Plan (12 slots)

| # | Image | Source | Placement |
|---|---|---|---|
| **1** | Final brand cover spread — "SYRIN / Brand Identity Guidelines" | Final guideline | Hero |
| **2** | Gallery: 5 AI brand research thumbnails | Research files | After "three days of not sketching" |
| **3** | The three direction title pages stacked | Direction deck | Three directions intro |
| **4** | The /MINIMAL mood board — 9-image grid + 3-color palette | Direction deck p.9 | The decision moment |
| **5** | "Simple outside. Complex inside." spread | Final guideline | After decision |
| **6** | The three logo title pages stacked | Logo deck | Three logos intro |
| **7** | The Spinner concept page — Inception spinning top reference | Logo deck p.6 | The reversal |
| **8** | The Spinner mark large, on black + on light | Final guideline | Payoff |
| **9** | Logo system grid — primary, stacked, brandmark, wordmark | Final guideline | After payoff |
| **10** | The two font combos side by side — same content in both | Fonts deck | Font argument |
| **11** | Color-in-depth terminal mockup — light + dark | Fonts/colors deck | Color argument |
| **12** | BTS sketches — paper to vector | Final guideline BTS | Closing |

**Total: 4 singles + 4 galleries (10 inside) = 14 spreads shown**

---

## CMS Block Structure

### Hero
- `image` (full-width) — **IMAGE 1: Final brand cover spread**

### Opening
- `text` — "**A founder I'd never met sent me a Notion doc on a Monday.** The brief was clean — control plane for AI agents, runtime-level, the works. The references were two URLs and a screenshot of a dashboard he liked. I opened the URLs. They were both blue. They were both dark mode. They could have been the same brand. I closed the doc and went looking for what *not* to do."
- `metric_row` — **3** strategic directions | **3** logo concepts | **4** decks delivered

### Three Days of Not Sketching
- `divider`
- `heading1` — "Three Days of Not Sketching"
- `text` — "I didn't open a sketchbook for the first three days. I read instead. Five long-form brand audits — Claude, ChatGPT, Gemini, Grok, Perplexity. Three thousand lines of notes by the time I was done. Looking for what was already true about the category, before deciding what Syrin should add to it."
- `gallery` (3-column) — **IMAGE 2: 5 AI brand research thumbnails**
- `text` — "The pattern showed up around brand three. **Everyone was using blue.** Everyone was using dark mode. Every tagline said *powerful* or *intelligent.* The category had a uniform, and the brief I'd just been handed was, however unintentionally, asking me to design another one. The whole project pivoted on that observation. The job wasn't to design a good AI brand. The job was to design one that didn't disappear into the others."
- `callout` — "If a Syrin moodboard is indistinguishable from a Datadog moodboard, I've already failed." / "The principle the rest of the project ran on"

### Three Directions, On Purpose
- `divider`
- `heading1` — "Three Directions, On Purpose"
- `text` — "Strategy never converges in the first session, so I refused to. The first deliverable was a **Brand Direction Document** with three full directions, each with its own concept, mood board, color palette, and type philosophy. Three real options. Each one I could have honestly defended."
- `image` — **IMAGE 3: The three direction title pages stacked**
- `text` — "**/AI+HUMAN** said the provocative thing. Agents behave like humans — they fail, they leak, they go off-script. The brand visualized that with orange bleeding through black, like ink staining paper. Three fonts: a sans for the engineer, a serif for when agents talk to each other, a monospace for code. The bleed was the brand. Risky, memorable, easy to get wrong."
- `text` — "**/EVERYTHINGISAI** said the safe thing. Pure power. Mission control. Dark blue-black, electric blue glow, violet for the premium tier. Two fonts: Space Grotesk and Space Mono. Every CTO on the planet would understand it on first look. That was also the problem — they would understand it because they'd already seen it twenty times."
- `text` — "**/MINIMAL** said the quiet thing. Black and white on the surface, ninety percent of what users see. Color appears only when the user goes deeper into agent internals. The deeper you go, the more color you see. The surface stays calm. The depth is rich. The brand, if I built it right, would tell the same story as the product: *simple to use, complex to build.*"

### The Decision Principle
- `divider`
- `heading1` — "The Brand Has to Argue the Same Thing as the Product"
- `image` — **IMAGE 4: The /MINIMAL mood board**
- `text` — "Three good directions. One right one. I sat with it for an evening, and the answer came from outside the deck — from Syrin's product positioning. **Syrin is the platform that makes managing AI agents feel simple even though the underlying problem is hard.** That's the whole pitch. A brand that *looks* simple on the surface and *reveals* complexity on inspection isn't decoration. It's the positioning, made visible."
- `image` — **IMAGE 5: "Simple outside. Complex inside." spread**
- `callout` — "The brand and the product had to argue the same thing." / "The line that decided the project"

### Three Logos, and the One I Almost Picked Wrong
- `divider`
- `heading1` — "Three Logos, and the One I Almost Picked Wrong"
- `text` — "/MINIMAL set the rules: black-and-white only, geometric, must hold at 16px. Within those rules I sketched five concepts on paper, narrowed to three, and built each into a full **Logo Ideas Deck** with concept, versions, and a sidebar UI mockup."
- `image` — **IMAGE 6: The three logo title pages stacked**

- `text` — "**The Knight** was a chess knight built from the letter S. The knight is the only piece that jumps over obstacles, that reaches squares others can't — the strategic piece on the board. Syrin reaches into agent execution where no other tool can go. **And inside the mark, three horizontal cuts spelled S in morse code.** A hidden detail that only rewards close inspection. I love that detail. I still love that detail. It was the cleverest mark on the page."

- `text` — "**The Agent** was two figures interlocked in conversation, inspired by chat boxes and robots. About what happens *between* agents — the interaction layer. It also formed an S, which two of the three marks did. Conceptually rich. But when I dropped it into a 16-pixel favicon test, it broke into noise. It was the one that didn't survive the smallest size."

- `image` — **IMAGE 7: The Spinner concept page — Inception movie reference**
- `text` — "**The Spinner** was a spinning top — upper half an AI star (the machine), lower half two human legs (the manager). Inspired by Inception's spinning top — the object that exists between two realities, always testing which one you're in. Syrin operates at exactly that boundary: where human control meets AI execution."

- `text` — "I went into recommendation week thinking I'd argue for The Knight. The morse code S was a designer's mark — clever, hidden, the kind of detail that gets shared on Twitter. **The day before the meeting I rebuilt the deck. The Knight said *power.* The Agent said *connection.* Only the Spinner said *boundary* — and Syrin's whole positioning is built on the boundary between human and AI.** The cleverest mark wasn't the one that argued the brand's actual case. So I changed the recommendation."

### The Mark
- `image` — **IMAGE 8: The Spinner mark, on black + on light**
- `callout` — "One object. Two identities. Spinning at the boundary between human and AI." / "What the Spinner stands for"

- `text` — "Then the system. Primary lockup, stacked lockup, brandmark only (favicon, app icon, social avatar), wordmark only (footers, narrow contexts). Clear-space rule of x/2 around the lockup. Minimum sizes — 24px for the brandmark, 96px for the wordmark, never below. Two special-use color variants — Orange and Blue — for brand graphics only, never the standard logo. Eight don'ts, one of them just *don't recreate it*."
- `image` — **IMAGE 9: Logo system grid**

### Fonts Were a Navigation Problem
- `divider`
- `heading1` — "Fonts Were a Navigation Problem, Not a Typography Problem"
- `text` — "Type became its own deck — the **Fonts & Colors Document.** Two real font combinations, presented side-by-side with the *same content laid out in each:* the Syrin headline, the marketing body copy, the UI labels (12 active · 1 failed · 340ms · 99.7%), and the same terminal output. Same content, two voices."
- `image` — **IMAGE 10: The two font combos side by side**

- `text` — "**Option A was Geist + Geist Mono** — both designed by Vercel, same foundry, shared metrics, shared OpenType features. Option B was **Plus Jakarta Sans + JetBrains Mono** — a trusted dev-tool pairing, but two different foundries with two different design philosophies. Both were good. Picking the right one was a navigation problem in disguise."

- `text` — "Here's the thing about Syrin's product: in the dashboard, the user crosses from surface (sans-serif body text) into depth (monospace agent logs) **inside the same paragraph.** The font switch IS the moment they enter the machine. If the two fonts come from different foundries, that crossing feels like a glitch — like the page accidentally swapped CSS files. Same foundry means same skeleton, same rhythm, same air. The crossing feels like a step deeper into the same room. **The recommendation was Geist + Geist Mono. The client agreed in 24 hours.**"
- `callout` — "Geist for everything human-facing. Geist Mono the moment the user enters depth. The font switch is the navigation cue, not a styling choice." / "How type encodes depth"

### Color, Same Idea
- `divider`
- `heading1` — "Color, the Same Idea"
- `text` — "Color works the way type works. **The surface is black and white** — Pearl White (#FAFAFA) and Coal Black (#0F0F0F), interchanging by mode. Five greys for text, borders, and surfaces. That's almost everything the marketing site ever shows."
- `image` — **IMAGE 11: Color-in-depth terminal mockup, light + dark**
- `text` — "Color appears only in depth. **Orange (#E8652D) for inner workings.** **Blue (#2563EB) for data flow and active processes.** Both WCAG AA against black and white — non-negotiable for a developer tool. Plus the standard three system states — green, amber, red — for status only, never decoration."
- `text` — "The rule: **the deeper the user goes, the more color appears.** Marketing pages stay 99% black and white. The dashboard adds subtle status dots. The execution view floods in with blue and orange. The deepest debug view uses the full palette. Color isn't decoration — it's a depth meter. The user always knows how far in they are by how much color is on screen."

### Four Decks, One Brand
- `divider`
- `heading1` — "Four Decks, One Brand"
- `metric_row` — **38** pages | **6** sections | **4** decks led to it
- `text` — "By the time the final guideline shipped, it was the *eighth* document on the project. Brand Direction Document. Logo Ideas. Fonts & Colors. Each one a real client conversation, with a real decision at the end of it. The 38-page brand identity guideline was less a deliverable than a summary — six sections (Logo, Type, Color, Voice, Don'ts, BTS), the kind of document a Series A founder can hand to a future hire and have them build on-brand without a single follow-up question."

### The Page That Took Longest
- `divider`
- `heading1` — "The Page That Took Longest"
- `image` — **IMAGE 12: BTS paper sketches**
- `text` — "The longest page in the deck to design wasn't the cover. It wasn't the type spread. It was the BTS — the photographs of the original paper sketches, the Illustrator construction grid, the circles and intersections that became the final mark. I almost didn't include it. Most brand guidelines hide their messy origin. **But the whole project's argument was that the surface should reveal depth on inspection, and the brand's own origin story was a depth worth revealing.** So in it went, on the second-to-last page."

### Closing
- `quote` — "Brand identity isn't a logo. It's the smallest set of rules a team needs to make every future decision look like the same company."

---

## Tone Notes

- First person throughout — *I read*, *I sketched*, *I changed the recommendation*
- Use specific moments and times: "Monday," "the day before the meeting," "by brand three"
- Show reversals — the Knight rebuild is the spine of the whole story
- Treat the technical arguments (font foundry consistency, WCAG accents, favicon failure) as *plot points*, not bullet lists
- Resist the urge to summarize — let scenes carry the meaning
- The brand's own voice (Direct / Technical / Calm / Honest) is the voice of the case study itself

---

## Quick Facts (for the project header in the CMS)

| Field | Value |
|---|---|
| **Title** | Syrin — Brand Identity for an AI Agent Control Plane |
| **Slug** | `syrin-brand-identity` |
| **Category Tags** | Brand Design, Identity Systems, AI Infrastructure |
| **Client** | Syrin (AI agent control plane, B2B SaaS) |
| **Role** | Brand strategy, identity system, logo design, type & color systems, guideline authoring |
| **Timeline** | April 2026 |
| **Industry** | Developer Infrastructure / AI Infrastructure |
| **Status** | Shipped |
| **Description** | A full brand identity for an AI agent runtime control plane. Three strategic directions, three logo concepts, two font systems, one final 38-page guideline — delivered across four client decks. The brand mirrors the product: simple on the surface, complex in depth. |
