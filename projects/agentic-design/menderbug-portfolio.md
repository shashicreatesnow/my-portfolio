# Menderbug — Portfolio Case Study Plan

> What to show on the portfolio. Positioning: *A designer who identifies real workflow problems, designs the right UX solution, and ships it end-to-end using agentic coding.*

---

## Positioning Strategy

**The story in one line:**
> "I use Midjourney. I use Flow. The images are fine. The experience is not. So I built the tool that was."

**What this case study proves:**
- I diagnose real friction — not imagined problems
- I design solutions UX-first, not tech-first
- I understand that AI models are commoditizing — packaging is the new battleground
- I ship. Agentic coding is my execution layer; the design thinking is mine.
- When a tool doesn't fit my workflow, I build my own.

**What this case study should make people feel:**
- *First reaction:* "Yes, I've felt that."
- *Second reaction:* "I didn't know a designer could build this."
- *Third reaction:* "I want to talk to this person."

**What NOT to show:**
- AI prompt snippets, Claude conversation screenshots
- Anything that reads as "I wanted to play with AI"
- Raw code screenshots

---

## Story Arc

Same structure as the full story, but emotionally tighter and visually richer:

1. **The Hook** — frustration, specific and visceral
2. **The Pain Points** — four real scenarios anyone can feel
3. **The Insight** — the line the whole case study hangs on
4. **The Product** — three surfaces, each solving a specific pain
5. **The Design Decisions** — opinionated, named, defended
6. **The Tech Stack** — show engineering literacy
7. **The Craft** — agentic coding as a practiced skill
8. **The Bigger Pattern** — this is what I do, repeatedly
9. **Results + Close** — the payoff

---

## Image Plan (8 slots)

| # | Image | Placement |
|---|---|---|
| **1** | Product hero — Images tab in action | Hero (full-width) |
| **2** | Gallery: Image generation surface (3 screens) | After Images section |
| **3** | Single image — Iteration timeline with branching (the signature feature) | Iteration section, full-width |
| **4** | Gallery: Chat surface (3 screens) | Chat section |
| **5** | Single image — Categorized references close-up | Design Decisions section |
| **6** | Gallery: Cross-surface flows (3 screens) | Design Decisions section |
| **7** | Single image — History/search view | Before Tech Stack |
| **8** | Single image — Tech stack or deployment visual | End of Tech Stack |

**Total: 4 singles + 3 galleries (9 inside) = 13 screens shown**

---

## CMS Block Structure

### Hero
- `image` (full-width) — **IMAGE 1: Product hero** (Images tab in action)

### Opening
- `text` — "**I use Midjourney. I use Flow. The images are fine. The experience is not.** So I built my own — **Menderbug**. An AI image generator made for how designers actually work. **Built in 3 hours. In daily use since.**"
- `metric_row` — **3 hrs** to MVP | **Solo** built | **Daily** use

### The Pain — a real day in the life
- `divider`
- `heading1` — "A Bad Workflow, On Repeat"
- `text` — "Imagine this. You're designing a poster. You need a hero image, and AI is faster than a stock search. You open Midjourney. This is what the next two hours actually look like:"

- `heading2` — "You write a prompt. The tool forgets."
- `text` — "You generate an image. It's close. You want to push it in a new direction. You write another prompt. The tool has no memory of the previous result. You scroll back through Discord, looking for the image from five minutes ago. You can't find it. You copy the old prompt, tweak two words, cross your fingers, and regenerate. You do this thirty times in a session. Every single generation is a fresh start in a tool that doesn't remember you."
- `callout` — "The experience of prompting in every major AI image tool right now" / "Monologue, not dialogue"

- `heading2` — "You have references. The tool doesn't care how you think about them."
- `text` — "You're not just 'inspired' by a mood. You have one reference for the subject. A different one for the layout. A third for the typography. A fourth for the color palette. You drop all four into the tool. The AI treats them as one blob of 'inspiration.' Which reference was for the composition? Which was for the color? It doesn't know. Neither does your result."
- `callout` — "Designers think in structured reference" / "Every tool treats references like a dump"

- `heading2` — "You get a good result. Then you lose it."
- `text` — "You generate something that's actually working. You want to try three variations from it. Each new prompt overwrites the last. Or the variations pile up in a Discord thread and you can't tell which one was the good one. Three days later, you want to come back to where you left off. Good luck. The good one is buried under 200 later generations that weren't as good."
- `callout` — "Iteration should feel like sculpting" / "Most AI tools make it feel like gambling"

- `heading2` — "You need to think. You need to switch tools."
- `text` — "You want feedback on a result. You open ChatGPT. Paste the image. Describe the context. Get thoughts. Now you want to generate again. You close ChatGPT, go to Midjourney, can't remember what ChatGPT suggested, alt-tab, copy, paste, alt-tab back. Lose the thread. Lose the context. Try to remember what the client originally asked for. Where was that conversation? Which tab?"
- `callout` — "Ideation in one tool. Generation in another. Feedback in a third." / "Context collapses every time you switch"

