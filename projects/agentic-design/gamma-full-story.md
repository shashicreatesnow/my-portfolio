# Gamma — The Full Story

> How a designer who doesn't code built a multi-AI pipeline that automated 95% of his thumbnail design workflow.

---

## The Origin

It started with exhaustion. I was designing thumbnails for a Hindi edutainment app — 16+ content categories, 8-15 thumbnails a day. Each one needed a Midjourney prompt that was 500-2000 characters of precise instructions: hex codes, camera specs, lighting setups, facial expressions, cultural context. I was writing every single one by hand.

Then I started experimenting with Claude Code. Not to write code — I'm a designer, not a developer. I wanted to see if I could make it do the repetitive parts. And that experiment turned into Gamma.

---

## Version 1 — The First Automation

**The idea:** What if I just told an AI agent what the video is about and it wrote the Midjourney prompts for me?

**What I built:**
- **Prompt Generation Agent** — I'd give it a video brief with the title, and it would generate Midjourney prompts. Random directions, no structure, no research. Just "here's the topic, make me a prompt."
- **Submission Agent** — A Python script (Claude wrote it, I described what I wanted) that opens Midjourney and submits prompts automatically. No more copy-paste-wait-copy-paste.

**What worked:**
- Submission was fully automated. I'd hit run and walk away.
- Prompt generation was faster than writing by hand.

**What didn't work:**
- Prompts were generic. No awareness of what works for which category.
- No consistency — every batch looked different.
- I was still doing image search and finding elements manually.
- Quality varied wildly. Some prompts were great, most were mediocre.

**Manual work automated: ~30%**

---

## Version 2 — Adding Intelligence

**The insight:** The prompts were bad because the AI had no context. It didn't know what good thumbnails look like, what competitors were doing, or what actually gets clicks.

**What I added:**

### Research Layer
- Created research files: competitor analysis, benchmarks from big companies, what works and what doesn't in thumbnail design
- Built a **Research Agent** that reads these resources AND researches the internet for each specific brief
- Now before any prompt gets written, there's real context: what's been done before, what's overused, what's fresh

### 4 Prompt Types
Instead of one random prompt, the **Prompt Generation Agent** now creates 4 distinct directions per thumbnail:
- **P1 (Human)** — Indian person with specific expression, body language, clothing
- **P2 (Object)** — Metaphorical still life, no humans, editorial styling
- **P3 (Illustration)** — Kurzgesagt, Ghibli, editorial, or graphic novel style
- **P4 (Movie Poster)** — Bollywood theatrical one-sheet

This gave me real options instead of hoping one random direction would be good.

### Quality Control — Heisenberg & Pinkman
This was the game-changer. Two AI critic agents that review every prompt before it goes to Midjourney:

**Heisenberg** (precision) — Does the prompt have exact hex codes? Are the facial expressions described at muscle level? Is the camera spec complete? Are the lighting sources named? If anything is vague, he rejects it.

**Pinkman** (audience) — Would a real person stop scrolling for this? Does the Indian context feel authentic? Does the face tell a story? Does it match my visual taste? If it feels generic, he flags it.

They debate. Sometimes they agree, sometimes they clash. The prompt either gets Approved, sent back for Revision, or lands on a Compromise. Either way, what comes out is better than what went in.

**The flow became:**
```
Brief → Research → 4 Prompts → Heisenberg & Pinkman QC → Submission
```

**Manual work automated: ~80%**

---

## Version 3 — The Full System

**The problem with V2:** I was still doing too much administrative work. Copying briefs from Google Sheets, downloading scripts from Docs, managing what's done and what's pending. The creative part was automated but the logistics weren't.

### Google Integration
Connected Google Sheets and Google Docs through Google Cloud Console. Now:
- **Sheet Agent** reads my assignment sheet directly
- I just ask "what's remaining today?" and it tells me
- Scripts get pulled from Docs automatically
- No more tab-switching, no more copy-paste of briefs

### Taste Profile
This changed everything about prompt quality:
- Analyzed 26 images from my personal moodboard
- Formalized my visual taste into a living document: **"Desi Maximalism meets Retro Punk"**
- Every agent reads this taste profile before doing anything
- Category colors always lead (Finance = Blue, Astrology = Purple, Scams = Red). My taste colors (deep red, warm gold, off-black) are accents only.
- Texture library: film grain, halftone dots, paper texture, VHS artifacts — applied as post-processing, never as scene quality
- **Anti-Poverty Rule:** The retro punk aesthetic is a visual TREATMENT — never applied to make Indian people or settings look poor or dusty. Subjects are always clean, modern, and aspirational.

### Emotion Reference System
Built a reference mapping 10 thumbnail emotions to FACS (Facial Action Coding System) muscle descriptions:
- "Disbelieving Shock" → Wide eyes (AU5), raised brows (AU1+2), parted lips (AU25), tense jaw
- "Knowing Confidence" → One raised brow (AU2), half-smirk (AU12), narrowed eyes
- ...and 8 more, each mapped to specific content categories

This gives Midjourney precise physical descriptions instead of vague words like "happy" or "worried."

