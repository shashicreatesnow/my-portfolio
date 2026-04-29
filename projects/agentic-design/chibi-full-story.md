# Chibi — The Full Story

> A digital pet that lives on your desktop. Built for mental health during stressful work — by a designer who learned Rust to ship it.

---

## The Origin

I was in a stressful stretch of work. Back-to-back deadlines, too many tabs, too little breathing room. The kind of period where you realize your relationship with your screen is doing something to your mood — and not the good kind.

I didn't need another productivity app. I didn't need another meditation app. I needed something on my screen that made me feel better *while* I was working — not something I had to stop working to use.

What I wanted was basically a pet. Something alive, cute, low-maintenance. Something I'd smile at when I looked up from my work. Something that could nudge me gently when I needed a break, without the condescending tone every wellness app defaults to.

I looked for it. It didn't exist. So I built it.

**Chibi.** A digital pet that lives on your desktop.

---

## What It Is

Chibi is a **native Mac app** that runs a small animated pet on top of everything on your screen. It doesn't live in a browser tab. It doesn't live in a window you minimize. It *lives on your desktop* — walking along the bottom of your screen, occasionally talking to you, sometimes sleeping, sometimes dancing.

You can:
- **Pick your pet** — Cat, Dog, Bunny, or Blob (4 distinct sprites)
- **Pick its personality** — Cheerful, Calm, Energetic, Sleepy, or Goofy (each behaves differently)
- **Customize its look** — color palettes, size
- **Decide how it moves** — walk along the bottom, stay put, or roam free
- **Set up stress relief** — breathing guides, break reminders, message categories

And then you forget about it. And it does its thing. And you look up from a spreadsheet at 4pm and your pet is dancing, and you smile, and you keep working.

That's the whole point.

---

## The Tech Stack

This is my first desktop app. I didn't know Rust. I didn't know Tauri. I didn't know how native Mac windowing works. I shipped it anyway.

| Layer | Tool | Why |
|---|---|---|
| Shell | **Tauri v2** | Native Mac app with a tiny footprint. Rust backend + web frontend. |
| Frontend | **React 19 + TypeScript** | Familiar territory. Vite for instant dev loop. |
| Animations | **Framer Motion** | Smooth sprite transitions without touching canvas/WebGL |
| Backend/native | **Rust** | Tauri's native layer — window management, transparency, always-on-top |
| State persistence | **@tauri-apps/plugin-store** | Config saved natively, survives restarts |
| Window positioning | **@tauri-apps/plugin-positioner** | Native anchoring, multi-monitor support |

The magic is that the Chibi window is **transparent, borderless, always-on-top, skipTaskbar, visibleOnAllWorkspaces** — with `macOSPrivateApi: true` for the extra tricks you need on macOS. The pet floats above everything. No window chrome. No dock icon. Just the pet.

---

## The Architecture

### The Pet (Character System)

Four characters, each a custom React sprite component:
- `CatSprite.tsx`
- `DogSprite.tsx`
- `BunnySprite.tsx`
- `BlobSprite.tsx`

Every sprite responds to the same set of states and palettes, so the personality and animation logic is shared — only the visual is different.

### The State Machine

Pets aren't static. Chibi runs a proper state machine with 7 states:

- **IDLE** — standing around, looking cute
- **WALKING** — moving across the screen
- **POPUP_MESSAGE** — showing a speech bubble
- **SLEEPING** — curled up for a nap
- **DANCING** — a moment of joy
- **BREATHING** — guided breathing exercise mode
- **BREAK_REMINDER** — it's been a while, step away for a bit

Each state has a min/max duration and weighted transitions to other states. The weights determine the "vibe." A Cheerful pet has balanced transitions. An Energetic one has 50% weight toward Walking and 25% toward Dancing, but only 3% toward Sleeping. A Sleepy one is the inverse — 50% toward Sleeping, 10% toward Walking.

### The Personality System

5 personalities, each defined as a `PersonalityProfile`:
- **Animation speed multiplier** — calm pets move at 0.7x, energetic at 1.3x
- **Default message categories** — which kinds of things the pet says
- **State overrides** — different transition weights, different durations

So picking "Calm" isn't a cosmetic label. It's a real behavior change. A Calm cat moves more slowly, sleeps longer, and is 35% more likely to curl up than a Cheerful one.

### The Message Bank

