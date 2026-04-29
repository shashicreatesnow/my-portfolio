// One-shot: insert DMS Solars case study (status='draft') with image URLs already set.
// Re-run safe: deletes existing project, re-uploads images (upsert), re-inserts blocks.
//
// Source images expected at IMAGE_DIR (downloaded from the Framer source page).
// Uploads them to Supabase storage at projects/<slug>/<filename> and uses
// those public URLs in the inserted image blocks.

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

const SLUG = "dms-solars-brand-identity";
const BUCKET = "portfolio-images";
const IMAGE_DIR = "/tmp/dms-imgs";

// Image filenames in the order the case study uses them (10 total).
// These were downloaded from the original Framer source page.
const IMAGE_FILES = [
  "82lfgUKh3YDej4Gt2nBmDveCiE8.jpg", // 1. Hero — Brand Guide cover
  "HGgFsJOvn52Pza8im1N6H3eIrtI.jpg", // 2. Vision page
  "OVpVRjt4XgMBX7puIzYzf5riT7U.jpg", // 3. Branding Challenge bullets
  "W5lV2QUOvmqq1PRQWN5JxeP1c.jpg",  // 4. Brand Core Values
  "0mlDlgH4vcGRqwntQ6pfrUO11OQ.jpg", // 5. Logo Usage — 6 variants
  "LNufEFFyibCPEZCAZHBiXrAQSU.jpg", // 6. Incorrect Usage — 10 don'ts
  "5FPCyMJHxeCKeYT89dsvkjUt6zY.jpg", // 7. Colour Palette
  "5VWSBCVHuV4ncanFqmmgNGsDfq0.jpg", // 8. Typography
  "eUkuUBbfuTvp4yX6CHGxhmPaO04.jpg", // 9. Mockups — polo, packaging, truck
  "l8xNra7EnPnFtlGbyhkYhZifg.jpg",  // 10. Mockups — card, phone, tote
];

// Block helpers
const p = (md) => {
  const html = md
    .replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+?)\*/g, "<em>$1</em>");
  return { html: `<p>${html}</p>` };
};
const h1 = (text) => ({ text, level: "h1" });
const callout = (value, label) => ({ value, label, style: "highlight" });
const quote = (text, attribution) => ({ text, ...(attribution && { attribution }) });
const divider = () => ({ style: "thin" });
const metricRow = (...m) => ({ metrics: m });

// Image block factory bound to an uploaded URL list — pulls the next URL each call.
function makeImageFactory(urls) {
  let idx = 0;
  return {
    full: (alt, caption) => ({
      url: urls[idx++],
      alt,
      caption: caption || "",
      display: "full-width",
    }),
    contained: (alt, caption) => ({
      url: urls[idx++],
      alt,
      caption: caption || "",
      display: "default",
    }),
    used: () => idx,
  };
}

const project = {
  title: "DMS Solars — Brand Identity for a Renewable Energy Devices Company",
  slug: SLUG,
  description:
    "A full brand identity and 8-section brand guide for a renewable energy devices company. One mark compressing three category cues — solar panel, sun, lightning bolt — into a single geometric form. Two-colour discipline, Montserrat throughout, six lockups, ten don'ts.",
  status: "draft",
  category_tags: ["Brand Design", "Identity Systems", "Renewable Energy", "Brand Guidelines"],
  client_name: "DMS Solars (Renewable energy devices)",
  project_role:
    "Brand identity, logo system, colour & type systems, application mockups, brand guidelines",
  project_timeline: "3 weeks · 2025",
  project_industry: "Renewable Energy",
  is_featured: false,
};

