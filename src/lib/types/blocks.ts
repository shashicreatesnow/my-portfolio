import type { LucideIcon } from "lucide-react";

export type BlockType =
  | "text"
  | "heading1"
  | "heading2"
  | "heading3"
  | "quote"
  | "list"
  | "toggle"
  | "image"
  | "gallery"
  | "before_after"
  | "annotated_image"
  | "video"
  | "embed"
  | "columns_2"
  | "columns_3"
  | "divider"
  | "spacer"
  | "callout"
  | "metric_row"
  | "table"
  | "code"
  | "file";

export type BlockCategory = "Text" | "Media" | "Layout" | "Data";

export interface BlockConfig {
  label: string;
  category: BlockCategory;
  icon: LucideIcon;
}

export interface ListItem {
  id: string;
  text: string;
}

export interface AnnotationPoint {
  id: string;
  x: number;
  y: number;
  label: string;
  description?: string;
}

export interface GalleryImage {
  url: string;
  blur_hash?: string;
  alt: string;
  caption?: string;
}

export interface ColumnNestedBlock {
  id: string;
  block_type: "text" | "heading2" | "heading3" | "image" | "callout" | "list";
  content: Record<string, unknown>;
}

export interface ProjectBlockRecord {
  id: string;
  project_id?: string;
  sort_order: number;
  block_type: BlockType;
  content: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}
