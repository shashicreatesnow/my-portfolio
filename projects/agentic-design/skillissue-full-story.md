# SkillIssue — The Full Story

> How a designer shipped a real, working, monetized social app — built entirely through agentic coding.

---

## The Origin

I wanted to build, not just design. Not a toy app, not a "hello world" — a real product with auth, a database, realtime, storage, business logic, and enough complexity that shipping it would actually teach me something.

The idea came from how my friends and I talked to each other. Every group chat has the same pattern: someone dares someone, the dare is forgotten, nothing happens. What if dares had real consequences? What if you had to stake actual money, upload proof, and let your friends approve or reject it?

SkillIssue was born from that friction. **"Stake it, or shut up."**

---

## What It Is

A social challenge app where friends:
1. **Dare** each other ("do 100 pushups by Friday")
2. **Stake** real money (in Indian Rupees)
3. **Prove** completion with photo evidence
4. **Approve or reject** each other's proof
5. **Pay up** if they lose — tracked in a shared ledger that lasts forever

It's not a payment processor. The money moves outside the app (UPI, bank transfer) — SkillIssue tracks the agreement and the receipt. Every rupee that flows between a pair of friends is logged in a `shared_funds` table that runs for life.

---

## The Scope

I didn't expect how much was required to ship something "simple." Here's what ended up in the final product:

| Piece | Count / Detail |
|---|---|
| React components | 74 |
| App route pages | 20 |
| SQL migrations | 12 |
| Supabase tables | 11 (profiles, challenges, tasks, submissions, approvals, friends, fund_obligations, payment_submissions, shared_funds, notifications, comparison_sets) |
| Edge functions | 1 (expired challenge processor, runs on cron) |
| Auth providers | Google OAuth + email/password |
| Realtime subscriptions | Every major table |
| Storage buckets | 1 (`proof-images` with subfolders) |
| RLS policies | Enforced on every table |

---

## Tech Stack

- **Next.js 15** App Router + React 19 + TypeScript
- **shadcn/ui** (Radix primitives + Tailwind)
- **Supabase** — auth, Postgres, storage, realtime subscriptions
- **React Hook Form + Zod** for all form validation
- **Recharts** for comparison stats
- **Resend** for transactional emails
- **Dark theme default**, Indian Rupee formatting (`toLocaleString('en-IN')`)

---

## The Agentic Coding Workflow

I'm a designer, not a developer. I can't write a Supabase RLS policy from scratch. I can't architect a database schema with 11 tables and relationships. But I built this app end to end by treating AI as my engineering partner.

### How I Actually Worked

**Step 1: I designed the product first, not the code.**
Before writing a single line, I wrote the PRD. A long, detailed PRD that spelled out every flow, every page, every edge case: "Flow F — Approve/reject proof (challenger)." That PRD became the single source of truth that Claude referenced throughout the build.

**Step 2: I described what I wanted, Claude built it.**
"Build me a challenge creation form. Title 3-100 chars, description optional up to 500 chars, 2-4 tasks, stake in rupees, deadline 1-30 days." Claude wrote the React Hook Form + Zod schema + UI. I reviewed, pointed out what felt off, iterated.

**Step 3: Database schema as a conversation.**
I explained the relationships in plain English. "A challenge has one creator and one challenged user. A challenge has 2-4 tasks. Each task can have submissions. Each submission can have one approval." Claude produced SQL migrations with foreign keys, indexes, and RLS policies.

**Step 4: Claude wrote the code, I owned the design.**
The brand voice, the color system, the component hierarchy, the micro-interactions — those decisions were mine. The code that implemented them came from AI.

**Step 5: Debugging by narration.**
When something broke, I'd screenshot the issue and describe what I expected vs what happened. Claude would read the code, identify the issue, and fix it. I learned more about how the stack works from those debugging conversations than from any tutorial.

### Key Agentic Patterns I Used

- **PRD-first development** — the PRD was the constitution. Every feature request cited which section it touched.
- **Migrations never hand-written** — I never touched SQL directly. Every schema change went through a described-then-generated migration, reviewed before applying.
- **Components built in isolation** — "build me an `ApprovalCard`" is a clear scope. "Build me the approval page" is not.
- **Convention over configuration** — I gave Claude a `CLAUDE.md` with all the conventions (brand name, currency, auth flow, realtime hook) so every new piece stayed consistent.
- **Trust but verify** — Claude drafted; I read every line before committing. Not to edit it, but to understand it. That's how I learned.