### P5 — The Best Of
After Heisenberg and Pinkman QC all 4 prompts, they now collaborate on a 5th prompt: the **Best Of**. They pick the strongest concept from P1-P4 and enhance it with my taste profile treatment. This is usually the winner.

### Brightness & Variety Rules
Hard rules to prevent the "everything looks the same" problem:
- At least 1 of every 4 prompts must be bright/warm
- At most 2 of 4 can be dark/moody
- Blue can't dominate all 4 prompts even for blue-category topics
- Each P5 across a batch must look visually distinct

### 3-Way AI Integration
This is where it gets interesting:
- **Claude Code (Opus)** — The brain. Runs all creative agents, research, prompt generation, QC
- **Codex (OpenAI)** — Accessible by Claude for independent code review, alternative perspectives, and operating the whole project when needed
- **Gemini CLI** — Accessible by Claude for specific use cases

Claude can call Codex and Gemini. Codex can operate the whole project and ask Claude to do specific parts. It's not one AI — it's a team of AIs that can delegate to each other.

### The Design Brain
The biggest creative leap in V3. A mini AI decision-maker that acts as the creative authority for the whole system:
- Trained on my moodboard (26 analyzed images), my taste profile, and real performance data
- Knows what makes a good design and what doesn't — not just rules, but judgment
- The Prompt Generation agent consults the Design Brain before writing anything
- It's like having a senior art director embedded in the pipeline: "this works for Finance, this expression is wrong for Scams, this palette is overused"
- The Design Brain is why V3 output is fundamentally better than V2 — agents went from rule-following to creative judgment

### NanoBanana & ChatGPT Image API
Added to the terminal:
- **NanoBanana** — Makes text-rendered images with precision. Hindi/Devanagari text on thumbnails used to require manual Photoshop work. Now NanoBanana generates it with exact text placement. Rarely need manual text editing anymore.
- **ChatGPT Image (API)** — Another image generation option accessible from terminal. Different strengths than Midjourney for certain styles.

### Miss Minutes — Terminal UI
Built a terminal-based visual interface inspired by Miss Minutes from Loki. It gives me a dashboard to:
- See all agents and their status
- Launch agent teams in parallel
- Monitor what's processing, what's done, what needs attention
- Control the whole pipeline visually instead of running commands

### The Current Flow
```
"What's remaining today?"
  → Sheet Agent reads Google Sheet
  → Downloads scripts from Docs
  → Research Agent (parallel, one per title)
  → Prompt Generation (4 types per title, parallel)
  → Heisenberg & Pinkman QC (debate, revise, approve)
  → P5 Best Of created
  → Submission to Midjourney (batches of 9)
  → NanoBanana for text rendering if needed
  → Done. I review outputs and pick winners.
```

**Manual work automated: ~95%**
**My job now: Creativity, ideation, taste refinement, and picking winners.**

---

## The Numbers

| Metric | Value |
|--------|-------|
| Submission sessions | 37+ |
| Thumbnails processed | 139+ |
| Prompts submitted | 700+ |
| Content categories | 16 |
| Prompt types per thumbnail | 5 (P1-P5) |
| Average batch size | 6-8 titles |
| Brief to submission | ~15-20 minutes (was hours) |
| AI systems integrated | 5 (Claude, Codex, Gemini, Midjourney, NanoBanana + ChatGPT Image) |
| Manual work remaining | ~5% (creative direction and taste) |

---

## What I Learned

1. **Systems thinking > prompt engineering.** A single great prompt doesn't scale. A system of agents with clear rules, shared resources, and quality gates does.

2. **Constraints create quality.** Category colors, brightness variety, anti-poverty safeguards — seemed restrictive, eliminated entire classes of bad output.

3. **Conflict produces refinement.** Heisenberg/Pinkman debate was the biggest quality leap. Two perspectives catch each other's blind spots.

4. **Formalize your taste.** Turning my moodboard into a structured document meant every agent could reference it consistently. Stopped getting "generic AI output."

5. **Non-developers can build complex systems.** I designed this pipeline without writing traditional code. The Python scripts were generated through conversation. My contribution was the design system, workflow architecture, and quality rules.

6. **Multi-AI is better than single-AI.** Claude, Codex, and Gemini each have strengths. Letting them delegate to each other produces better results than any one alone.

7. **Automate the boring, keep the creative.** My job went from "write 75 prompts by hand" to "review outputs and push creative boundaries." The 95% automation freed me to focus on what actually matters: taste.

---

## Version History

| Version | Key Addition | Manual Work |
|---------|-------------|-------------|
| V1 | Prompt generation + auto-submission | ~30% automated |
| V2 | Research agent, 4 prompt types, Heisenberg/Pinkman QC | ~80% automated |
| V3 | Google integration, taste profile, P5, 3-way AI, NanoBanana, Miss Minutes UI | ~95% automated |

---

## Future

- A/B testing integration — feed performance data back into the system
- Auto-selection of best variant based on historical CTR
- Expanding to YouTube shorts, Instagram stories
- Real-time taste profile updates as preferences evolve
- More AI integrations as new tools emerge
