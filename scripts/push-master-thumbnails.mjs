// One-shot: insert Master App Thumbnails case study (status='draft').
// Uploads the 4 shift before/after pairs + the breakthrough thumbnail to
// Supabase storage, then inserts blocks. Hero, range grid, charts, and
// selected-work gallery slots are intentionally left blank for the user
// to fill via the admin panel.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envText = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const SLUG = "master-app-thumbnails";
const BUCKET = "portfolio-images";
const IMAGE_DIR = "/Users/eloelo/Documents/Claude Projects/Abomination/case-study/images";

const PRE_UPLOAD = [
  "act-04-the-turn.png",
  "shift-01-text-before.png",
  "shift-01-text-after.png",
  "shift-02-layout-before.png",
  "shift-02-layout-after.png",
  "shift-03-colour-before.png",
  "shift-03-colour-after.png",
  "shift-04-ai-after.png",
];

// Block factories
const p = (md) => {
  const html = md
    .replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+?)\*/g, "<em>$1</em>");
  return { html: `<p>${html}</p>` };
};
const h1 = (text) => ({ text });
const h2 = (text) => ({ text });
const callout = (value, label, description) => ({
  value,
  label,
  ...(description && { description }),
  style: "highlight",
});
const quote = (text, attribution = "") => ({
  text,
  ...(attribution && { attribution }),
});
const divider = () => ({ style: "default" });
const metricRow = (...metrics) => ({ metrics });
const list = (type, items) => ({
  list_type: type,
  items: items.map((text, i) => ({
    id: `m-${Math.random().toString(36).slice(2, 8)}-${i}`,
    text,
  })),
});
const imageEmpty = (alt, caption = "", display = "default") => ({
  url: "",
  alt,
  caption,
  display,
});
const imageWithUrl = (url, alt, caption = "", display = "default") => ({
  url,
  alt,
  caption,
  display,
});
const galleryEmpty = (columns, slots) => ({
  layout: "grid",
  columns,
  images: slots.map((s) => ({ url: "", alt: s.alt, caption: s.caption || "" })),
});
const galleryWithUrls = (columns, items) => ({
  layout: "grid",
  columns,
  images: items.map((i) => ({
    url: i.url,
    alt: i.alt,
    caption: i.caption || "",
  })),
});