### The Insight
- `divider`
- `heading1` — "I Wasn't Solving for Pixels"
- `text` — "Every existing AI image tool is optimized for one thing: **generate a cool image**. But that's not what a designer is doing all day. A designer is *dialing in the right image* through iteration, with tight reference control, while maintaining context across generation, feedback, and ideation."
- `text` — "The models are fine. The quality is converging. **The next layer of value in AI tools isn't pixels — it's the workflow that wraps them.**"
- `callout` — "The insight" / "I wasn't solving for better pixels. I was solving for a designer's workflow." / "That's the whole product."

### The Proof — Build Speed
- `divider`
- `heading1` — "Built in One Sitting"
- `text` — "Because the problem was personal, I didn't need discovery. Because I've practiced agentic coding as a discipline, I didn't need engineering help. Menderbug went from idea to deployed product in about **three hours** — one evening."
- `metric_row` — **3 hrs** Idea to Live | **10+** AI Features | **3** Product Surfaces
- `callout` — "The unlock" / "When you can build the tool faster than you can keep using the wrong one" / "The math flips in the designer's favor"

### The Product
- `divider`
- `heading1` — "Three Surfaces, One Workflow"
- `text` — "Menderbug is structured around how designers actually use AI image tools, not how the models want to be prompted. Three surfaces, each fixing a specific pain from above. They share history, they share state, they share a design language."

### Images Tab
- `heading2` — "🎨 Images — Generation, Finally Right"
- `text` — "Text-to-image with aspect ratio, variant count, and structured reference control. Prompt enhance for when the idea is there but the language isn't. Download with one click. Everything you've ever made, searchable in the sidebar forever."
- `gallery` (3 cols) — **IMAGE 2: Image generation surface**
  - Screen: Prompt input with categorized references attached
  - Screen: Variant picker with multiple outputs side-by-side
  - Screen: Generated result with Iterate / Discuss / Download actions on hover

### Iteration — the signature feature
- `divider`
- `heading1` — "🔁 Iteration — Sculpting, Not Gambling"
- `text` — "This is the feature that made the whole product worth building. Every other AI image tool treats iteration as 'generate again.' Menderbug treats it as a **container** — with memory, structure, and branches."
- `list` (bulleted):
  - **Threads** — start an iteration from any image. Every new version is a step in that thread.
  - **Indefinite iteration** — dial in the result across as many steps as you need, without losing a single one
  - **Timeline view** — see the evolution of an idea laid out linearly
  - **Branching** — any step can spawn a new branch. Explore divergent directions without destroying the original.
  - **Any historical image is iterable** — something you made three weeks ago, click once, start iterating.
- `image` (full-width) — **IMAGE 3: Iteration timeline with branching** — the signature UI
- `callout` — "Iteration as a first-class concept" / "Threads, timelines, branches — the structure matches how design exploration actually works"

### Chat Tab
- `divider`
- `heading1` — "💬 Chat — Ideation Without Tool-Switching"
- `text` — "Because switching between ChatGPT and your image tool is where context dies. Menderbug has Gemini chat built in — with four design-focused personas and seamless handoff to image generation. No more alt-tab grief."
- `list` (bulleted):
  - **Streaming replies** with full Markdown (headings, bullets, code blocks)
  - **Image attachments** — drag-drop or paste any image for design feedback
  - **Four personas** — Default (balanced), Design Critic (blunt), Ideation Partner (wild), Prompt Engineer (briefs to prompts)
  - **Auto-title** — threads rename themselves after your first exchange
  - **Send to Images** — turn any chat reply into a generation prompt without leaving
- `gallery` (3 cols) — **IMAGE 4: Chat surface**
  - Screen: Chat with markdown-rendered response
  - Screen: Persona picker with four options
  - Screen: Image attached for design feedback

### The Design Decisions
- `divider`
- `heading1` — "The Design Calls That Make It Work"
- `text` — "Every feature has an opinion behind it. These are mine."

- `heading2` — "Categorized References, Not a Reference Dump"
- `text` — "Every AI tool has 'drop some references.' I broke references into five slots that map to how designers actually think — **Subject, Structure, Font, Color Theme, Visual Style**. This isn't rigidity; it's scaffolding. The AI gives better output because it knows which input means what."
- `image` — **IMAGE 5: Categorized references panel** — close-up of the 5 slots

- `heading2` — "Personas, Not System Prompts"
- `text` — "Designers don't want to write system prompts. They want to say 'critique this' or 'give me ideas' and have the AI show up in the right mode. Four built-in personas cover 95% of real use cases."

- `heading2` — "Branching, Not Forking"
- `text` — "Branches share ancestry but diverge after a specific step. This matches how design exploration actually works — you have a good direction, you want to try two variations from there, you want to keep both without losing the original."

- `heading2` — "Cross-Surface Flows"
- `text` — "The three tabs aren't silos. Any image can jump to Chat with itself attached. Any chat message can become a generation prompt. Any image in history can start an iteration thread. The workflow flows between surfaces without losing state."
- `gallery` (3 cols) — **IMAGE 6: Cross-surface flows**
  - Screen: "Discuss" action on a generated image opening Chat
  - Screen: "Send to Images" from a chat reply
  - Screen: "Start iteration" from history sidebar

