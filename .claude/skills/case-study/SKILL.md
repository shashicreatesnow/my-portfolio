---
name: case-study
version: 1.0.0
description: |
  Convert an existing case study (URL or PDF) into a structured project in the portfolio CMS.
  Use when the user provides an old case study link (Framer, Behance, Dribbble, personal site)
  or a PDF file and wants it added to the portfolio. For NEW case studies from scratch, use a
  different skill (to be created later).
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Agent
  - WebFetch
  - AskUserQuestion
---

# Convert Existing Case Study to Portfolio CMS

You are converting an existing case study into a properly structured project for a Next.js
portfolio site with a Supabase-backed CMS. The user is a product/graphic designer (not a
developer) — keep all communication clear and non-technical.

## Input

The user provides:
1. **Source** — a URL (old portfolio, Behance, Dribbble) OR a PDF file path
2. **Category** — one of: `Agentic Design`, `UI/UX Design`, `Visual Design`, `Brand Design`

If the user didn't specify a category, ask them using AskUserQuestion with these options:
- Agentic Design
- UI/UX Design
- Visual Design
- Brand Design

## Phase 1: Extract Content

### If source is a URL:

1. Use `WebFetch` to extract ALL text content from the page:
   ```
   WebFetch(url, "Extract ALL content from this case study in detail: every heading, paragraph,
   bullet point, metadata, statistics, quotes, and image descriptions. Be thorough.")
   ```

2. Use `WebFetch` again to get raw text in order:
   ```
   WebFetch(url, "Extract every paragraph, sentence, and piece of body text exactly as written,
   in order. Do NOT summarize. Include bullet points, labels, captions, alt text.")
   ```

3. Use the browse skill to navigate and list all image URLs:
   ```bash
   $B goto <URL>
   $B wait --load
   sleep 1.5
   $B js "JSON.stringify(Array.from(document.querySelectorAll('img')).map(i => ({src: i.src, w: i.naturalWidth, h: i.naturalHeight})))"
   ```

4. Download all images to `/tmp/{project-slug}/`:
   ```bash
   mkdir -p /tmp/{project-slug}
   curl -sL "{image-url}" -o /tmp/{project-slug}/01.png
   ```

5. View each downloaded image using the Read tool to understand the design work.

### If source is a PDF:

1. Read the PDF using the Read tool with pages parameter for large files:
   ```
   Read(file_path, pages: "1-10")
   ```
2. Extract all text, headings, bullet points, and identify any embedded images.
3. For PDFs, images may not be extractable — note which images the user will need to provide.

## Phase 2: Analyze & Collect Missing Info

After extracting, you should have:
- Project title and description
- All text content in order
- Image inventory with descriptions of what each image shows

Use `AskUserQuestion` to collect any missing metadata:
- Client name
- Your role on this project
- Timeline (how long, when)
- Industry
- Any outcomes or metrics you remember
- Anything you want to add or change from the original

## Phase 3: Write Project Markdown

Create a markdown file in the appropriate category folder:

```
projects/{category-folder}/{project-slug}.md
```

Category folder mapping:
- Agentic Design → `agentic-design`
- UI/UX Design → `ui-ux-design`
- Visual Design → `visual-design`
- Brand Design → `brand-design`

Use the template structure from `projects/_instructions/case-study-template.md` but fill in
all the content extracted from the source. Include:
- Quick Facts (client, category, role, timeline, industry)
- The Problem (from business perspective)
- The Approach (process, decisions, tools)
- The Solution (what was delivered)
- The Outcome (metrics, feedback, impact)
- Image inventory table describing each image
- Raw notes and recommendations for the CMS version

## Phase 4: Build CMS Blocks

### Create the project in Supabase

Read credentials from `.env.local`:
```bash
SUPABASE_URL=$(grep '^NEXT_PUBLIC_SUPABASE_URL=' .env.local | cut -d'=' -f2-)
SERVICE_KEY=$(grep '^SUPABASE_SERVICE_ROLE_KEY=' .env.local | cut -d'=' -f2-)
```

Insert the project:
```bash
curl -s "${SUPABASE_URL}/rest/v1/projects" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "title": "PROJECT TITLE",
    "slug": "project-slug",
    "description": "One-line description",
    "status": "draft",
    "is_featured": false,
    "sort_order": 0,
    "category_tags": ["CATEGORY"],
    "client_name": "CLIENT",
    "project_role": "ROLE",
    "project_timeline": "TIMELINE",
    "project_industry": "INDUSTRY"
  }'
```

Extract the project ID from the response.

### Insert blocks

Build a JSON array of blocks and insert them all at once:

```bash
curl -s "${SUPABASE_URL}/rest/v1/project_blocks" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d @/tmp/blocks.json
```

### Block construction rules

**CRITICAL RULES — learned from experience:**