The pet talks. Messages are organized into 7 categories:
- **motivational** — mild encouragement
- **hinglish** — Hindi-English blended one-liners (because I'm Indian and this just feels right)
- **caring** — check-ins
- **funny** — jokes
- **evening** — wind-down messages
- **breathing-prompt** — nudges toward the breathing exercise
- **break-reminder** — time-to-rest nudges

You pick which categories you want enabled. The personality you chose filters them further — a Calm pet uses more "caring" and "evening" messages, a Goofy one skews "funny" and "hinglish."

### The Stress Relief Layer

Two features that turn Chibi from a novelty into something actually useful:

**Breathing Guide** — a box-breathing exercise built right into the pet. Configurable inhale/hold/exhale durations and cycle count. The pet animates along with the breathing — expanding on inhale, holding, contracting on exhale. You're not opening a separate app; your pet is literally breathing with you.

**Break Reminder** — a Pomodoro-style timer. Set an interval (default 25 min) and a break duration (default 5 min). When the timer fires, the pet shifts into `BREAK_REMINDER` state and nudges you gently — "hey, step away for a few minutes."

Both features are **off by default**. Wellness features that force themselves on you stop feeling like wellness.

### The Settings Window

A second Tauri window (separate from the pet window) handles configuration. Four tabs:

- **Appearance** — character, palette, size
- **Personality** — pick one of 5
- **Position** — movement mode, walk speed
- **Stress Relief** — breathing timings, break reminders, message category toggles

The pet window stays small (96×96). The settings window is a proper resizable 420×600 configuration panel. They talk to each other through the shared config store.

---

## The Agentic Coding Journey

This project taught me something important: **agentic coding lets you ship in stacks you don't know.**

I'd never written Rust. I'd never used Tauri. I'd never built a native Mac app. The closest thing I'd done before was web apps on Vercel.

Here's how I approached it:

### Step 1: Describe the end state
"I want a small transparent always-on-top window on macOS. Inside it is a cute animated pet. The pet has a state machine, personalities, and can talk. There's a separate settings window. Config is persisted natively. It's built with Tauri because I want a real native app, not a web app pretending to be one."

### Step 2: Let the AI choose the right tools
Claude suggested Tauri v2 + React + Framer Motion + Rust for the native layer. It flagged which Tauri plugins I'd need (positioner, store, opener, shell). It warned me about macOS-specific things I'd miss otherwise — `macOSPrivateApi: true`, `visibleOnAllWorkspaces`, skipTaskbar.

### Step 3: Build in layers
I built the pet window first — just a static sprite, no animation, no logic. Then added the state machine. Then animations. Then personalities. Then the settings window. Then the message bank. Then breathing. Then break reminders. Each layer was a focused AI conversation with clear scope.

### Step 4: Learn from the Rust code
The `src-tauri/src/lib.rs` and `main.rs` files are small — maybe 100 lines of Rust total. But I read every line. I asked what it did. I asked why. Now I can read Rust. I still can't write it from scratch confidently — but I understand what my app is doing in the native layer.

### Step 5: Iterate on feel
This is the part agentic coding can't do for you. The pet needs to *feel* right. How fast does it walk? How often does it speak? How long does it sleep? I spent hours tuning state transition weights, animation speeds, message timing — because the pet is a design artifact, not an engineering one.

---

## Key Design Decisions

### The Pet Is Not a Notification
Most wellness apps interrupt you. Chibi doesn't. The pet is always there, doing its thing. If you want to engage with it, you can. If you're heads-down working, it won't stop you. The break reminder is off by default. The pet never steals focus. It just exists, quietly, gently.

### Hinglish Messages
This is a small thing that makes a big difference. Most wellness messaging is in corporate English ("You're doing great!"). Chibi can speak Hinglish — Hindi-English mixed one-liners that feel like a friend from back home, not a mindfulness coach. Small design choice, outsized emotional impact.

### Personality as Behavior, Not Label
"Cheerful" isn't a cosmetic selection. It changes how often the pet walks, dances, sleeps, speaks. Five personalities = five actually-different experiences.

### Native, Not Web
I could have built this as a Chrome extension or an Electron app in an afternoon. I didn't, because those feel second-class on macOS. A real native Mac app with transparent windowing, always-on-top, private API access — that's the experience this product needed. Electron would have felt like a pet in a jar. Tauri lets the pet actually live on the desktop.

### Every Feature Is Off By Default (Almost)
Break reminder: off. Breathing prompts: enabled as a category but not forced. Message categories: all five on-by-default, but trivially toggleable. The product respects the user. You're adding a pet, not installing a wellness program.

---

## What Shipped

- **Native Mac app** built with Tauri v2 + Rust + React 19
- **4 character sprites** — Cat, Dog, Bunny, Blob — each a custom React component
- **5 personality profiles** with distinct behavior, speed, and message mix
- **7-state state machine** with weighted transitions
- **7 message categories** including Hinglish for cultural warmth
- **3 movement modes** — walk bottom, stay put, roam free
- **Breathing guide** with configurable box-breathing
- **Break reminder** with Pomodoro-style intervals
- **Dual-window architecture** — pet window + settings window
- **Native config persistence** via `@tauri-apps/plugin-store`
- **macOS window integration** — transparent, always-on-top, all workspaces, private API

---

## What I Learned

1. **Agentic coding unlocks entire stacks.** I'd never written Rust. I shipped a Rust-backed native Mac app. That's the actual step change agentic coding gives you — not faster code, but *more stacks*.

2. **Wellness design is about restraint.** The best wellness feature I built was the one I turned off by default. Respect compounds faster than reminders.

3. **Cultural texture matters.** Hinglish messages are a feature. They're not a localization afterthought — they're the whole point of a pet built by me, for me, with a personality I recognize.

4. **Native feels different than web.** There's a tactile difference between a tool that runs in a browser and a tool that lives on your desktop. Chibi wouldn't feel the same as a Chrome extension, even if it did the exact same things.

5. **Personality is behavior.** When "cheerful" and "calm" produce materially different experiences, the label becomes the product. When they're just colors, it's cosmetic.

6. **Designers can build native apps.** This wasn't in my vocabulary six months ago. Now it is.

---

## Future Directions

- **Windows support** — Tauri handles it, just need to port the macOS-specific bits
- **iOS/iPad companion** — the pet on your phone too, synced via config
- **More characters** — the sprite system is extensible; more creatures is mostly art work
- **Smart break detection** — use macOS focus states to notice when you've been typing without pause
- **Optional AI chat** — a lightweight conversation mode via Gemini or Claude (opt-in)
- **Sprite customization** — user-uploadable sprite sheets for true customization
