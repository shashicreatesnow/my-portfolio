# Menderbug — The Full Story

> An AI image generator built for designers, by a designer who got tired of working around tools that weren't made for him.

---

## The Origin

I use Midjourney. I use Google Flow. The images are fine. The experience is not.

As a designer, I don't just want "pretty output." I want a tool that matches how I actually work. And the more I used generic AI image tools, the more I noticed the gaps:

- **Prompting is a monologue, not a dialogue.** You write a prompt, get an image, write another prompt. The tool forgets. You scroll back through Discord to find a previous result. Then you copy, paste, edit, cross your fingers.
- **References are an afterthought.** Designers think in structured reference — subject, layout, typography, color palette, visual style. Every tool lumps everything into "here are some images, figure it out."
- **Iteration is destructive or chaotic.** Either every new version overwrites the last, or you get a Discord thread with 200 images and no structure. Dialing in the right result should feel like sculpting, not gambling.
- **Ideation and generation live in different tools.** ChatGPT for brainstorming. Midjourney for images. Back to ChatGPT for feedback. Switch, switch, switch. Lose context every time.

The image quality wasn't the problem. The workflow was.

So I built my own tool. I named it **Menderbug**.

---

## The Core Insight

**I wasn't solving for better pixels. I was solving for a designer's workflow.**

Generic AI tools are built for "generate an image." Designers have a different goal: *dial in the right image through iteration, with tight reference control, while maintaining context across generation, feedback, and ideation.*

Menderbug was designed around that difference from day one.

---

## What Menderbug Is

Your own personal Gemini studio — but made for how designers actually work.

### Three Core Surfaces

**🎨 Images** — Text-to-image generation with structured reference control
**💬 Chat** — Design-focused conversation with image attachments and personas
**🔁 Iteration** — A dedicated space for threaded, branchable refinement

All three tabs share one history, one design language, one philosophy: **the tool adapts to the designer, not the other way around.**

---

## The Features (Why They Exist)

### Images Tab

- **Text-to-image** with aspect ratio picker (1:1, 3:4, 4:3, 16:9, 9:16) and variant count (1, 2, or 4)
- **Categorized references** — up to 5 images, each tagged by role: Subject, Structure, Font, Color Theme, Visual Style. Because "here's a dump of references" is not how a designer thinks.
- **Prompt enhance** — a ✨ button rewrites short prompts into richer, more visual ones using Gemini Pro. You describe the idea in your own words; the AI handles the prompt engineering.
- **Download** with one click
- **Search history** that lasts forever — everything you've ever generated is right there in the sidebar

### Chat Tab

- **Streaming replies** with full Markdown (headings, bullets, code blocks, bold)
- **Image attachments** — drag-drop or paste images right into the chat for design feedback
- **Four built-in personas** — *Default* (balanced), *Design Critic* (blunt, specific), *Ideation Partner* (8-12 wild ideas), *Prompt Engineer* (turns briefs into copy-paste prompts)
- **Auto-title** — threads rename themselves after your first exchange
- **Send to Images** — turn any chat message into an image generation prompt without leaving the conversation
- **Discuss from Images tab** — any generated image can jump straight to Chat with itself attached

### Iteration (the game-changer)

This is the feature that made the whole product worth building.

- **Threads** — start an iteration from any image. Every new version is a step in that thread.
- **Indefinite iteration** — dial in the result across as many steps as you need, without losing context
- **Timeline view** — see the evolution of an idea laid out linearly
- **Branching** — any step in any iteration can spawn a new branch, so you can explore divergent directions from the same starting point without destroying the original
- **Any historical image is iterable** — something you made three weeks ago? Click, and start iterating on it. No re-prompting from scratch.

### The Quiet Details

- **Google OAuth with email allow-list** — only accounts you explicitly name can get in. No open signup, no spam, no billing issues.
- **Dark mode by default** — because designers live in dark mode
- **Keyboard shortcuts** — Cmd+1 (Images), Cmd+2 (Chat), Cmd+Enter (send/generate)
- **Mobile responsive** but optimized for desktop (where designers actually do this work)

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | Streaming, server components, best-in-class DX |
| UI | Tailwind CSS v4 + shadcn/ui | Composable primitives, dark theme native |
| AI | `@google/genai` (Gemini Nano Banana) | Best-in-class image quality + streaming chat, single API for both |
| Database | Neon Postgres (serverless HTTP driver) | No connection pool to manage, free tier generous |
| Storage | Vercel Blob | One-click setup from Vercel dashboard, fast delivery |
| Auth | NextAuth.js 5 + Google OAuth | Industry standard, email allow-list pattern is trivial to implement |
| Hosting | Vercel | Fluid Compute for streaming chat, zero-config Next.js |
| Other | Sonner (toasts), React Markdown (message rendering), Lucide (icons) | Lightweight, well-maintained |

---

## Database Design

**Three tables in migration 001:**
- `generations` — every image with its prompt, aspect ratio, references, output URL
- `chat_threads` — conversation containers with auto-generated titles
- `chat_messages` — individual messages with role, content, attachments

**Migration 002 — the iteration layer:**
- `iteration_threads` — a separate container for iteration conversations (distinct from chat threads)
- `generations.iteration_thread_id` — a nullable foreign key. NULL means one-shot generation, non-NULL means this is a step in an iteration.
- `generations.reference_meta` — JSONB column storing categorized references `{ subject, structure, font, colorTheme, visualStyle }`
- **A trigger** on insert bumps `iteration_threads.updated_at` so the sidebar stays sorted by recent activity

