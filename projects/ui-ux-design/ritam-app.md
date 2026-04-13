# Ritam App

> Complete product redesign for an Indian news company — from information architecture to design system.

## Quick Facts

- **Client:** Ritam (news company, India)
- **Category:** UI/UX Design
- **Role:** Lead Product Designer
- **Timeline:** 4 weeks (2025)
- **Industry:** News / Media
- **Status:** Completed
- **Part of:** Ritam Product Ecosystem (App + Admin Panel + Web App)

## The Problem

Ritam is an established news organization transitioning to digital-first. Their challenges:
- Needed a mobile app to serve a diverse readership
- Required differentiation in a crowded news app marketplace
- Existing web presence wasn't translating to mobile behavior patterns
- Experiencing engagement drop-offs at critical user journey moments
- Analytics showed users consuming content from only 1-2 sections despite broad coverage

### Business Objectives
- Increase daily active users
- Boost content discovery across various news categories
- Make the app feel personalized, bookmarkable, and responsive to preferences

## Challenges to Solve

- Navigate vast content across multiple categories (Politics, Business, Technology, Sports, Entertainment) without overwhelming users
- Accommodate both quick headline scanning and deep reading in one interface
- Provide personalized content curation without creating echo chambers or filter bubbles
- Enable intuitive navigation that balances directed seeking with serendipitous content discovery
- Build a scalable design foundation supporting future expansion (new features, sections, localization)
- Maintain visual consistency and efficiency as the product evolves without requiring complete redesigns

## The Approach

### Information Architecture
Built a complete app architecture mapping all user flows:
- Onboarding → Home → Bottom Nav (5 tabs: Home, Discover, Shorts, News, Donate)
- Burger Menu → Profile, Notifications, Surveys, Saved, Language
- Articles flow with search, filters, and category-specific feeds
- Donate flow with form and receipt

### 1. Onboarding
**Design Approach:**
- Minimal steps — complete onboarding in under 60 seconds
- Clean, uncluttered screens with single focus per step
- Skip options respect user autonomy without encouraging it
- Consistent with app's overall visual language
- All choices can be modified later in Profile

**Key Principles:**
- Gather only essential information upfront
- Demonstrate value before requesting permissions
- Make personalization transparent and controllable
- Reduce friction to first meaningful interaction

**Screens:** Sign up flow (4 screens: name/phone → OTP → verify → language selection), Log in flow (3 screens + notification chips for success states)

### 2. Home Screen
**Purpose:**
- Primary entry point into Ritam's content
- Immediate access to breaking news and featured news
- Quick access to preferred content categories
- Feel fresh and dynamic with each visit
- Maintain consistency for comfortable usage patterns

**Cards & Feed:**
- Articles Card (long news articles) — card-based layout, maximizes content density
- News Card (short news content)
- Shorts (short video content)
- Prominent images as visual interest, headlines sized for quick scanning
- Secondary metadata: publication time, play time, source
- Filter icons for different categories
- Pull downward to refresh

### 3. Navigation
**Bottom Navbar:**
- 5 tabs — Home, Discover, Shorts, News, Donate
- Thumb-friendly positioning for one-handed use
- Persistent across all screens
- Active state highlighted with brand color and filled icon
- Industry standard pattern — zero learning curve

**Burger Menu:**
- 6 options — Profile, Home, Notifications, Saved, Surveys, Language
- Slides in from right with smooth animation
- Icons with text labels for clarity
- Dividers separate logical groupings

### 4. Discover
- Easy-to-access search feature at top
- Filter icon to filter content between All, Articles, Shorts, News
- Grid-based discover feed for easy access to multiple content types
- Top category chips to see specific news

**Search Flow:** Recent searches, trending suggestions ("You should try" chips), search results with category filters

### 5. Article View
- Scrollable long news feed
- Likes and comments to show reactions
- Headlines stick at top when scrolled
- Careful use of negative space and text size/weights for visual harmony
- Comprehensive comment feature to engage every user

### 6. News View
- News cards change when user slides
- 3D flip animation on slide
- Likes and comments
- Careful negative space and text sizing
- Comprehensive comment feature

### 7. Shorts View
- Scrollable short video feed
- Scrollable in both directions (up and down)
- Consistent with popular short content services
- Likes and comments
- Comment feature to engage users

### 8. Donate
- Donate option for societal causes
- Minimalistic and easy-to-use form
- Animation on successful payment
- Receipt download option

### 9. Other Pages
- **Profile:** Name, photo, mobile number, save button
- **Notifications:** Chronological list of all notifications
- **Saved Content:** Grid of saved articles/news
- **Surveys:** In-app survey participation

## Design System

