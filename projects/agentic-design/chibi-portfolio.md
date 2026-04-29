# Chibi — Portfolio Case Study Plan

> What to show on the portfolio. Positioning: *A designer who builds for emotional needs — and ships native apps in stacks he didn't previously know, using agentic coding as the escalator.*

---

## Positioning Strategy

**The story in one line:**
> "I was stressed. I didn't want another productivity app. I wanted a pet. So I built one — a native Mac app with Rust, React, and a state machine. Now it lives on my desktop."

**What this case study proves:**
- I design for **emotional needs**, not just functional ones — wellness, mood, the feeling of a screen
- I can ship in **stacks I don't know** — first Rust project, first Tauri project, first native Mac app
- I understand **design restraint** — the best wellness feature is the one that's off by default
- I bring **cultural texture** to design — Hinglish messages, personality-as-behavior
- My range isn't just web. Now it includes desktop, native windowing, and systems thinking.

**What this case study should make people feel:**
- *"That's adorable."*
- *"Wait — he built a native Mac app? With Rust?"*
- *"This person thinks about design in a way I don't see often."*

**What NOT to show:**
- Claude prompts or coding screenshots
- Raw Rust code
- Anything that reads as "look at my tech stack"

---

## Story Arc

Same structure as Menderbug — emotional opening, the problem, the insight, the product, the tech, the craft, the close.

1. **The Hook** — personal, vulnerable, real
2. **The Problem** — stress, screens, the wellness-app trap
3. **The Insight** — "I didn't want an app that helps me. I wanted a pet that lives with me."
4. **The Product** — one screen of the pet in the wild, then a tour
5. **The Character System** — 4 sprites × 5 personalities × palettes × movement
6. **The Stress Relief Layer** — breathing, break reminders, respectful defaults
7. **The Tech Stack** — first native Mac app, first Rust, shipped via agentic coding
8. **The Design Calls** — personality as behavior, Hinglish, off-by-default, native over web
9. **The Bigger Pattern** — build-your-own ties to Gamma, SkillIssue, Menderbug
10. **Results + Close**

---

## Image Plan (7 slots)

| # | Image | Placement |
|---|---|---|
| **1** | Product hero — the pet in the wild, walking across a real desktop | Hero (full-width) |
| **2** | Gallery: The 4 characters — Cat, Dog, Bunny, Blob in a lineup with different palettes | After "The Product" section |
| **3** | Gallery: The pet in action — IDLE, WALKING, SLEEPING, DANCING states with speech bubbles | State machine section |
| **4** | Single image — Settings window with the 4 tabs (Appearance, Personality, Position, Stress Relief) | Customization section |
| **5** | Single image — Breathing guide in action, pet expanding/contracting with the breath | Stress Relief section |
| **6** | Single image — A candid "pet on desktop" shot showing how it coexists with real work windows | Before Tech Stack |
| **7** | Single image — Tech stack visual or a Tauri + Rust badge/diagram | End of tech stack |

**Total: 5 singles + 2 galleries (8 inside) = 13 screens shown**

---

## CMS Block Structure

### Hero
- `image` (full-width) — **IMAGE 1: Product hero** (the pet walking across a real desktop)

### Opening
- `text` — "I was in a stressful stretch of work. Back-to-back deadlines, too many tabs, too little breathing room. I didn't want another productivity app. I didn't want another meditation app. **I wanted a pet.** So I built one — a native Mac app with Rust, React, and a state machine. It lives on my desktop now."
- `metric_row` — **Native** Mac App | **1st** Rust Project | **Daily** Companion

### The Pain
- `divider`
- `heading1` — "Why Another Wellness App Wasn't Going to Work"
- `text` — "Every wellness app does the same thing: it interrupts you. It pings you with a breathing exercise at 3 PM. It asks you to rate your mood on a 1-10 scale. It guilts you for not meditating. It treats your stress as a task you're failing to complete."
- `text` — "What I actually needed wasn't an app that helps me. **I needed something on my screen that made me feel better while I was working.** Not something to stop working for. Something that quietly, gently, just existed — and occasionally made me smile."
- `callout` — "The wellness-app trap" / "Every one of them treats stress as a task to complete" / "I needed a companion, not another chore"

### The Insight
- `divider`
- `heading1` — "A Pet, Not a Program"
- `text` — "The answer was stupidly obvious the moment I let myself think it: a pet. Something alive. Something cute. Something that doesn't need me to engage with it — it engages *with me*, at its own pace. Something that walks around, naps, dances, and occasionally says something silly in Hinglish."
- `text` — "**What I built isn't a wellness app. It's a companion.** And the difference between those two things is the whole product."
- `callout` — "The insight" / "I didn't want an app that helps me. I wanted a pet that lives with me." / "Everything after this was execution."

### The Product
- `divider`
- `heading1` — "Meet Chibi"
- `text` — "A small animated pet that lives on your desktop. Transparent window, always on top, skips the dock, visible on every workspace. It walks along the bottom of your screen, occasionally talks, sometimes sleeps, sometimes dances. You work around it. It coexists with you."

