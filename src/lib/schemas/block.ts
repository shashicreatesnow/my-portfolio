import { z } from "zod";

export const textBlockContent = z.object({
  html: z.string().default(""),
});

export const headingBlockContent = z.object({
  text: z.string().default(""),
  level: z.enum(["h1", "h2", "h3"]).default("h2"),
});

export const quoteBlockContent = z.object({
  text: z.string().default(""),
  attribution: z.string().optional(),
});

export const imageBlockContent = z.object({
  url: z.string().url().optional(),
  blur_hash: z.string().optional(),
  alt: z.string().default(""),
  caption: z.string().optional(),
  display: z.enum(["full-width", "contained", "small"]).default("contained"),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const galleryImageSchema = z.object({
  url: z.string().url(),
  blur_hash: z.string().optional(),
  alt: z.string().default(""),
  caption: z.string().optional(),
});

export const galleryBlockContent = z.object({
  images: z.array(galleryImageSchema).default([]),
  layout: z.enum(["grid", "masonry", "carousel"]).default("grid"),
  columns: z.number().min(2).max(4).default(3),
});

export const calloutBlockContent = z.object({
  value: z.string().default(""),
  label: z.string().default(""),
  description: z.string().optional(),
  style: z.enum(["highlight", "subtle", "accent"]).default("highlight"),
});

export const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
});

export const metricRowBlockContent = z.object({
  metrics: z.array(metricSchema).min(2).max(4).default([]),
});

export const beforeAfterSideSchema = z.object({
  url: z.string().url().optional(),
  blur_hash: z.string().optional(),
  alt: z.string().default(""),
  caption: z.string().optional(),
});

export const beforeAfterBlockContent = z.object({
  before: beforeAfterSideSchema.default({ alt: "" }),
  after: beforeAfterSideSchema.default({ alt: "" }),
  caption: z.string().optional(),
  mode: z.enum(["side-by-side", "slider"]).default("side-by-side"),
});

export const annotationSchema = z.object({
  id: z.string(),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  label: z.string(),
  description: z.string().optional(),
});

export const annotatedImageBlockContent = z.object({
  url: z.string().url().optional(),
  blur_hash: z.string().optional(),
  alt: z.string().default(""),
  annotations: z.array(annotationSchema).max(10).default([]),
});

export const videoBlockContent = z.object({
  url: z.string().url().optional(),
  provider: z.enum(["youtube", "vimeo", "loom", "other"]).optional(),
  caption: z.string().optional(),
});

export const listItemSchema = z.object({
  id: z.string(),
  text: z.string().default(""),
});

export const listBlockContent = z.object({
  list_type: z.enum(["bullet", "numbered"]).default("bullet"),
  items: z.array(listItemSchema).default([]),
});

export const toggleBlockContent = z.object({
  title: z.string().default(""),
  content_html: z.string().default(""),
});

export const tableBlockContent = z.object({
  has_header: z.boolean().default(true),
  rows: z.array(z.array(z.string())).default([]),
});

export const embedBlockContent = z.object({
  url: z.string().default(""),
  platform: z.enum(["twitter", "figma", "codepen", "generic"]).default("generic"),
  caption: z.string().optional(),
  aspect_ratio: z.enum(["video", "square", "tall"]).default("video"),
});

export const fileBlockContent = z.object({
  file_name: z.string().default(""),
  description: z.string().optional(),
  file_url: z.string().default(""),
  file_size: z.string().optional(),
});

export const columnBlockSchema = z.object({
  id: z.string(),
  block_type: z.enum(["text", "heading2", "heading3", "image", "callout", "list"]),
  content: z.record(z.string(), z.any()),
});

export const columnsBlockContent = z.object({
  column_count: z.enum(["2", "3"]).default("2"),
  columns: z
    .array(
      z.object({
        blocks: z.array(columnBlockSchema).default([]),
      }),
    )
    .default([]),
});

export const dividerBlockContent = z.object({
  style: z.enum(["thin", "thick", "dotted", "decorative"]).default("thin"),
});

export const spacerBlockContent = z.object({
  size: z.enum(["small", "medium", "large", "xlarge"]).default("medium"),
});

export const codeBlockContent = z.object({
  code: z.string().default(""),
  language: z.string().default("text"),
  caption: z.string().optional(),
});

export const blockContentSchemas = {
  text: textBlockContent,
  heading1: headingBlockContent,
  heading2: headingBlockContent,
  heading3: headingBlockContent,
  quote: quoteBlockContent,
  list: listBlockContent,
  toggle: toggleBlockContent,
  image: imageBlockContent,
  gallery: galleryBlockContent,
  before_after: beforeAfterBlockContent,
  annotated_image: annotatedImageBlockContent,
  video: videoBlockContent,
  embed: embedBlockContent,
  columns_2: columnsBlockContent,
  columns_3: columnsBlockContent,
  divider: dividerBlockContent,
  spacer: spacerBlockContent,
  callout: calloutBlockContent,
  metric_row: metricRowBlockContent,
  table: tableBlockContent,
  code: codeBlockContent,
  file: fileBlockContent,
};
