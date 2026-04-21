# Gamma — AI-Powered Thumbnail Design System

> Multi-agent AI pipeline that automates thumbnail creation for a Hindi edutainment app — from brief to Midjourney submission in 15 minutes.

## Quick Facts

- **Client:** Hindi edutainment short-video app (18-35 audience, T2/T3 India)
- **Category:** Agentic Design
- **Role:** Creator, System Designer, Product Owner
- **Timeline:** March 2026 – Present (ongoing)
- **Industry:** EdTech / Creator Economy
- **Status:** Ongoing
- **Tools:** Claude Code (Opus), Midjourney, Google Sheets/Docs APIs, Python, Figma

## The Problem

Designing thumbnails for 16+ content categories (Finance, Astrology, Technology, Health, Career, Scams, etc.). Each thumbnail needs 5 distinct visual directions to test performance. That's 40-75 Midjourney prompts daily, each 500-2000 characters of precise instructions with hex codes, camera specs, lighting setups, and cultural context.

Before Gamma: writing every prompt by hand, researching manually, submitting one at a time. Hours of work, inconsistent quality, couldn't maintain standards at volume.

## The Solution

Gamma — a multi-agent AI pipeline with 5 specialized agents:

1. **Scraper Agent** — Reads briefs from Google Sheets, downloads scripts from Docs
2. **Research Agent** — Researches 7 visual dimensions per thumbnail (layout, color, typography, texture, photography, illustration, cultural context)
3. **Prompt Generation Agent** — Creates 4 distinct directions: Human portrait, Object still life, Illustration, Movie poster
4. **Quality Check Agent** — Two AI critics (Heisenberg for precision, Pinkman for audience impact) debate and refine every prompt, then create a 5th "Best Of"
5. **Submission Agent** — Auto-submits all prompts to Midjourney in batches

## Design System Built

- **Taste Profile** — Formalized from 26 moodboard images: "Desi Maximalism meets Retro Punk"
- **Emotion Reference** — 10 thumbnail emotions mapped to FACS (Facial Action Coding System) muscle descriptions
- **Category Colors** — 16 categories with defined hero hex codes
- **Anti-Poverty Rule** — Retro punk is a visual treatment, never applied to make Indian subjects look poor
- **Brightness Rules** — At least 1 bright/warm per 4 prompts, max 2 dark/moody

## Results

- 37+ submission sessions, 139+ thumbnails, 700+ prompts
- Brief to submission: ~15 minutes (was hours)
- 16 content categories covered
- Consistent quality at scale through the debate system

## Key Learnings

1. Systems thinking > prompt engineering
2. Constraints create quality
3. Conflict produces refinement (the two-critic debate was the biggest quality leap)
4. Formalize your taste — turns subjective preference into repeatable instructions
5. Non-developers can build complex systems

## Assets

- Source: PORTFOLIO.md (attached by user)
- Images: User will provide screenshots of the pipeline, Midjourney outputs, design system docs
