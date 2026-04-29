# SkillIssue — Portfolio Case Study Plan

> What to show on the portfolio. Positioning: "A designer who ships full-stack products end-to-end — making all the UX, design system, and engineering calls. Agentic coding is the execution layer, not the creative one."

---

## Positioning Strategy

**The story in one line:** A designer who designs the product AND builds it — UX, brand, design system, frontend, backend, database, deployed. Agentic coding lets me execute fast; the decisions are all mine.

**What this case study proves:**
- I make serious UX and design system decisions — not just pretty screens
- I can ship complete products end-to-end (frontend, backend, auth, realtime, storage)
- Agentic coding is a craft I've practiced, not a shortcut
- The designer is the protagonist — AI is the tool

**What to show:**
- The product screens. Lots of them. It's a beautiful, functional, well-considered app.
- The design decisions behind the screens — brand voice, typography, deterministic color identity, realtime UX
- The tech stack and engineering calls
- The agentic workflow as a practiced skill

**What NOT to show:**
- AI prompt screenshots or conversation snippets
- Anything that makes it look like "AI built this"

---

## Story Arc

### 1. The Hook
"Most designers ship Figma files. I ship apps." Open with a striking product screen.

### 2. The Product
"SkillIssue is a social challenge app. Friends stake real money on dares, upload proof, approve or reject each other. Every rupee tracked forever. Stake it, or shut up."

### 3. The Product Screens (the flex)
A proper tour of what the app looks like. Dashboard, challenge flow, approval, friends, fund, compare. This is where visitors realize it's not a toy — it's a complete product.

### 4. The UX Decisions (the designer chops)
This is where I show I'm a designer, not a prompt engineer. Realtime-first UX, deterministic player colors, auto-completion, scope reduction. Each decision had a reason.

### 5. The Design System
Typography, color, spacing, component vocabulary. Built the way a real design system is built — not generated defaults.

### 6. The Tech Stack
Name the tools. Show engineering literacy. Vercel, Supabase, Next.js 15, shadcn, Postgres, Edge Functions. The whole thing.

### 7. The Craft — Agentic Coding as a Skill
PRD-first, convention files, describe-don't-prescribe, review every line. This is how a designer directs AI engineers to ship production-grade work.

### 8. Smart Engineering Calls
Not a payment processor, realtime as design feature, business logic in the database. Show I made real tradeoffs.

### 9. Results + Learnings + Closing

---

## Image Plan (8 slots, mix of single images and galleries)

| # | Image | Placement |
|---|---|---|
| **1** | Product hero — landing page or dashboard hero shot | Hero (full-width) |
| **2** | Gallery: Core product screens (4 screens) — dashboard, create challenge, challenge detail, approval grid | After "Not a Prototype" section |
| **3** | Gallery: Friend & social screens (3 screens) — friends list, add friend dialog, notifications dropdown | After UX decisions section |
| **4** | Gallery: Money & ledger screens (3 screens) — fund overview, shared fund detail, payment approval | After "Business Logic in the Database" |
| **5** | Single image — Compare / rivalry view (the personality page) | Engineering decisions section |
| **6** | Design system image — typography + color + component stack | In Design System section |
| **7** | Single image — Brand identity (SKILLISSUE wordmark treatment, tagline in context) | Before Agentic Coding section |
| **8** | Single image — Deployment / tech stack visual (or a dev tools screenshot showing realtime updating in action) | End of tech stack section |

**Total:** 4 single images + 3 galleries (10 screens in galleries). That's 14 images worth of product shown, across 8 block slots.

---

## CMS Block Structure

### Hero
- `image` (full-width) — **IMAGE 1: Product hero** (landing page or main dashboard in dark mode)

### Opening
- `text` — "Most designers ship Figma files. I ship apps. **SkillIssue** is a live social challenge app where friends stake real money on dares, submit photo proof, and approve or reject each other. Every rupee tracked forever. Stake it, or shut up."
- `metric_row` — **Full-Stack** | **Solo Built** | **Live**

### Not a Prototype
- `divider`
- `heading1` — "Not a Prototype. A Product."
- `text` — "This isn't a weekend hackathon app. SkillIssue is a complete, shipped product with everything a real app needs — and I designed and built all of it."
- `metric_row` — 74 Components | 11 Tables | 12 Migrations
- `list` (bulleted):
  - **Frontend** — 74 React components across 20 routed pages, dark-themed, fully responsive
  - **Backend** — 11-table Postgres schema with foreign keys, indexes, triggers, and RLS on every table
  - **Auth** — Google OAuth + email/password via `@supabase/ssr`
  - **Realtime** — Subscriptions on every key table, no refresh buttons anywhere
  - **Storage** — Structured buckets for proof uploads (photos, payment receipts)
  - **Scheduled jobs** — Edge function processes expired challenges on a cron
  - **Deployed** — Vercel with full CI/CD, auto-deploys on every push