### The Character System
- `heading2` — "Pick Your Pet"
- `text` — "Four characters, each a custom-drawn sprite system: **Cat, Dog, Bunny, Blob.** Every one reacts to the same state machine, so you're picking a vibe — not losing a feature."
- `gallery` (2 cols) — **IMAGE 2: The 4 characters**
  - Screen: Cat sprite in different palettes
  - Screen: Dog sprite animated
  - Screen: Bunny sprite with speech bubble
  - Screen: Blob sprite dancing

- `heading2` — "Pick Your Personality"
- `text` — "Five personalities, each a real behavior change — not a cosmetic label."
- `list` (bulleted):
  - **Cheerful** — balanced, friendly, occasional dancing
  - **Calm** — slow, thoughtful, long naps, gentle movement
  - **Energetic** — fast, always walking, loves to dance, rarely sleeps
  - **Sleepy** — curls up often, moves slowly, quiet
  - **Goofy** — unpredictable, maximum dancing, Hinglish-heavy
- `callout` — "Personality is behavior, not label" / "An Energetic pet walks 50% of the time. A Sleepy one naps 50% of the time." / "Five genuinely different experiences."

- `heading2` — "The State Machine"
- `text` — "Chibi runs a proper state machine under the hood — **7 states** (idle, walking, popup_message, sleeping, dancing, breathing, break_reminder), each with a min/max duration and weighted transitions. Personality profiles override those weights. The behavior isn't random — it's *composed*."
- `gallery` (2 cols) — **IMAGE 3: Pet in action**
  - Screen: Pet walking across the bottom of the screen
  - Screen: Pet with a speech bubble displaying a Hinglish message
  - Screen: Pet sleeping, curled up
  - Screen: Pet dancing mid-animation

### Customization
- `divider`
- `heading1` — "Designed to Be Yours"
- `text` — "A companion you can't shape isn't a companion — it's a widget. Chibi has a proper settings window (a separate Tauri window, so it doesn't interrupt the pet) with four tabs:"
- `list` (bulleted):
  - **Appearance** — character, palette, size (small / medium / large)
  - **Personality** — one of five profiles, each with real behavioral differences
  - **Position** — movement mode (walk along bottom, stay put, roam free), walk speed
  - **Stress Relief** — breathing timings, break reminders, message categories
- `image` — **IMAGE 4: Settings window** with the 4 tabs visible

### Stress Relief — the quiet power feature
- `divider`
- `heading1` — "The Wellness Layer, Done Right"
- `text` — "This is where Chibi becomes genuinely useful. Two features that turn a novelty into a tool — with design restraint baked in."

- `heading2` — "Guided Breathing"
- `text` — "A box-breathing exercise built into the pet itself. Configurable inhale, hold, and exhale durations, plus cycle count. The pet animates along with the breathing — expanding on inhale, holding, contracting on exhale. **You're not opening a separate app — your pet is literally breathing with you.**"
- `image` — **IMAGE 5: Breathing guide** — pet expanding/contracting with the breath cycle

- `heading2` — "Break Reminders"
- `text` — "Pomodoro-style timer. Configurable interval and break duration. When the timer fires, the pet shifts into a new state and nudges you gently — no popups, no notifications, no guilt."

- `heading2` — "Off By Default"
- `text` — "Both features are **disabled out of the box**. You have to turn them on. The best wellness feature is the one the user chose — not the one forced on them. Respect compounds faster than reminders."
- `callout` — "Design restraint" / "Break reminders off by default. Breathing prompts opt-in." / "The product respects the user from the first launch."

### In Your Workflow
- `heading2` — "The Pet in the Wild"
- `text` — "Chibi doesn't take over your screen. It coexists with it. You work. The pet walks. Sometimes it says something funny in Hinglish. You smile. You keep working. That's the design."
- `image` — **IMAGE 6: Pet on desktop** alongside real work windows

### The Tech Stack
- `divider`
- `heading1` — "My First Native App"
- `text` — "I'd never written Rust. I'd never used Tauri. I'd never built a native Mac app. Agentic coding let me ship one anyway."
- `columns_2`:

  **Column 1 — Shell & Native**
  - Tauri v2 (native Mac app, tiny footprint)
  - Rust (window management, transparency, always-on-top)
  - macOS private API for multi-workspace visibility
  - `@tauri-apps/plugin-store` for persisted config
  - `@tauri-apps/plugin-positioner` for window anchoring

  **Column 2 — Frontend & Feel**
  - React 19 + TypeScript
  - Vite for instant dev loop
  - Framer Motion for sprite animations
  - Custom sprite components (one per character)
  - Dual-window architecture (pet + settings)

- `callout` — "Native feels different than web" / "No Electron, no browser tab, no web-app-in-disguise" / "A real Mac app that actually lives on your desktop"
- `image` — **IMAGE 7: Tech stack visual**

