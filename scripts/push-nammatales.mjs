// One-shot: insert Nammatales case study (status='draft') with image placeholders.
// Re-run safe: deletes existing project with same slug before insert.

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

// markdown bold/italic -> HTML, wrapped in <p>
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
const imgFull = (alt, caption) => ({ url: "", alt, caption: caption || "", display: "full-width" });
const imgContained = (alt, caption) => ({ url: "", alt, caption: caption || "", display: "default" });
const galleryGrid = (columns, ...images) => ({
  layout: "grid",
  columns,
  images: images.map(([alt, caption]) => ({ url: "", alt, caption: caption || "" })),
});
const metricRow = (...m) => ({ metrics: m });

const SLUG = "nammatales-brand-identity";

const project = {
  title: "Nammatales — Brand Identity for a Bengaluru Food & Travel Social-Media IP",
  slug: SLUG,
  description:
    "A full brand identity for a Bengaluru-based food and travel vlog channel. Three mood directions, two logo concepts — landing on a Kannada ನ monogram that fuses Latin n, Latin t, and Kannada na into one warm, drop-shadowed glyph. Hand-painted, streetside, unmistakably Bengaluru.",
  status: "draft",
  category_tags: ["Brand Design", "Identity Systems", "Creator Economy", "Regional Identity"],
  client_name: "Nammatales (Bengaluru-based food and travel vlog social-media IP)",
  project_role: "Brand strategy, identity system, logo design, colour & type systems, social applications",
  project_timeline: "April 2026",
  project_industry: "Creator Economy / Regional Media",
  is_featured: false,
};