async function uploadImages() {
  console.log(`→ Uploading ${IMAGE_FILES.length} images to ${BUCKET}/projects/${SLUG}/...`);
  const urls = [];
  for (const filename of IMAGE_FILES) {
    const localPath = resolve(IMAGE_DIR, filename);
    const buffer = readFileSync(localPath);
    const remotePath = `projects/${SLUG}/${filename}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(remotePath, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });
    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(remotePath);
    urls.push(publicUrl);
    console.log(`  ✓ ${filename}`);
  }
  return urls;
}

function buildBlocks(urls) {
  const img = makeImageFactory(urls);

  const blocks = [
    // HERO
    ["image", img.full(
      "DMS Solars Brand Guide cover — primary logo (a teal solar panel with a yellow sun rising over it and a lightning bolt cut into the lower-left) plus the wordmark DMS in teal and SOLARS in yellow, set on a cream background with the headline 'Brand Guide'",
      "The Brand Guide cover"
    )],

    // OPENING
    ["text", p("**DMS Solars sells solar energy devices.** Panels, inverters, batteries — physical equipment that goes on a roof and stays there for fifteen years. The brief came in plain: a fresh visual identity that felt as forward-thinking as the company's mission, but built to live on the side of a delivery truck and inside a 32-pixel app icon. Three weeks. End-to-end. From mark to mockups to the eight-section brand guide that left with the client.")],
    ["metric_row", metricRow(
      { value: "3", label: "weeks" },
      { value: "6", label: "logo lockups" },
      { value: "8", label: "sections in the final brand guide" },
    )],

    // VISION
    ["divider", divider()],
    ["heading1", h1("Vision")],
    ["image", img.contained(
      "Vision page from the brand guide — large pull quote reading 'DMS Solars is more than a solar energy provider — it's a visionary company for a cleaner, brighter future' with a smaller paragraph beneath",
      "The brand vision page"
    )],
    ["callout", callout("DMS Solars is more than a solar energy provider — it's a visionary company for a cleaner, brighter future.", "The line that anchored the whole brand")],
    ["text", p("When I joined the journey, my challenge was to translate three things — innovation, reliability, and the eco-friendly promise — into a visual identity that felt as forward-thinking as the mission itself. Not a campaign. A *system.* Something that could survive being applied by a regional sales partner without me in the room.")],

    // THE BRANDING CHALLENGE
    ["divider", divider()],
    ["heading1", h1("The Branding Challenge")],
    ["image", img.contained(
      "Branding challenge page listing three requirements — Expressing a clear mission and vision, Standing out in a competitive market, Ensuring consistency across platforms — followed by Key Branding Objectives: Professionalism, Highlight Innovation, Embed Sustainability",
      "Three constraints, three objectives"
    )],
    ["text", p("Three real constraints sat on top of every decision. **Expressing a clear mission and vision** — the brand had to *say* sustainability and innovation without putting either word on a poster. **Standing out in a competitive market** — every renewable-energy brand was already reaching for the same iconography: a sun, a leaf, a gradient. **Ensuring consistency across platforms** — the mark had to read on a polo embroidery, a 32-pixel favicon, a vehicle wrap, and a printed brochure with no follow-up call to the designer.")],
    ["callout", callout("Professionalism. Highlight Innovation. Embed Sustainability.", "Three objectives the rest of the work answered to")],

    // BRAND CORE VALUES
    ["divider", divider()],
    ["heading1", h1("Brand Core Values")],
    ["image", img.contained(
      "Brand core values page listing three values — Sustainability, Innovation, and Trust & Professionalism — each with a one-sentence description",
      "Three values encoded into the system"
    )],
    ["text", p("**Sustainability** — encoded in colour and form before it was named anywhere. The blue is *earth-stable.* The yellow is *sun-source.* No leaves, no globes, no recycle arrows.")],
    ["text", p("**Innovation** — carried by the geometry. Forward-leaning panel grid, clean angles, no decorative flourish. The mark looks like a piece of equipment, not a campaign.")],
    ["text", p("**Trust & Professionalism** — carried by restraint. Two colours, one typeface, one mark. The brand never raises its voice, because the product it sells stays on a roof for fifteen years and has to look like it knows what it's doing.")],

    // THE MARK
    ["divider", divider()],
    ["heading1", h1("One Mark, Three Category Cues")],
    ["image", img.full(
      "Logo usage page showing six lockup variants — Primary Logo, Dark Theme (logo in yellow on navy), Alternate Theme (logo in navy on yellow), Icon (the panel-and-sun mark alone), Horizontal lockup, and Vertical lockup",
      "Six lockups for six surfaces"
    )],
    ["text", p("The DMS Solars mark compresses three category cues into a single geometric form. **A solar panel** — the rectangular grid of cells, drawn at the same forward tilt every panel takes on a roof. **A sun** — the half-disc with rays rising over the panel's top edge. **A lightning bolt** — cut into the panel's lower-left corner as negative space, the energy the panel actually produces. Three references, one shape, no gradient required to make any of them legible.")],
    ["text", p("The wordmark sits flush right of the icon. *DMS* in deep teal — the company. *SOLARS* in sun-yellow, set below — the category. The colour split is the only hierarchy the lockup needs.")],
    ["text", p("**Six lockups for six surfaces.** The primary lockup for marketing and pitch decks. A dark-theme variant in a navy panel for night and dark-mode contexts. An alternate theme on the yellow ground for moments the brand wants warmth. An icon-only mark for app icons, favicons, and embroidery patches. A horizontal lockup for narrow letterhead and email signatures. A vertical lockup for tall surfaces — banner stands, packaging side panels, social profile crops. Every variant tested at 32 pixels before it shipped.")],

    // WHAT NOT TO DO
    ["divider", divider()],
    ["heading1", h1("What Not to Do")],
    ["image", img.full(
      "Incorrect Usage page — ten don'ts shown in a two-row grid, covering both the lockup and the icon-only mark — including Do not skew, Do not change order of icon and text, Do not outline, Do not stretch, Do not use gradient",
      "Ten don'ts that protect the brand after handover"
    )],
    ["text", p("The most useful page in any brand guide isn't the colour palette. **It's the don'ts page.** This one runs ten violations across two rows — covering both the lockup and the icon-only mark. *Do not skew. Do not change the order of icon and text. Do not outline. Do not stretch. Do not use gradient.* Each rule has a visual example of the violation, sitting right next to the rule.")],
    ["text", p("The reason the don'ts page matters is that the brand will be applied by people who weren't in the meeting. A regional partner ordering tee shirts. A printer recreating the logo because the file lost its embedded fonts. A junior marketing hire making a deck the night before a pitch. **The don'ts are the part of the brand that protects itself when the designer isn't in the room.**")],
    ["callout", callout("The don'ts are the part of the brand guide that does the most work after handover.", "Why this page took the longest")],

    // COLOUR
    ["divider", divider()],
    ["heading1", h1("Two Colours, Five Shades Each")],
    ["image", img.full(
      "Colour palette page showing three columns — Primary Color (five teal-blue swatches from #177296 to #072530 with hex and CMYK values), Secondary Color (five warm yellow-to-bronze swatches from #FFD77A to #916B10), and Greys (six neutral steps from #C6E2F0 to #1E2224)",
      "The full palette — two families and a neutral"
    )],
    ["text", p("The palette is two families and a neutral. **A primary blue range** — five shades, from a mid teal (#177296) down through the ocean tones to a near-black navy (#072530). **A secondary yellow range** — five warmer shades, from a soft cream-yellow (#FFD77A) through marigold to a burnished bronze (#916B10). **Plus a six-stop grey scale** for typography, surfaces, and neutral UI.")],
    ["text", p("Two colours would have been austere; gradients would have undone the discipline. The five-shade ranges give the brand depth without breaking its rules. The teal range carries every dark surface and every paragraph of body text. The yellow range carries every accent and every moment the brand wants to feel warm. Greys carry everything else.")],
    ["callout", callout("Blue and yellow show the relationship between earth (stability, growth) and sun (energy, hope). Supporting shades reinforce a grounded, authentic presence.", "How the palette encodes the company")],

    // TYPOGRAPHY
    ["divider", divider()],
    ["heading1", h1("Montserrat, on Purpose")],
    ["image", img.contained(
      "Typography page — Font: Montserrat, Characteristics: Modern, clean, geometric sans-serif, with a five-row table mapping Page Titles, Section Headings, Subheadings, Body Text and Captions to weights, sizes (12–40px) and case rules",
      "One typeface, five sizes, five weights"
    )],
    ["text", p("**The brand uses Montserrat — and only Montserrat.** Modern, clean, geometric sans-serif. Open-source, ubiquitous, available on every operating system, every printer driver, every CMS template. **The choice was about reproducibility, not novelty.** A brand that lives in tier-2 cities and gets applied by regional partners can't depend on a font foundry licence or a custom typeface that only one designer can install.")],
    ["text", p("Five sizes, five weights. **Page titles** at 32–40px in Bold, title case. **Section headings** at 24–28px in Semibold, title case. **Subheadings** at 18–22px in Medium, sentence case. **Body** at 14px in Regular, sentence case. **Captions** at 12px in Light, uppercase. The hierarchy is encoded into the size *and* the case — so a non-designer setting up a slide already knows which level a piece of text belongs to.")],

    // MOCKUPS
    ["divider", divider()],
    ["heading1", h1("Built to Be Applied")],
    ["image", img.full(
      "Mockups page row one — DMS Solars logo embroidered on a black polo shirt, printed on a brown cardboard packaging carton, and applied as a large vehicle wrap on the side of a white delivery truck",
      "Apparel and logistics — polo embroidery, packaging, delivery truck"
    )],
    ["text", p("**Apparel and logistics first.** Polo embroidery for the field installation team — the icon-only mark, single-colour stitching, designed to survive every wash for three years. Packaging cartons in the brand's warm yellow ground — the lockup centred and legible across a warehouse. Delivery truck wraps in the dominant cream — high-contrast, large-scale, readable from a city block.")],
    ["image", img.full(
      "Mockups page row two — DMS Solars business card sitting on dark volcanic rock by the ocean, the logo on a phone screen resting on a cream leather cushion next to an orange fabric drape, and the logo printed on a cream canvas tote bag held by a person in a beige sweater",
      "Print and retail — business card, mobile, tote bag"
    )],
    ["text", p("**Then the surfaces customers actually touch.** A business card sized for a salesperson's wallet, the icon and lockup balanced for one-second recognition. The mobile lockup centred on a phone screen — the brand's first impression for anyone landing on the site. A retail tote bag in cream canvas — the brand carrying the customer's purchase home. **The mockups aren't decoration; they're the proof the system holds.**")],

    // BRAND PERSONALITY
    ["divider", divider()],
    ["heading1", h1("Brand Personality")],
    ["text", p("Five traits the system is engineered to express, every time it's used.")],
    ["text", p("**Professionalism** — the structured logo system, the disciplined colour use, the refined typography. Authority without volume. **Empowerment** — bold colour, open layouts, the sense that customers are joining a forward movement. **Innovation** — geometric forms, modern type, a forward-leaning palette. **Reliability** — consistency across every asset, achieved by the don'ts page as much as the dos. **Eco-Friendliness** — earth-inspired hues, sun-and-environment motifs that make sustainability *visible* without printing the word.")],

    // CLOSING
    ["divider", divider()],
    ["quote", quote("From sunrise to sunset, we keep your world running on clean, powerful energy.")],
  ];

  // Sanity check: every image URL slot got consumed
  if (img.used() !== urls.length) {
    throw new Error(
      `Image count mismatch: uploaded ${urls.length}, used ${img.used()}. Update IMAGE_FILES or block list.`,
    );
  }

  return blocks;
}

async function main() {
  console.log(`→ Removing any existing project with slug "${SLUG}"...`);
  const { data: existing } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", SLUG)
    .maybeSingle();
  if (existing) {
    await supabase.from("projects").delete().eq("id", existing.id);
    console.log(`  removed ${existing.id} (cascade deleted blocks)`);
  } else {
    console.log("  none found");
  }

  const urls = await uploadImages();

  console.log(`→ Inserting project...`);
  const { data: inserted, error: pErr } = await supabase
    .from("projects")
    .insert(project)
    .select("id, slug, status")
    .single();
  if (pErr) throw pErr;
  console.log(`  ${inserted.id}  status=${inserted.status}`);

  const blocks = buildBlocks(urls);

  console.log(`→ Inserting ${blocks.length} blocks...`);
  const rows = blocks.map(([block_type, content], i) => ({
    project_id: inserted.id,
    block_type,
    content,
    sort_order: i,
  }));
  const { error: bErr } = await supabase.from("project_blocks").insert(rows);
  if (bErr) throw bErr;
  console.log(`  done`);

  const counts = blocks.reduce((acc, [t]) => ((acc[t] = (acc[t] || 0) + 1), acc), {});
  console.log("\nBlock counts:");
  for (const [t, n] of Object.entries(counts).sort()) console.log(`  ${t.padEnd(12)} ${n}`);
  console.log(`\nDone. Edit at /admin/projects/${inserted.id}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