---

## The Core Loop (Product)

```
         ┌───────────┐
         │  pending  │  ← challenger creates
         └─────┬─────┘
        accept│     │reject
               ▼     ▼
         ┌─────────┐ ┌──────────┐
         │ active  │ │ rejected │
         └────┬────┘ └──────────┘
 all proof approved│
                   │ deadline expires
          ┌────────┴────────┐
          ▼                 ▼
    ┌───────────┐     ┌─────────┐
    │ completed │     │  failed │ → creates fund obligation
    └───────────┘     └─────────┘
```

Every status transition triggers notifications, database cascades, and realtime updates to every connected client.

---

## Notable Design Decisions

### Brand identity
**"SKILLISSUE"** — one word, rendered as `SKILL` + colored `ISSUE`. The tagline "Stake it, or shut up." sets the tone: confrontational but friendly. The whole product voice is witty, direct, slightly trash-talky.

### Deterministic player colors
Every user gets a unique color based on their user ID (hashed). Their nickname renders in that color everywhere in the app — challenge cards, notifications, comparison stats. You can spot your friend at a glance without reading their name.

### Typography system
- **Fraunces** (display font) with SOFT axis tweaks — warm, slightly unusual, not generic SaaS
- **Inter** (body) — readable, boring in the best way
- **JetBrains Mono** — timestamps and money amounts, so numbers always feel "mechanical" and trustworthy

### Realtime first
Every key page subscribes to Supabase realtime. Your dashboard updates when a friend sends you a dare. Your `/approve` page updates when new proof is uploaded. The notification bell updates without polling. The UX feels instant.

### Money is conceptual, not held
Most apps in this space try to be a payment processor. I consciously didn't. The stake exists in the database, the obligation exists in the database, but the actual rupees move via UPI/bank transfer outside the app. SkillIssue tracks the agreement and the receipt — nothing more. This was a huge scope reduction that still delivered 90% of the value.

### Auto-completion
When all tasks in a challenge get approved, the challenge flips to `completed` automatically via a database trigger. No one has to click "mark complete." The system just knows.

### Expired challenge processor
An edge function runs on a cron schedule, finds active challenges past their deadline, flips them to `failed`, and cascades to create a `fund_obligation`. The loser's dashboard tells them they owe money, even if they never opened the app when the deadline passed.

---

## Database Highlights

**12 migrations** in order, each a focused change:
1. Core profiles + auth
2. Challenges + tasks
3. Submissions + approvals
4. Friends graph
5. Notifications
6. RLS policies round 1
7. Shared funds
8. Fund obligations + payment submissions
9. Comparison sets
10. Triggers (auto-completion, obligation cascade)
11. Realtime publication
12. Storage bucket + policies

The `shared_funds` table uses a neat dedup trick: every pair of users has exactly one row, ordered by `user_a_id < user_b_id`. This means you never get two rows for the same friendship, regardless of who registered first.

---

## What I Learned

1. **Designers can build products.** The whole thing — auth, database, realtime, storage, cron jobs — came together because I treated the build like a design problem, not a coding problem.

2. **The PRD is the code's constitution.** A good PRD makes every AI conversation faster because you stop re-explaining the same things.

3. **Scope reduction is a superpower.** Skipping real payments saved me weeks of compliance, KYC, reconciliation, and support headaches — while keeping 90% of the user experience intact.

4. **Read every line of generated code.** Not to fix it — to learn. You don't need to be a developer, but you need to know what your app is doing.

5. **Convention files are force multipliers.** My `CLAUDE.md` lives at the project root and encodes every rule: brand name, currency, auth flow, realtime hook, component conventions. Every new session starts with that context.

6. **Ship the thing.** SkillIssue is in active development, not shipped to the public yet — but I use it with my friends. The feedback from real use is 100x more valuable than what I could guess.

---

## Branches & Experiments

- **`main`** — current Next.js 15 rebuild, active
- **`old-version`** — the original Vite + React Router build
- **`idea-1`** — a design experiment I keep around as a reference

The rebuild from Vite to Next.js 15 was itself an agentic exercise — I described the migration goals and Claude ported the whole app, preserving behavior while moving to the App Router pattern and server components.

---

## What's Next

- Real payment integration (Razorpay) once I validate more demand
- Video proof (not just images)
- Group challenges (currently 1v1 only)
- Dispute resolution flow
- Leaderboards, badges, challenge templates
- A mobile app (currently web-only, responsive)