1. **NO SPACER BLOCKS.** The case study page has `space-y-20` (80px) between every block
   automatically. Spacers create excessive whitespace. Never insert spacer blocks.

2. **Images left blank.** Set `"url": ""` for all image and gallery image slots. The user
   uploads images manually through the admin panel. Fill in `alt` text and `caption` with
   descriptive text so the user knows which image goes where.

3. **No empty gallery slots.** Each gallery image entry must have meaningful alt text.
   Only include the exact number of images the gallery needs — no placeholders.

4. **Describe images by content, not file names.** When writing alt text, describe what
   the screen/design shows (e.g., "Home screen with breaking news hero and article feed")
   not file references.

5. **Use heading1 for major sections, heading2 for subsections.**

6. **Dividers between major sections** (between heading1 blocks).

### Block content formats

```json
// text
{"block_type": "text", "content": {"html": "<p>Paragraph text here</p>"}}

// heading1 (major section)
{"block_type": "heading1", "content": {"text": "Section Title"}}

// heading2 (subsection)
{"block_type": "heading2", "content": {"text": "Subsection Title"}}

// image (blank for user to upload)
{"block_type": "image", "content": {"url": "", "alt": "Description of what this image shows", "caption": "Caption text", "display": "default"}}
// display options: "default", "full-width", "small"

// gallery (blank images for user to upload)
{"block_type": "gallery", "content": {"layout": "grid", "columns": 2, "images": [
  {"url": "", "alt": "Description of image 1", "caption": "Caption 1"},
  {"url": "", "alt": "Description of image 2", "caption": "Caption 2"}
]}}

// metric_row
{"block_type": "metric_row", "content": {"metrics": [
  {"prefix": "", "value": "40+", "suffix": "", "label": "Screens Designed"},
  {"prefix": "", "value": "4", "suffix": " weeks", "label": "Timeline"}
]}}

// list (bulleted)
{"block_type": "list", "content": {"list_type": "bulleted", "items": [
  {"id": "unique-id", "text": "Item text"}
]}}

// list (numbered)
{"block_type": "list", "content": {"list_type": "numbered", "items": [
  {"id": "unique-id", "text": "Item text"}
]}}

// quote
{"block_type": "quote", "content": {"text": "Quote text", "attribution": "Source or empty"}}

// divider
{"block_type": "divider", "content": {"style": "default"}}

// callout
{"block_type": "callout", "content": {"value": "Big number", "label": "Label", "description": "Optional detail", "style": "highlight"}}
```

### Recommended case study structure

A good case study follows this narrative arc:

1. **Hero image** (full-width) — the signature mockup
2. **Introduction text** — what this project is, one paragraph
3. **Metric row** — key stats (screens designed, timeline, etc.)
4. **"The Challenge" heading2** — business problem
5. **Text + list** — problem description and challenges
6. **Supporting image** — challenge context visual
7. **Major sections** (heading1 + divider between each):
   - The design work broken into logical sections
   - Each section: heading2 → text → image or gallery
   - Use galleries for related screens (sign up flow, navigation, etc.)
   - Use single images for hero shots or annotated screenshots
8. **Design System section** (if applicable) — colors, typography, accessibility
9. **Outcomes** — metric row + bulleted list of results
10. **Learnings** — numbered list of takeaways
11. **Closing quote** — one powerful statement

## Phase 5: Confirm

After inserting all blocks, tell the user:

1. The project name and that it's saved as **draft** in the admin panel
2. The admin URL: `https://shashi-portfolio-xi.vercel.app/admin/projects/{PROJECT_ID}`
3. How many blocks were created
4. How many image slots need to be filled
5. Remind them: "Upload your images in the admin editor. Hover any image area and
   press Cmd+V to paste from clipboard, or click to browse."

Then ask: "Want me to publish it and revalidate the public pages?"

If yes, update the project status to published:
```bash
curl -s "${SUPABASE_URL}/rest/v1/projects?id=eq.{PROJECT_ID}" \
  -X PATCH \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"status": "published"}'
```

And revalidate:
```bash
REVALIDATION_SECRET=$(grep '^REVALIDATION_SECRET=' .env.local | cut -d'=' -f2-)
curl -s -X POST "https://shashi-portfolio-xi.vercel.app/api/revalidate" \
  -H "Content-Type: application/json" \
  -d "{\"secret\": \"${REVALIDATION_SECRET}\", \"path\": \"/works/{slug}\"}"
curl -s -X POST "https://shashi-portfolio-xi.vercel.app/api/revalidate" \
  -H "Content-Type: application/json" \
  -d "{\"secret\": \"${REVALIDATION_SECRET}\", \"path\": \"/works\"}"
curl -s -X POST "https://shashi-portfolio-xi.vercel.app/api/revalidate" \
  -H "Content-Type: application/json" \
  -d "{\"secret\": \"${REVALIDATION_SECRET}\", \"path\": \"/\"}"
```