const blocks = [
  // HERO
  ["image", imgFull(
    "Final Nammatales brand mark — a stylised Kannada ನ letter in red orange with a black drop shadow, set on a cream yellow background",
    "The final mark"
  )],

  // OPENING
  ["text", p("**The brief named the city before it named the brand.** *Nammatales.* In Kannada, *namma* means *our* — the kind of *our* that belongs to a neighbourhood, a street, a circle of friends who know which dosa cart opens at 6:30am. *Tales* did the rest of the work. A social-media IP for food and travel vlogs of Bengaluru, made by people who actually live in the lanes they're filming. The brand's only real job was to look like it belonged there.")],
  ["metric_row", metricRow(
    { value: "3", label: "mood directions" },
    { value: "2", label: "logo concepts" },
    { value: "22", label: "colour pairings tested" },
  )],

  // WHAT EVERY INDIAN FOOD CHANNEL LOOKS LIKE
  ["divider", divider()],
  ["heading1", h1("What Every Indian Food Channel Looks Like")],
  ["text", p("Before sketching, I spent four days inside the category — Indian food and travel creators, regional vloggers, city-specific channels. The pattern showed up fast. **Every brand looked like a Zomato spinoff.** Clean sans-serifs. English-first names. Gradient backgrounds in saturated reds and yellows. A camera-and-fork icon, or a stylised plate. The visual grammar of a *delivery app* pretending to be a *creator.*")],
  ["text", p("Bengaluru doesn't look like that. Bengaluru looks like hand-painted Iyengar bakery boards, Kannada signage three storeys tall, theatre hoardings in primary colours, awnings stained by twenty monsoons. The actual visual texture of the city was nowhere in the category's reference deck. **If Nammatales looked like every other food channel, it would lose to every other food channel** — because the bigger ones already had the same costume and more reach.")],
  ["callout", callout("If our brand looks like a delivery app, we've already lost to one.", "The principle the rest of the project ran on")],

  // THREE DIRECTIONS, ONE STREET
  ["divider", divider()],
  ["heading1", h1("Three Directions, One Street")],
  ["text", p("The first deliverable was a Brand Direction Document with three full mood worlds — same brief, three honest answers. Each had its own typography, palette, image language, and reference shelf.")],
  ["image", imgContained(
    "Three brand direction title pages stacked — Funky/Foody/Casual/Warm, Authentic/Trusted/Elegant/Foody, and Premium/Elegant/Trusted/Foody",
    "Three directions, each with its own mood, palette, and reference shelf"
  )],
  ["text", p("**Direction #1 — Funky / Foody / Casual / Warm.** Streetside. Cream yellow, chilli red, dark roasted brown. References: hand-painted *dukaan* murals, Silver Queen chocolate wrappers, Grub Man-style mascots, lemon-biscuit-sticky-mango type stacks. The Bengaluru of footpaths and tiffin shops. The brand of someone you'd actually run into at a vlog set.")],
  ["text", p("**Direction #2 — Authentic / Trusted / Elegant / Foody.** Editorial. Deep forest green and cream, organic leaf patterns, Dieter Rams-grade typography, Slice & Scoop sketchbook stamps. The Bengaluru of leafy 5th-Block cafes — speciality coffee, plant walls, Veggie Haven storefronts. Beautiful. Also exactly what every new café in Indiranagar already looked like.")],
  ["text", p("**Direction #3 — Premium / Elegant / Trusted / Foody.** Maroon and amber. Dragon motifs, ornate monograms, candlelit interiors, Grotesk-family display type. The Bengaluru of high-end restaurants reaching for the Conrad-and-Leela aesthetic. Genuinely premium. Genuinely *somebody else's brand.* Nammatales wasn't a Michelin guide; it was a *vlog channel.*")],
  ["image", imgContained(
    "Direction #1 mood board — Funky/Foody/Casual/Warm — featuring warm cream and chilli red palette, hand-painted shop murals, Grub Man mascot logo, and lemon-biscuit-sticky-mango display type",
    "Direction #1 — the chosen direction"
  )],
  ["text", p("**The client picked Direction #1 the same week.** The reason held up: Directions #2 and #3 were the costumes the *restaurants* wore. Nammatales wasn't a restaurant — it was the camera turning *toward* the restaurant. The brand had to live in the same colour temperature as the food being filmed, not the dining room around it. **The footpath, not the table.**")],
  ["image", imgContained(
    "Direction #2 and Direction #3 mood boards side by side — forest green editorial palette on the left, maroon and amber premium palette on the right",
    "The rejected directions — the costumes the restaurants wore"
  )],
  ["callout", callout("Pick the direction that points the camera, not the one that runs the restaurant.", "The line that ended the strategy phase")],

  // TWO LOGOS, ONE FORK IN THE ROAD
  ["divider", divider()],
  ["heading1", h1("Two Logos, One Fork in the Road")],
  ["text", p("Logo round. Two concepts, both built end-to-end — full lockup, colour test, Instagram mockup. They were honestly different *bets.*")],
  ["image", imgContained(
    "Logo Concept A — the Kannada ನ monogram with anatomy callouts pointing to the Latin 'n' in the lower curve, the Latin 't' in the upper crossbar, and the Kannada ನ that holds them both",
    "Concept A — the trilingual ನ monogram"
  )],
  ["text", p("**Concept A — The ನ Monogram.** A single Kannada character — *na* — drawn as a stacked, blocky letterform with a 3D drop shadow. Inside the same mark, three letters live at once: the **Latin 'n'** in the lower curve, the **Latin 't'** in the upper crossbar, and the **Kannada ನ** that holds them both. *Nammatales,* compressed to one glyph. A non-Kannada reader sees it as a *shape.* A Kannada reader reads it as a *word.* The mark contains both audiences without compromising either.")],
  ["image", imgContained(
    "Logo Concept B — a bold lowercase 'nt' Latin lettermark in italic, with a 3D black drop shadow, set in yellow on a red background",
    "Concept B — the 'nt' Latin italic"
  )],
  ["text", p("**Concept B — The 'nt' Italic.** A bold, forward-leaning Latin lockup — lowercase *nt* with the same retro drop shadow, the same warm palette. Easier to read in one second on a feed. Easier to license, easier to embroider on a hat, easier for an English-first audience to type into a search bar. Genuinely the safer mark. Genuinely well made.")],
  ["image", imgContained(
    "Side-by-side comparison of the ನ monogram and the 'nt' Latin italic at the same scale, both shown in warm yellow with black drop shadow on red",
    "Concept A vs Concept B at the same scale"
  )],
  ["text", p("Looking at them side by side, the argument was the project itself. **Concept B was a logo that *worked everywhere.* Concept A was a logo that *belonged somewhere.*** The 'nt' could have been a Brooklyn coffee bar, a Berlin sneaker drop, a Mumbai food channel. The ನ could only be from Bengaluru. The 'nt' was readable. The ನ was *true.*")],
  ["text", p("**The client chose Concept A.** The reason matched the brief one-to-one: Nammatales doesn't need to win the algorithm in Texas; it needs to be the channel that someone in Malleshwaram sees and thinks *that's mine.* Picking the Kannada-fused mark was picking the audience the brand was actually for, before chasing the audience that was easier to reach. **Readability isn't a virtue when it costs you identity.**")],
  ["callout", callout("A logo that belongs somewhere beats a logo that works everywhere.", "What the choice between A and B actually meant")],

  // THE MARK
  ["image", imgFull(
    "The final Nammatales mark shown large — the Kannada ನ in red orange with black drop shadow on a deep red background",
    "The final mark, hero treatment"
  )],
  ["callout", callout("n. t. ನ. Three letters. One glyph. One city.", "What the final mark stands for")],
  ["text", p("The ನ tilts forward — the entire mark sits on a slight axis, leaning into the drop shadow. That tilt is a quotation. Hand-painted shop signs across Bengaluru — Iyengar bakeries, Janatha Bazaar boards, the lettering on old single-screen theatre hoardings — were almost never set straight. They were chunky, three-dimensional, slightly tilted, slightly imperfect, painted by humans who didn't have a kerning panel. The shadow on the Nammatales mark is a direct lift from that lineage. **Not a Photoshop bevel. A reference.**")],
  ["text", p("And it's drawn, not type-set. Off the shelf, the Kannada *na* is a thinner, more delicate character. Drawn for this mark, it's blocky, weighted, almost slab-serif in feel — built to survive at small sizes and to read as a *logo* before it reads as a *letter.* The closer you look, the more the three readings unlock. From across the room, it's just a strong, warm shape.")],

  // COLOUR
  ["divider", divider()],
  ["heading1", h1("Colour, the Long Way Around")],
  ["text", p("The mark's hardest design problem wasn't the form — it was the colour. The drop shadow needed two colours minimum, sometimes three counting the background. That meant every palette had to work as a *trio,* not a duo. I tested **twenty-two pairings** across the same logo before the final combination earned its place.")],
  ["gallery", galleryGrid(3,
    ["The ನ mark in orange + black on cream yellow"],
    ["The ನ mark in red + cream yellow on cobalt blue"],
    ["The ನ mark in cobalt blue + cream yellow on red"],
    ["The ನ mark in red + dark navy on cream"],
    ["The ನ mark in red + cream on dark navy"],
    ["The ನ mark in dark navy + cream on red"],
    ["The ನ mark in cream + blue on sage green"],
    ["The ನ mark in cream + blue on cream yellow"],
    ["The ನ mark in cream + blue on cream"],
    ["The ನ mark in mustard + teal on tan"],
    ["The ನ mark in orange + dark orange on tan"],
    ["The ನ mark in pink + red on peach"],
    ["The ನ mark in pink + dark green on peach"],
    ["The ನ mark in cream + dark green on pink"],
    ["The ನ mark in mustard + brown on peach"],
    ["The ನ mark in orange + cream on brown"],
    ["The ನ mark in cream + brown on orange"],
    ["The ನ mark in cream + dark purple on lavender"],
    ["The ನ mark in cream yellow + dark purple on lavender"],
    ["The ನ mark in lavender + black on purple"],
    ["The ನ mark in coral + black on white"],
    ["The ನ mark in cream yellow + blue on grey"],
  )],
  ["text", p("Most pairings failed for the same reason: they made the brand look like *a brand,* not like *a place.* Cobalt blue + cream felt European. Dark navy + black felt corporate. Olive green + brown felt like a brewery. Pastel pink + crimson felt like a bakery. Each was a competent palette. None of them sounded like Bengaluru.")],
  ["image", imgContained(
    "Final palette — cream yellow, red orange, and black — shown as colour swatches alongside the final ನ mark",
    "The final three-colour palette"
  )],
  ["text", p("The pairing that won was the most obvious one in the deck — and the one I tested twice to make sure it wasn't lazy. **Cream Yellow** as the surface. **Red Orange** as the body of the mark. **Black** as the drop shadow. The exact three colours of a Bengaluru tiffin spread — turmeric, chilli, charred kadai. The exact three colours of an Iyengar bakery sign. The exact three colours of a 1970s theatre hoarding. **The palette was already in the city; I just had to stop looking for a more original one.**")],
  ["callout", callout("Cream is the wall. Red is the sign. Black is the shadow the sun puts behind it.", "How the palette encodes the city")],

  // BUILT FOR THE FEED
  ["divider", divider()],
  ["heading1", h1("Built for the Feed")],
  ["image", imgFull(
    "Instagram applications for Nammatales — profile screen with the ನ mark as avatar, story ring with the brand colours, and a feed grid showing the mark across multiple posts",
    "Instagram applications — profile, story ring, and feed grid"
  )],
  ["text", p("Nammatales lives on social platforms first — Instagram before website, Reels before YouTube long-form, story rings before printed merch. The brand had to launch with every social touchpoint already pressure-tested. Profile photo at 110 pixels. Story rings at 64 pixels. Feed thumbnail at 320. The full lockup with shadow on a Reel cover at 9:16.")],
  ["image", imgContained(
    "The ನ mark shown at 110 pixel profile-photo size next to a 320 pixel feed-thumbnail size, demonstrating the small-size legibility test",
    "The 110-pixel test — where most monogram brands quietly fail"
  )],
  ["text", p("The 110-pixel test was where most monogram brands quietly fail. The drop shadow tends to fuse into the letter at small size, turning the whole mark into a blob. The fix wasn't to drop the shadow — the shadow *is* the brand. The fix was to draw two versions of the mark: a **standard** version with the full shadow for sizes above 64px, and a **compact** version with a tighter shadow offset for everything below. Same brand, two builds. **The system is the only reason the mark survives the platforms it actually lives on.**")],

  // CLOSING
  ["divider", divider()],
  ["quote", quote("A food channel for a city should look like the city, not like the food. The food shows up in the videos. The brand has to do the other job — saying we live here before a single frame plays.")],
];

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

  console.log(`→ Inserting project...`);
  const { data: inserted, error: pErr } = await supabase
    .from("projects")
    .insert(project)
    .select("id, slug, status")
    .single();
  if (pErr) throw pErr;
  console.log(`  ${inserted.id}  status=${inserted.status}`);

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