The database does most of the work. When you iterate, the trigger handles thread ordering automatically. When you download history, a simple query returns it in chronological order.

---

## Agentic Coding Workflow

This was the fastest I've ever built a serious product. Three reasons:

### 1. The Problem Was Personal
I didn't need a discovery phase. I WAS the user. Every feature decision came from "I've been frustrated by this specific thing for months." That eliminated 90% of the usual product ambiguity.

### 2. Agentic Coding Compresses Execution
I described what I wanted:
- "Categorized reference slots — up to 5 images, each tagged by role. Drag-drop, click-to-add, remove. The slots are: Subject, Structure, Font, Color Theme, Visual Style."
- Claude generated the component, the state management, the validation, the API payload shape, the database schema update.
- I reviewed, pointed out what felt off, iterated.

Same loop for iteration threads, chat streaming, auto-titling, email allow-list auth. Everything.

### 3. Convention Files Kept It Coherent
A `CLAUDE.md` and `AGENTS.md` at the repo root kept the AI aligned across sessions. The AGENTS file even warns: "This is NOT the Next.js you know — this version has breaking changes, read the docs in `node_modules/next/dist/docs/` before writing any code." That single instruction saved hours of debugging generated code that referenced outdated APIs.

---

## Key Design Decisions

### Categorized References, Not a Reference Dump
Every image tool has "drop some references here." I broke references into five slots that map to how designers actually think:

- **Subject** — the thing itself (person, object, scene) — up to multiple
- **Structure** — layout, composition, camera angle
- **Font** — typography references
- **Color Theme** — palette inspiration
- **Visual Style** — mood, aesthetic, rendering approach

This isn't about being rigid. It's about giving the AI *structured* creative direction instead of hoping it figures out the hierarchy.

### Iteration as a First-Class Concept
Every other tool treats iteration as "generate again." Menderbug treats it as a *container*. An iteration thread has a start point, a timeline, and branches. You can come back to it weeks later. You never lose your work.

### Branching, Not Forking
Branches share ancestry but diverge after a specific step. This matches how design exploration actually works — you have a good direction, you want to try two variations from there, you want to keep both without losing the original.

### Personas, Not Custom System Prompts
Designers don't want to write system prompts. They want to say "critique this" or "give me ideas" and have the AI show up in the right mode. Four built-in personas handle 95% of the use cases:

- **Default** — balanced assistant
- **Design Critic** — blunt, specific, ruthless in a useful way
- **Ideation Partner** — 8-12 wild ideas at once, no filter
- **Prompt Engineer** — turns a design brief into a copy-paste image prompt

### Email Allow-List Auth
Open signup creates three problems: spam, billing risk, support burden. For a tool I built for myself and a small circle of trusted designers, none of those are worth dealing with. The allow-list is literally a comma-separated environment variable. Add emails, redeploy, done.

### Discuss → Send to Images → Back to Iteration
The three tabs aren't silos — they're connected. Any image can jump to Chat with itself attached. Any chat message can become the seed prompt for a new image. Any image can start an iteration thread. The workflow flows between surfaces without losing state.

---

## What Shipped

- **10 app routes** across Images, Chat, Iteration, History, Login, and the API namespace
- **35+ React components** across the four feature folders
- **10 API routes** — generate, edit, generations list, chat streaming, threads CRUD, auto-title, enhance-prompt, plus auth/callback handlers
- **2 database migrations** — 3 initial tables + the iteration layer + categorized reference metadata
- **Google OAuth with email allow-list** — locked down from day one
- **Streaming chat** — replies arrive word-by-word via Fluid Compute
- **Vercel Blob storage** — every generated image persists with a public URL
- **Neon Postgres** — serverless, free tier, one-click provisioned
- **Live on Vercel** — deployed and using daily

---

## What I Learned

1. **Solving your own problem is a cheat code.** I didn't need research. I had months of friction to draw from. Every feature was an obvious answer to a question I was already asking.

2. **UX is the only thing that matters in AI tools right now.** The models are commoditized. Quality is converging. The next layer of value is in who packages the capability best.

3. **Structure creates creativity.** Categorized references aren't a constraint — they're scaffolding. The AI gives better output because it knows which input means what.

4. **Branching is underrated.** Most AI tools treat generation as linear. Design is exploratory. Supporting divergence isn't a feature — it's a respect for how the work actually happens.

5. **Agentic coding rewards clarity.** "Build me a reference uploader" → chaos. "Up to 5 images, each categorized as Subject, Structure, Font, Color Theme, or Visual Style, with drag-drop and keyboard support" → clean implementation.

6. **If a tool doesn't fit your workflow, build your own.** The week-long frustration of using the wrong tool costs more than the few days of building the right one — when you have agentic coding at your disposal.

---

## Future Directions

- **Collaborative iteration threads** — share a thread with a teammate, both can branch from any step
- **Brand kit integration** — save categorized references as reusable bundles (brand palette, brand font, brand style)
- **Export presets** — "this image, but at 4 aspect ratios, two variants each, with these references" as a reusable workflow
- **Video support** — Gemini's video generation integrated into the same iteration model
- **Integration with Figma** — open any frame in Menderbug, run it through iteration, paste back

---

## The One-Line Version

*"I built the AI image tool I wished existed — and shipped it as a working product in a week, because I'm a designer who doesn't wait for engineering anymore."*