### Agentic Coding — learning by shipping
- `divider`
- `heading1` — "Shipping in a Stack I Didn't Know"
- `text` — "This project taught me something important: **agentic coding doesn't just make you faster — it unlocks entire stacks.** I shipped a Rust-backed native Mac app as my first Rust project, because I didn't have to become a Rust developer. I just had to be a product designer who could direct one."

- `heading2` — "How I Actually Worked"
- `list` (numbered):
  - **I described the end state.** "Transparent always-on-top Mac window with an animated pet inside. Separate settings window. Native config persistence. Built with Tauri because I want a real native app."
  - **AI chose the right tools.** Tauri v2, which Tauri plugins I needed, the macOS-specific gotchas (`macOSPrivateApi: true`, `visibleOnAllWorkspaces`). I didn't know to ask.
  - **I built in layers.** Pet window first, then state machine, then personalities, then settings, then stress relief. Every layer a focused AI session with clear scope.
  - **I read the Rust.** Every line. I can now read Rust confidently, even if I still wouldn't write it from scratch. That's the point — *understand* your app, don't *build* every piece.
  - **I tuned the feel myself.** Animation speeds, state transition weights, message cadence. The AI can't do this part — this is design work, and it takes taste.

- `callout` — "The step change" / "Agentic coding didn't just let me code faster. It let me ship in a stack I'd never touched." / "My range expanded overnight."

### The Design Calls
- `divider`
- `heading1` — "The Decisions That Make It Feel Right"

- `heading2` — "Personality as Behavior, Not Label"
- `text` — "Every other 'cute character' app uses personality as a cosmetic choice. Chibi treats it as behavior. Cheerful cat vs Calm cat — genuinely different experiences. Transition weights, animation speeds, message mix all shift with the personality you pick."

- `heading2' — "Hinglish Messages"
- `text` — "Most wellness messaging is in corporate English. Chibi speaks Hinglish — Hindi-English mixed one-liners that feel like a friend from back home, not a mindfulness coach. Small design choice, outsized emotional impact. This is what 'cultural texture in design' looks like in practice."

- `heading2` — "Off By Default"
- `text` — "Every wellness feature is opt-in. Break reminders: off. Breathing prompts: disabled until you turn them on. The product assumes the user knows what they want — then provides it."

- `heading2` — "Native, Not Web"
- `text` — "Could've built this as a Chrome extension or Electron app in an afternoon. Didn't. Native Mac app with transparent windowing and private API access — that's the experience this product needed. Electron would have felt like a pet in a jar. Tauri lets the pet actually live on the desktop."

### The Bigger Pattern
- `divider`
- `heading1` — "If a Tool Doesn't Fit, Build Your Own"
- `text` — "This is the pattern. **Gamma** automated my thumbnail production. **SkillIssue** turned friend dares into a real product. **Menderbug** fixed my image generation workflow. **Chibi** took care of my mental health while working. Different stacks. Different domains. Same underlying thesis:"
- `callout` — "The repeating move" / "When I hit real friction, I reach for agentic coding and build the thing that doesn't exist yet" / "Designers with this workflow can solve any problem they notice"

### Results
- `divider`
- `heading1` — "Results"
- `metric_row` — **Native** Mac App | **4** Characters × **5** Personalities | **Daily** Companion
- `list` (bulleted):
  - A real native Mac app with Tauri + Rust + React 19
  - 4 sprite characters × 5 personalities × multiple palettes = dozens of unique pet configurations
  - Stress relief features (breathing, break reminders) with respectful opt-in defaults
  - My daily companion — reduces stress passively, without demanding engagement
  - Shipped as a first Rust project, proving agentic coding unlocks new stacks

### What I Learned
- `heading2` — "What I Learned"
- `list` (numbered):
  - Agentic coding unlocks entire stacks — the bigger win isn't speed, it's *range*
  - Wellness design is about restraint — the best feature is the one that's off by default
  - Cultural texture matters — Hinglish isn't a localization afterthought, it's a design feature
  - Native feels different than web — medium is part of the message
  - Personality as behavior is more powerful than personality as label
  - Designers can build native apps. That wasn't true for me six months ago. It is now.

### Closing
- `quote` — "I didn't need another productivity app. I needed a pet. So I built one — in a stack I didn't know, using agentic coding as the escalator. That's the whole thesis."

---

## Tone Notes

- **Start vulnerable.** The stress is real. Don't hide it. That's what makes the product personal.
- **Warm, not precious.** The pet is cute but the thinking behind it is sharp.
- **Design restraint is THE message.** Off-by-default, personality-as-behavior, native-over-web — each one shows taste.
- **The Rust story is the secondary flex.** First native app, first Rust project, shipped. Agentic coding as range-expander, not speed-up.
- **Ties to the other case studies.** "If a tool doesn't fit, build your own" is now a **proven pattern** across four projects.
- **Final quote is the thesis.** "I didn't need another productivity app. I needed a pet. So I built one."
