// Strip <strong>, <em>, <code> tags from non-HTML content fields in
// blocks where the renderer treats the field as plain text. Only the
// `text` block_type uses content.html which IS HTML — leave it alone.

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

const SLUGS = ["vr-green-erp", "master-app-thumbnails"];

// Strip simple inline tags (preserve inner text)
const strip = (s) =>
  typeof s === "string"
    ? s.replace(/<\/?(strong|em|code|b|i|u)>/gi, "")
    : s;

// Walk a JSON content object and strip HTML from every string EXCEPT the
// 'html' field (which renders as HTML for `text` blocks).
function cleanContent(blockType, content) {
  if (blockType === "text") return content; // html field renders, leave alone
  const out = JSON.parse(JSON.stringify(content));

  // Common scalar fields
  for (const k of ["text", "value", "label", "description", "caption", "alt", "attribution"]) {
    if (typeof out[k] === "string") out[k] = strip(out[k]);
  }

  // List items
  if (Array.isArray(out.items)) {
    out.items = out.items.map((it) => ({ ...it, text: strip(it.text) }));
  }

  // Gallery images
  if (Array.isArray(out.images)) {
    out.images = out.images.map((im) => ({
      ...im,
      alt: strip(im.alt),
      caption: strip(im.caption),
    }));
  }

  // Metric row metrics
  if (Array.isArray(out.metrics)) {
    out.metrics = out.metrics.map((m) => ({
      ...m,
      label: strip(m.label),
      value: strip(m.value),
      prefix: strip(m.prefix),
      suffix: strip(m.suffix),
    }));
  }

  return out;
}

let totalChanged = 0;

for (const slug of SLUGS) {
  const { data: project, error: pErr } = await supabase
    .from("projects")
    .select("id,title")
    .eq("slug", slug)
    .single();
  if (pErr || !project) {
    console.log(`✗ Project not found: ${slug}`);
    continue;
  }
  console.log(`\n=== ${project.title} (${slug}) ===`);

  const { data: blocks, error: bErr } = await supabase
    .from("project_blocks")
    .select("id,block_type,content,sort_order")
    .eq("project_id", project.id)
    .order("sort_order");
  if (bErr) throw bErr;

  let changed = 0;
  for (const b of blocks) {
    const cleaned = cleanContent(b.block_type, b.content);
    const before = JSON.stringify(b.content);
    const after = JSON.stringify(cleaned);
    if (before !== after) {
      const { error } = await supabase
        .from("project_blocks")
        .update({ content: cleaned })
        .eq("id", b.id);
      if (error) throw error;
      changed++;
      console.log(`  ✓ #${b.sort_order} (${b.block_type}) cleaned`);
    }
  }
  console.log(`Total cleaned: ${changed} blocks`);
  totalChanged += changed;
}

console.log(`\n✓ Done. ${totalChanged} blocks updated across ${SLUGS.length} projects.`);