- `heading2` — "Permanent, Searchable History"
- `text` — "Every image you've ever made is in the sidebar. Search by prompt text. Click to iterate. Click to discuss. Nothing buried, nothing lost, nothing forgotten."
- `image` — **IMAGE 7: History view** with search

### The Tech Stack
- `divider`
- `heading1` — "The Stack"
- `text` — "I pick tools the way I pick design systems — intentionally. Every piece was chosen for a reason."
- `columns_2`:

  **Column 1 — Frontend**
  - Next.js 16 (App Router, Turbopack)
  - React 19 + TypeScript
  - Tailwind CSS v4 + shadcn/ui
  - Sonner (toasts), React Markdown
  - Lucide icons

  **Column 2 — AI, Data & Infra**
  - `@google/genai` — Gemini Nano Banana (image + streaming chat)
  - Neon Postgres (serverless HTTP driver)
  - Vercel Blob (image storage)
  - NextAuth.js 5 + Google OAuth with email allow-list
  - Vercel (Fluid Compute for streaming)

- `callout` — "Production-grade stack" / "Streaming chat, serverless Postgres, email allow-list auth — no toy frameworks, no experimental tools" / "Every choice optimized for shipping fast and staying cheap"
- `image` — **IMAGE 8: Tech stack or deployment visual**

### Agentic Coding — the execution skill
- `divider`
- `heading1` — "Shipped in 3 Hours"
- `text` — "Menderbug came together in a single evening. Two reasons: the problem was personal (I didn't need discovery — I had months of friction to draw from), and I've practiced agentic coding as a discipline. The speed isn't a flex — it's a consequence of the workflow."

- `heading2` — "How I Actually Worked"
- `list` (numbered):
  - **I described what I wanted.** "Categorized reference slots — up to 5 images, each tagged by role, drag-drop, keyboard support." Clear intent beats clever code every time.
  - **AI generated, I reviewed.** Every line before commit. Not to edit it — to understand it. That's how I learned what my app is doing.
  - **Convention files kept it coherent.** A `CLAUDE.md` and `AGENTS.md` at the root warned the AI about framework version specifics, naming rules, and design conventions — so every session stayed aligned.
  - **Parallel work.** Different agents on different features — one on iteration threads, one on the auth allow-list, one on the reference panel — shipping into the same codebase.
- `callout` — "I don't wait for engineering" / "I design the product, direct the agents, review the output, and ship it" / "Agentic coding is the execution layer. The design is mine."

### The Bigger Pattern
- `divider`
- `heading1` — "If a Tool Doesn't Fit, Build Your Own"
- `text` — "This isn't a one-off. It's the pattern I've been running on repeat. Menderbug fixed my image generation workflow. **Gamma** automated my thumbnail production. **SkillIssue** turned friend dares into a real product. Every time I hit meaningful friction, I reach for agentic coding and build the thing that doesn't exist yet."
- `text` — "The week of building costs less than the months of working around the wrong tool. That's the real unlock agentic coding gives designers: **the ability to solve your own problems as fast as you notice them.**"

### Results
- `divider`
- `heading1` — "Results"
- `metric_row` — **3 hrs** Build | **3** Tools Replaced | **Hours/week** Saved
- `list` (bulleted):
  - Complete AI image + chat + iteration product, shipped solo in 3 hours
  - My daily generation tool — replaced my Midjourney + ChatGPT + screenshot-folder workflow entirely
  - Hours saved every week on a workflow I used to run on broken tools
  - Every feature validated by real use, not speculation
  - Email allow-list so trusted collaborators can use it too

### What I Learned
- `heading2` — "What I Learned"
- `list` (numbered):
  - AI models are commoditizing — the value has moved to UX and workflow packaging
  - Solving your own problem is a cheat code — you're the user, the research, and the QA
  - Structure creates creativity — categorized references beat a reference dump
  - Iteration and branching are underrated — most AI tools treat generation as linear, but design is exploratory
  - The ceiling on what a designer can build keeps rising — agentic coding is the escalator

### Closing
- `quote` — "The models are fine. The experiences aren't. I build the experiences."

---

## Tone Notes

- **Start with frustration, specific and visceral.** The four pain-point scenarios are the emotional hook. Get the reader nodding before you reveal the product.
- **Each pain point has a callout.** One-liner summary of the frustration, so even a skimmer understands.
- **The insight is THE line.** "I wasn't solving for better pixels. I was solving for a designer's workflow." Everything hangs on it.
- **Opinionated design takes.** Every decision has a "why" — categorized references, branching, personas, cross-surface flows.
- **Tech-savvy readers nod.** Engineering stack visible, Fluid Compute / streaming / RLS language shows literacy.
- **Close with the repeating pattern.** "Build your own tools" ties Menderbug, Gamma, and SkillIssue into one consistent career thesis.
- **Final quote is a thesis statement.** "The models are fine. The experiences aren't. I build the experiences."