- `gallery` (2 cols) — **IMAGE 2: Core product screens**
  - Screen 1: Dashboard (the ledger view with sent/received challenges)
  - Screen 2: Create challenge form (the RHF + Zod form with tasks, stake, deadline)
  - Screen 3: Challenge detail view (tasks, countdown, submissions)
  - Screen 4: Approval grid (ApprovalCards with proof previews)

### The UX Decisions
- `divider`
- `heading1` — "The Designer Made the Calls"
- `text` — "Agentic coding writes code, but every UX decision — every layout, every interaction, every empty state, every micro-delight — is a designer's call. Here's what I decided:"

- `heading2` — "Realtime as a Design Feature"
- `text` — "Every key page subscribes to Supabase realtime. Your dashboard updates the moment a friend sends you a dare. Your approval inbox updates when new proof lands. The notification bell never needs a refresh. It's not a technical flex — it's a design principle. The app feels alive because I designed it to."

- `heading2` — "Deterministic Player Identity"
- `text` — "Every user gets a unique color hashed from their user ID. Their nickname renders in that color everywhere in the app — in challenge cards, notifications, comparisons, ledgers. You recognize your friend at a glance without reading the name. Design system thinking applied to user data."

- `heading2` — "Empty States That Speak"
- `text` — "'Your squad is empty — add a friend to start daring.' The product voice runs through every empty state, every loading state, every error. The app has a personality, and it shows up everywhere."

- `heading2` — "Auto-Completion Without Clicks"
- `text` — "When all tasks in a challenge get approved, the challenge flips to 'completed' automatically — no 'Mark Complete' button. The system just knows. UX invisibility is the goal: the fewer decisions users have to make, the better the product feels."

- `gallery` (3 cols) — **IMAGE 3: Social & interaction screens**
  - Screen 1: Friends list with status pills
  - Screen 2: Add friend dialog
  - Screen 3: Notifications dropdown with realtime updates

### The Design System
- `divider`
- `heading1` — "The Design System"
- `text` — "Not generated defaults. A real design system, intentional from the first token to the last component."

- `heading2` — "Typography"
- `text` — "Three typefaces, each with a job: **Fraunces** (display) with SOFT axis tweaks for headings — warm, slightly unusual, never generic SaaS. **Inter** (body) for readable, boring-in-the-best-way paragraph text. **JetBrains Mono** for timestamps and amounts — so numbers always feel mechanical and trustworthy."

- `heading2` — "Color"
- `text` — "Dark theme by default. Brand accent for 'ISSUE' in the wordmark. Status colors for challenge states (pending, active, completed, failed, rejected). Every user gets a unique hash-derived color that persists across every screen."

- `heading2` — "Component Vocabulary"
- `text` — "Built on shadcn/ui + Radix primitives, extended with product-specific components: `StakeAmount`, `Rupees`, `StatusBadge`, `CountdownTimer`, `ChallengeCard`, `ApprovalCard`, `PaymentApprovalCard`, `FriendCard`, `SharedFundCard`. Each designed for a specific role, composable throughout the app."

- `image` — **IMAGE 6: Design system showcase** (typography + color + component stack)

### Brand Identity
- `heading2` — "The Product Has a Voice"
- `text` — "**SKILLISSUE.** One word. SKILL in regular, ISSUE in brand accent. Tagline: **'Stake it, or shut up.'** The voice is witty, direct, confrontational-but-friendly. It had to feel like the group chats it replaces."
- `image` — **IMAGE 7: Brand identity shot** (SKILLISSUE wordmark + tagline in context)

### The Tech Stack
- `divider`
- `heading1` — "The Stack"
- `text` — "I pick tools the way I pick design systems — intentionally. Every piece was chosen for a reason:"

- `columns_2`:

  **Column 1 — Frontend**
  - Next.js 15 (App Router, Turbopack)
  - React 19 + TypeScript
  - shadcn/ui + Radix primitives
  - Tailwind CSS
  - React Hook Form + Zod
  - Recharts for data viz

  **Column 2 — Backend & Infra**
  - Supabase (Postgres, Auth, Storage, Realtime)
  - Row-Level Security policies
  - Supabase Edge Functions (cron jobs)
  - Resend for transactional email
  - Vercel (hosting + CI/CD)
  - GitHub integration

- `callout` — "Production-grade stack" / "The same tools YC-backed startups ship with" / "No toy frameworks, no experimental DBs"

- `image` — **IMAGE 8: Tech stack visual** (deployment dashboard, or a screenshot showing the stack at work)

### The Craft
- `divider`
- `heading1` — "Agentic Coding, the Actual Skill"
- `text` — "Agentic coding isn't 'asking ChatGPT for code.' It's closer to being a tech lead who manages AI engineers than a developer who types. Here's how I actually build:"