### Colors Used
| Role | Hex | Purpose |
|------|-----|---------|
| Primary | #1B1C20 | Excellent contrast, premium modern aesthetic, reduces eye strain vs pure black |
| Secondary | #D97D54 | Warm counter to primary's serious tone, inviting CTAs, evokes trust and warmth |
| Accent | #86BCBE | Reduces cognitive stress during browsing, subtle UI elements, gender-neutral |

### Color Tokens
- Primary: 100 (#1B1C20), 200 (#2BDD33), 300 (#41434D), 400 (#565966)
- Secondary: 800 (#D97D54)
- Accent: 700 (#86BCBE)
- Greys: 1000 (#FFFFFF), 975 (#EFF3F4), 900 (#FAFAFA)
- Grey-teal: 1000 (#F1FDFF) → 300 (#4B4C4D)

### Typography
| Font | Weights | Sizes | Use Cases |
|------|---------|-------|-----------|
| Raleway (Primary) | Bold, Semibold | 12, 16, 20, 24, 48 | Almost every part of the app |
| Open Sans (Secondary) | Regular, Bold | 12, 16, 20 | Long paragraph texts, UI chips |

**Why Raleway:** Sharp edges convey clarity, excellent legibility on high-DPI mobile, wide letter spacing improves readability at smaller sizes, sophisticated design-forward aesthetic.

**Why Open Sans:** Natural reading rhythm reduces fatigue, better for extended reading sessions, designed for on-screen reading, lower stroke contrast reduces eye strain.

### Accessibility Considerations
- Meet or exceed WCAG AA standards throughout
- Text remains readable for low vision or color blindness
- Meet minimum touch target recommendations 48x48 px
- No zooming or squinting required
- Appropriately scaled text in app
- Navigation hierarchy follows logical patterns
- Genuinely usable for blind and low-vision users

## What I Learned

1. Early setup of tokens and components enables fast, consistent updates across designs
2. Combine algorithmic relevance with user control and content diversity to avoid echo chambers
3. Showing users why they see certain content enhances credibility and engagement
4. Micro-interactions, spacing, and typography subtly shape user trust and perceived professionalism
5. Clear font hierarchy guides attention and improves readability without explicit cues
6. Fast, adaptable interfaces aren't just technical wins — they define the overall experience

## Assets & Links

- **Framer case study:** https://shashipratap.framer.website/works/ritamapp
- **Related project:** Ritam Admin Panel (https://shashipratap.framer.website/works/ritamadminpanel)
- **Images downloaded to:** /tmp/ritam-images/ (24 images)

### Image Inventory (in order of appearance)

| # | File | Content |
|---|------|---------|
| 01 | 01-hero.png | Hero — hand holding phone with Ritam app, "the news app" tagline |
| 02 | 02.png | Table of Contents |
| 03 | 03.png | Understanding the challenge + Business Objectives |
| 04 | 04.png | Challenges to solve |
| 05 | 05.png | Architecture I Made — full flow diagram |
| 06 | 06.png | 1. Onboarding — design approach, key principles, screens |
| 07 | 07.png | Sign up flow — 4 screen progression |
| 08 | 08.png | Log in flow — 3 screens + notification chips |
| 09 | 09.png | 2. Home Screen — purpose + main screen mockup |
| 10 | 10.png | Cards & Feed — article card, news card, shorts card types |
| 11 | 11.png | 3. Navigation — bottom navbar + burger menu |
| 12 | 12.png | 4. Discover — grid feed + filters |
| 13 | 13.png | Search Flow — 3 screen progression |
| 14 | 14.png | 5. Article View — long read + comments |
| 15 | 15.png | 6. News View — 3D flip cards + comments |
| 16 | 16.png | 7. Shorts View — vertical video feed |
| 17 | 17.png | 8. Donate — form + success animation |
| 18 | 18.png | 9. Other Pages — Profile, Notifications, Saved, Surveys |
| 19 | 19.png | Colors Used — Primary, Secondary, Accent with rationale |
| 20 | 20.png | Color Tokens — full token system |
| 21 | 21.png | Typography — Raleway + Open Sans with rationale |
| 22 | 22.png | Accessibility Considerations |
| 23 | 23.png | What did I learn? — 6 takeaways |
| 24 | 24.png | Thank you slide |

## Raw Notes

- This is a strong UI/UX case study — shows full process from architecture to design system
- Positions Shashi as someone who thinks in systems, not just screens
- The architecture diagram and color token system show senior-level thinking
- The "Challenges to solve" section frames everything as business problems, not just design tasks
- The "What did I learn?" section adds a reflective, growth-oriented angle
- Consider adding: before/after comparisons if old app exists, user testing results, download/engagement metrics post-launch
- Related project "Ritam Admin Panel" could be shown together as a complete product ecosystem
