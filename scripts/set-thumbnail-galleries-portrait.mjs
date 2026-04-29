// One-shot: set the Master App Thumbnails range + selected-work galleries
// to portrait aspect ratio so 600×800 thumbnails fit cleanly.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const envText = readFileSync(
  "/Users/eloelo/Documents/Antigravity/My Portfolio/.env.local",
  "utf8",
);
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

const { data: project } = await supabase
  .from("projects")
  .select("id")
  .eq("slug", "master-app-thumbnails")
  .single();

const { data: galleries } = await supabase
  .from("project_blocks")
  .select("id,sort_order,content")
  .eq("project_id", project.id)
  .eq("block_type", "gallery")
  .order("sort_order");

console.log(`Found ${galleries.length} gallery blocks. Setting portrait aspect on the 6-image and 9-image grids.`);

let updated = 0;
for (const g of galleries) {
  const imgCount = (g.content.images || []).length;
  // Range grid (6 images) and Selected work (9 images) — the two thumbnail galleries
  if (imgCount === 6 || imgCount === 9) {
    const newContent = { ...g.content, aspect_ratio: "portrait" };
    const { error } = await supabase
      .from("project_blocks")
      .update({ content: newContent })
      .eq("id", g.id);
    if (error) throw error;
    // Read back to verify
    const { data: check } = await supabase
      .from("project_blocks")
      .select("content")
      .eq("id", g.id)
      .single();
    if (check.content.aspect_ratio === "portrait") {
      console.log(`  ✓ #${g.sort_order} (${imgCount} images) → portrait`);
      updated++;
    } else {
      console.log(`  ✗ #${g.sort_order} write didn't persist`);
    }
  } else {
    console.log(`  - #${g.sort_order} (${imgCount} images) — left as-is (before/after pair)`);
  }
}

console.log(`\n✓ Updated ${updated} galleries to portrait aspect.`);