async function uploadImages() {
  console.log(`→ Uploading ${PRE_UPLOAD.length} images to ${BUCKET}/projects/${SLUG}/...`);
  const urls = {};
  for (const filename of PRE_UPLOAD) {
    const localPath = resolve(IMAGE_DIR, filename);
    const buffer = readFileSync(localPath);
    const remotePath = `projects/${SLUG}/${filename}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(remotePath, buffer, {
        contentType: "image/png",
        upsert: true,
      });
    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(remotePath);
    urls[filename] = publicUrl;
    console.log(`  ✓ ${filename}`);
  }
  return urls;
}

const project = {
  title: "Master App Thumbnails",
  slug: SLUG,
  description:
    "Improving thumbnail CTR through craft on Eloelo's Master app — median CTR doubled (0.81% → 1.52%) and miss rate halved (56.5% → 23.3%) across 833 live thumbnails over 4.5 months. A four-shift transformation across text, layout, colour, and AI.",
  status: "draft",
  category_tags: [
    "Visual Design",
    "Thumbnail Design",
    "Creator Economy",
    "Hindi-first",
  ],
  client_name: "Eloelo (Master app)",
  project_role:
    "Thumbnail Designer — visual craft, AI workflow, repeatable system",
  project_timeline: "8 Dec 2025 → 22 Apr 2026 (~4.5 months · 833 thumbnails)",
  project_industry: "Creator Economy / Vernacular Content",
  is_featured: false,
};

function buildBlocks(urls) {
  const u = (n) => urls[n];

  return [
    // ===========================================================
    // ACT 1 — THE HOOK
    // ===========================================================
    [
      "image",
      imageEmpty(
        "Hero before/after pair — same topic, two thumbnails, two CTRs",
        "Before / after — the difference, in one image",
        "full-width",
      ),
    ],
    [
      "quote",
      quote(
        "In four months I shipped 833 thumbnails. This one clicked twice as much as the other. Here's how I learned to tell the difference.",
      ),
    ],

    // ===========================================================
    // ACT 2 — THE JOB
    // ===========================================================
    ["divider", divider()],
    ["heading1", h1("The Job")],
    [
      "text",
      p(
        "The Master app is a high-volume vernacular short-form content platform. As a thumbnail designer, I produce work across **16+ content categories** — Devotion & Dharma, Banking & Finance, New Business Ideas, Sports, Astrology, Trending news, Phone & Internet Tips, government schemes, and more.",
      ),
    ],
    [
      "text",
      p("The role has three constraints that shape every decision:"),
    ],
    [
      "list",
      list("numbered", [
        "<strong>Volume.</strong> Roughly 50+ thumbnails shipped per week.",
        "<strong>Variety.</strong> No two days look alike — I move between scams, scriptural stories, cricket, AI tutorials, festival explainers.",
        "<strong>Hindi-first audience reading fast.</strong> Type weight, colour contrast, and emotional framing all carry the click. There is no second chance on a scrolling feed.",
      ]),
    ],
    [
      "text",
      p(
        "My metric is the click. The video earns the watch — that's not mine to claim.",
      ),
    ],
    [
      "gallery",
      galleryEmpty(3, [
        { alt: "Range thumbnail 1 — Devotion category" },
        { alt: "Range thumbnail 2 — Finance category" },
        { alt: "Range thumbnail 3 — Sports category" },
        { alt: "Range thumbnail 4 — Astrology category" },
        { alt: "Range thumbnail 5 — Trending news category" },
        { alt: "Range thumbnail 6 — AI / Tech category" },
      ]),
    ],

    // ===========================================================
    // ACT 3 — THE HONEST MIRROR
    // ===========================================================
    ["divider", divider()],
    ["heading1", h1("The Honest Mirror")],
    [
      "text",
      p(
        "When I pulled my own performance data in early 2026, the picture was honest: the median Shashi thumbnail clicked at under 1%, and roughly two-thirds of my work fell into the &ldquo;missed&rdquo; bucket. I had occasional spikes, but the floor was not moving.",
      ),
    ],
    [
      "callout",
      callout(
        "56.5%",
        "of my thumbnails were clicking under 1%",
        "Five months of plateau. The ceiling wasn't the problem.",
      ),
    ],
    ["quote", quote("I had taste. I didn't have a craft.")],
    [
      "image",
      imageEmpty(
        "Median CTR by month — Dec 0.81%, Jan 0.65%, Feb 0.76%, Mar 0.60%, Apr 1.52%. The April bar is highlighted.",
        "Five-month plateau, then April",
        "default",
      ),
    ],
    [
      "quote",
      quote(
        "The task wasn't to make a great thumbnail. It was to stop making weak ones.",
      ),
    ],

    // ===========================================================
    // ACT 4 — THE TURN
    // ===========================================================
    ["divider", divider()],
    ["heading1", h1("The Turn")],
    [
      "text",
      p(
        "For weeks I was iterating fast — pushing AI hard to give me as many variations on an idea as I could ship in a day. Then one iteration came back, and I stopped.",
      ),
    ],
    [
      "callout",
      callout(
        "This isn't a fluke.",
        "I can name what's working here. I can do it on purpose.",
      ),
    ],
    ["text", p("That was the turn. Not a tool. A way of looking.")],
    [
      "text",
      p(
        "What followed was a system: custom AI agents for researching styles, reusable text-style references, and an automation that takes an idea and returns well-shaped options instead of random shots. The agents didn't make the work better — they made repeatable what used to be lucky.",
      ),
    ],
    [
      "image",
      imageWithUrl(
        u("act-04-the-turn.png"),
        "The breakthrough thumbnail — the iteration that made me stop and realise the result was repeatable",
        "The thumbnail that named the craft",
        "default",
      ),
    ],

    // ===========================================================
    // ACT 5 — THE JOURNEY, IN FOUR SHIFTS
    // ===========================================================
    ["divider", divider()],
    ["heading1", h1("The Journey, in Four Shifts")],
    [
      "text",
      p(
        "The four shifts didn't happen on one day. They emerged once I started looking at my own work the way I'd look at someone else's — honestly, and one decision at a time.",
      ),
    ],

    // --- SHIFT 01 — TEXT ---
    ["heading2", h2("Shift 01 — Text: from decoration to delivery")],
    [
      "callout",
      callout(
        "Principle",
        "One headline, said well, beats six things shouted at once.",
      ),
    ],
    [
      "text",
      p(
        "<strong>Before.</strong> Unorganised text. Too many words. No hierarchy, no readability check, no thought about minimum size or accessibility. Type was decoration on top of an image.",
      ),
    ],
    [
      "text",
      p(
        "<strong>After.</strong> First, I cut elements. The thumbnail has one job in one second of scroll — everything beyond that is cognitive tax. Then I changed how the words *look*: stylised type built in Illustrator (or shaped with AI), tuned for contrast against the background, sized for legibility on a 4-inch phone. The text stopped being pasted on top of the composition and became part of it.",
      ),
    ],
    [
      "gallery",
      galleryWithUrls(2, [
        {
          url: u("shift-01-text-before.png"),
          alt: "Text — before. Multiple competing text elements, no hierarchy, default white text on a busy background.",
          caption: "Before",
        },
        {
          url: u("shift-01-text-after.png"),
          alt: "Text — after. Reduced text count, stylised type with strong contrast against the background.",
          caption: "After",
        },
      ]),
    ],

    // --- SHIFT 02 — LAYOUT ---
    ["heading2", h2("Shift 02 — Layout: from arranging to directing")],
    [
      "callout",
      callout(
        "Principle",
        "One subject in the middle. Everything else exists to point at it.",
      ),
    ],
    [
      "text",
      p(
        "<strong>Before.</strong> Every thumbnail was a fight — three elements competing for the eye, no visual hierarchy.",
      ),
    ],
    [
      "text",
      p(
        "<strong>After.</strong> I designed around a single focal point: the subject lives in the centre, peripheral elements give just enough context for the topic, nothing more. The harder call was knowing when the *graphic* shouldn't be the hero — when the topic can't be said in an image and the headline has to lead. Learning to make that call thumbnail by thumbnail was the real layout shift.",
      ),
    ],
    [
      "quote",
      quote(
        "Craft tactic — to stress-test contrast, I desaturate the image. If it still reads in greyscale, it works in the feed.",
      ),
    ],
    [
      "gallery",
      galleryWithUrls(2, [
        {
          url: u("shift-02-layout-before.png"),
          alt: "Layout — before. Multiple competing elements, no clear focal point, visual chaos.",
          caption: "Before",
        },
        {
          url: u("shift-02-layout-after.png"),
          alt: "Layout — after. Single subject centred, peripheral elements supporting context, clear hierarchy.",
          caption: "After",
        },
      ]),
    ],

    // --- SHIFT 03 — COLOUR ---
    ["heading2", h2("Shift 03 — Colour: from palette to hierarchy")],
    [
      "callout",
      callout(
        "Principle",
        "Pick the colour that already belongs to the topic, then build around it.",
      ),
    ],
    [
      "text",
      p(
        "<strong>Before.</strong> Five colours per thumbnail. White text on top by default. No thought to how the colours interacted.",
      ),
    ],
    [
      "text",
      p(
        "<strong>After.</strong> A three-step hierarchy I run on every brief:",
      ),
    ],
    [
      "list",
      list("numbered", [
        "<strong>Context first.</strong> If the topic has a recognisable colour — Indian flag, a brand, a sport — start there.",
        "<strong>Psychology second.</strong> If not, lean on colour psychology — what should the user <em>feel</em> before they read a word?",
        "<strong>Text last.</strong> The text colour is chosen to contrast the background — not defaulted to white.",
      ]),
    ],
    [
      "gallery",
      galleryWithUrls(2, [
        {
          url: u("shift-03-colour-before.png"),
          alt: "Colour — before. Multiple unrelated colours, default white text, no relationship to the topic.",
          caption: "Before",
        },
        {
          url: u("shift-03-colour-after.png"),
          alt: "Colour — after. Topic-grounded palette, contrast-tuned text, intentional emotional tone.",
          caption: "After",
        },
      ]),
    ],

    // --- SHIFT 04 — AI ---
    ["heading2", h2("Shift 04 — AI: from button to system")],
    [
      "callout",
      callout(
        "Principle",
        "AI is a junior designer that produces fifty drafts. The taste is still mine.",
      ),
    ],
    [
      "text",
      p(
        "<strong>Before.</strong> AI was a button I pressed when I was stuck — unstructured, single-shot, used just enough to get the work out.",
      ),
    ],
    [
      "text",
      p(
        '<strong>After.</strong> A system. Custom AI agents do the legwork — researching reference styles per topic, generating prompt templates I reuse. A library of predefined text styles lives alongside them, so the agents have grammar to work from. (I built that agent system as a standalone project — see <a href="/works/gamma">Gamma</a>.)',
      ),
    ],
    [
      "text",
      p(
        "What changed isn't that I use AI more. It's that I no longer ask it to *do* the design. I ask it to widen the search.",
      ),
    ],
    [
      "image",
      imageWithUrl(
        u("shift-04-ai-after.png"),
        "AI workflow output — multiple style options generated from a single idea, the search widened.",
        "AI as a search-widener, not a design-doer",
        "default",
      ),
    ],

    // --- CLOSING THE JOURNEY ---
    [
      "text",
      p(
        "The four shifts compounded. None of them alone would have moved the floor. Together — and once they were habits, not decisions I had to make every time — the median CTR doubled and the miss rate fell from 56.5% to 23.3%.",
      ),
    ],

    // ===========================================================
    // ACT 6 — THE PROOF
    // ===========================================================
    ["divider", divider()],
    ["heading1", h1("The Proof")],
    [
      "text",
      p(
        "Across four and a half months and 833 live thumbnails, the floor moved. The ceiling didn't change much — what changed is how often I missed.",
      ),
    ],
    [
      "metric_row",
      metricRow(
        { prefix: "", value: "0.81% → 1.52%", suffix: "", label: "Median CTR (Dec → Apr)" },
        { prefix: "", value: "56.5% → 23.3%", suffix: "", label: "Miss rate (CTR < 1%)" },
        { prefix: "", value: "8.7% → 14.0%", suffix: "", label: "Hit rate (CTR ≥ 3%)" },
        { prefix: "", value: "63.0M", suffix: "", label: "Total impressions" },
      ),
    ],
    ["heading2", h2("Monthly evolution")],
    [
      "text",
      p(
        "December through March, my median CTR sat between 0.60% and 0.81% — a five-month plateau. April broke that pattern. Average CTR rose from 0.90% to 2.00% in the same month, and the share of work clicking above 3% nearly quadrupled — from 3.7% in March to 14.0% in April.",
      ),
    ],
    [
      "image",
      imageEmpty(
        "Monthly evolution table — thumbnails, average CTR, median CTR, hit rate, miss rate by month from Dec 2025 to Apr 2026",
        "Monthly evolution",
        "default",
      ),
    ],
    ["heading2", h2("The fortnight inflection")],
    [
      "text",
      p(
        "At a 2-week resolution the inflection becomes precise. From <strong>09–22 Mar</strong> (median 0.47%, miss rate 74.2%) to <strong>23 Mar–05 Apr</strong> (median 1.08%, miss rate 47.5%) to <strong>06–19 Apr</strong> (median 1.50%, miss rate 21.2%). In one fortnight the median more than doubled and the miss rate dropped almost 27 points. The improvement held.",
      ),
    ],
    [
      "image",
      imageEmpty(
        "Fortnight inflection table — windows around the late-March turn showing median CTR rising and miss rate falling",
        "The fortnight the curve broke",
        "default",
      ),
    ],
    ["heading2", h2("Every category lifted")],
    [
      "text",
      p(
        "Every major category moved up in April. <strong>AI Se Editing</strong> — historically my weakest — went from 0.40% in March to 1.99% in April. The improvement wasn't isolated to a category I happened to be lucky in. It applied to everything I touched.",
      ),
    ],
    [
      "image",
      imageEmpty(
        "Category-level CTR table — six top-volume categories (New Business Ideas, Banking & Finance, Sports, AI Se Editing, Secrets of India, Trending) by month, all lifting in April",
        "Category-level CTR — every row moved",
        "default",
      ),
    ],

    // ===========================================================
    // ACT 7 — RANGE
    // ===========================================================
    ["divider", divider()],
    ["heading1", h1("Range")],
    [
      "text",
      p(
        "A small selection across categories — chosen for breadth, not for top CTR. The point is the work, not the metric.",
      ),
    ],
    [
      "gallery",
      galleryEmpty(3, [
        { alt: "Selected work — Devotion & Dharma" },
        { alt: "Selected work — Banking & Finance" },
        { alt: "Selected work — Trending news" },
        { alt: "Selected work — Sports" },
        { alt: "Selected work — Secrets of India" },
        { alt: "Selected work — Astrology / Aaj Ka Rashifal" },
        { alt: "Selected work — Devotion (alt)" },
        { alt: "Selected work — Phone & Internet Tips" },
        { alt: "Selected work — New Business Ideas" },
      ]),
    ],

    // ===========================================================
    // REFLECTION
    // ===========================================================
    ["divider", divider()],
    ["heading1", h1("Reflection")],
    [
      "text",
      p(
        "833 thumbnails. 16+ categories. One scrolling feed that doesn't slow down.",
      ),
    ],
    [
      "text",
      p(
        "The improvement curve is the case study. One good thumbnail is taste; lifting 800 of them is craft.",
      ),
    ],
    [
      "quote",
      quote(
        "The task wasn't to make a great thumbnail. It was to stop making weak ones.",
      ),
    ],

    // ===========================================================
    // METHODOLOGY
    // ===========================================================
    ["divider", divider()],
    ["heading2", h2("A note on methodology")],
    [
      "list",
      list("bulleted", [
        "<strong>Data source:</strong> the platform's internal performance dashboard. CTR is the platform-reported <code>ctr_real</code> value.",
        "<strong>Designer attribution:</strong> cross-referenced via the Master app's Topics Tracker so the analysis only includes thumbnails actually designed by me.",
        "<strong>Median over average:</strong> average CTR is sensitive to outliers; median better reflects the typical thumbnail. Both improved; I lead with median because it's the more honest number.",
        "<strong>Aaj Ka Rashifal</strong> is platform-promoted, which inflates its CTR. The numbers above include Rashifal for completeness; the non-Rashifal April median (1.46%) tells the same story.",
        "<strong>Completion rate is excluded.</strong> It's determined by video content, pacing, and creator delivery — not thumbnail design. Reporting it as my result would be overstating my contribution.",
        "<strong>Window:</strong> 8 December 2025 → 22 April 2026.",
      ]),
    ],
  ];
}

// ============ EXECUTION ============

console.log("→ Creating project record...");
const { data: existing } = await supabase
  .from("projects")
  .select("id")
  .eq("slug", SLUG)
  .maybeSingle();

if (existing) {
  console.log(`  ! Project with slug '${SLUG}' already exists (id: ${existing.id}).`);
  console.log("  Aborting to avoid duplicate. Delete the existing project from admin if you want to re-run.");
  process.exit(1);
}

const { data: created, error: projErr } = await supabase
  .from("projects")
  .insert(project)
  .select("id")
  .single();
if (projErr) throw projErr;
const PROJECT_ID = created.id;
console.log(`  ✓ Project created: ${PROJECT_ID}`);

const urls = await uploadImages();

const blockTuples = buildBlocks(urls);
const payload = blockTuples.map(([block_type, content], i) => ({
  project_id: PROJECT_ID,
  sort_order: i,
  block_type,
  content,
}));

console.log(`→ Inserting ${payload.length} blocks...`);
const { error: blockErr } = await supabase.from("project_blocks").insert(payload);
if (blockErr) throw blockErr;
console.log(`  ✓ ${payload.length} blocks inserted.`);

// Image-slot summary
const imageBlocks = blockTuples.filter(([t]) => t === "image");
const galleryBlocks = blockTuples.filter(([t]) => t === "gallery");
const emptyImages = imageBlocks.filter(([, c]) => c.url === "").length;
const filledImages = imageBlocks.length - emptyImages;
const emptyGallerySlots = galleryBlocks.reduce(
  (sum, [, c]) => sum + c.images.filter((i) => i.url === "").length,
  0,
);
const filledGallerySlots = galleryBlocks.reduce(
  (sum, [, c]) => sum + c.images.filter((i) => i.url !== "").length,
  0,
);

console.log(`\n=== Summary ===`);
console.log(`Project ID:        ${PROJECT_ID}`);
console.log(`Slug:              ${SLUG}`);
console.log(`Total blocks:      ${payload.length}`);
console.log(`Image slots:       ${filledImages} pre-filled, ${emptyImages} for you to upload`);
console.log(`Gallery slots:     ${filledGallerySlots} pre-filled, ${emptyGallerySlots} for you to upload`);
console.log(`Admin URL:         https://shashi-portfolio-xi.vercel.app/admin/projects/${PROJECT_ID}`);