- `heading2` — "PRD-First, Always"
- `text` — "Before a single line of code, I write the PRD. Every flow, every page, every edge case — specified down to field lengths and error states. That document becomes the constitution. Every AI conversation references which section it's touching. No guessing, no drift."

- `heading2` — "Convention Files as Force Multipliers"
- `text` — "A `CLAUDE.md` at the project root encodes every rule — brand name, currency format, auth pattern, realtime hook, naming conventions, component structure. Every new session starts with that context loaded. Every feature built the same way, without re-explaining the project ten times."

- `heading2` — "Describe, Don't Prescribe"
- `text` — "I don't tell Claude what code to write. I describe what the feature should DO. The AI proposes the implementation — React Hook Form schema, Zod validators, UI, database column constraints. I review, point out what feels off, iterate."

- `heading2` — "Parallel Agents for Speed"
- `text` — "Multiple features built in parallel sessions. One agent on the approval flow, one on the friend graph, one on the comparison page. Each with clear scope, clear context, clear output."

- `heading2` — "Read Every Line"
- `text` — "I review every generated line before commit. Not to edit it — to understand it. That's how I learned Postgres RLS, realtime subscriptions, server components, middleware auth. I don't need to write SQL from scratch. I need to know what my app is doing."

### Smart Engineering Calls
- `divider`
- `heading1` — "Engineering Decisions"
- `text` — "Shipping real products means making engineering tradeoffs — not just design ones. Here are the calls I made:"

- `heading2` — "Not a Payment Processor"
- `text` — "Every app in this space tries to hold money — which means compliance, KYC, reconciliation, support, refunds. Weeks of work. I consciously didn't. SkillIssue tracks the agreement and the receipt. Money moves via UPI or bank transfer outside the app, screenshot gets uploaded, recipient approves, logged to the shared ledger. 90% of the value, 10% of the complexity."
- `callout` — "Scope reduction is a superpower" / "The best feature is the one you decide not to build"

- `heading2` — "Business Logic in the Database"
- `text` — "When all tasks in a challenge get approved, the challenge flips to `completed` automatically — via a Postgres trigger, not app code. When a challenge fails, a trigger creates the fund obligation, notifications, and updates the shared ledger — all in one transaction. The app layer stays thin; the database does the heavy lifting reliably."

- `gallery` (3 cols) — **IMAGE 4: Money & ledger screens**
  - Screen 1: Fund overview with shared funds + open obligations
  - Screen 2: Shared fund detail (every rupee between two friends, forever)
  - Screen 3: Payment approval card with receipt preview

- `heading2` — "The Personality Page"
- `text` — "The `/compare` view shows head-to-head stats between you and any friend — sent, received, completed, failed, approval rate, net ledger. Who owes whom. Who's winning. Who's a coward. This page doesn't add functionality — it adds *reason to come back*. Designed to be the most-shared screenshot from the app."
- `image` — **IMAGE 5: Compare / rivalry view**

### Results
- `divider`
- `heading1` — "Results"
- `metric_row` — **Shipped** | **In Use** | **Learning Loop Active**
- `list` (bulleted):
  - A working, monetized, realtime social product — built solo, deployed to production
  - Used with real friends on real dares with real money
  - Full stack owned — design, UX, system, frontend, backend, database, infrastructure
  - A repeatable workflow for shipping future products the same way, faster

### What I Learned
- `heading2` — "What I Learned"
- `list` (numbered):
  - Designers can ship full-stack products. The key isn't learning to code — it's learning to direct agentic coding like a tech lead.
  - The designer makes all the meaningful calls. AI writes the code. I design the product, the UX, the system, the voice.
  - The PRD is the constitution. Write it before writing anything else.
  - Scope reduction beats feature engineering. The decision NOT to hold money was worth more than any feature I shipped.
  - Convention files are the difference between AI-assisted chaos and production-grade consistency.
  - Reading generated code is how I learned the stack. Not writing. Reading.
  - The ceiling on what a designer can build is higher than anyone realizes.

### Closing
- `quote` — "I don't wait for engineering. I don't hand off. I design the product — voice, UX, system, interactions — and I ship it. Agentic coding is how."

---

## Tone Notes

- **Designer first, coder second.** The designer identity leads every section. Agentic coding is a tool, not the story.
- **Show, don't just tell.** Screens throughout — landing, dashboard, create, approve, friends, fund, compare. Visitors should feel they've *used* the app by the end of the page.
- **Tech stack visible and named.** Don't be shy about the engineering. List the tools, show engineering literacy.
- **Match the product's energy.** SkillIssue is confrontational-friendly. Short sentences. A little edge.
- **Tech-savvy readers should nod.** CTO reads this → "this person actually gets it."
- **Design-savvy readers should lean in.** Design lead reads this → "I didn't know a designer could ship this."
