import type { ProjectBlockRecord } from "@/lib/types/blocks";

export interface ProjectRecord {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  cover_image_blur_hash: string | null;
  status: "draft" | "published";
  is_featured: boolean;
  sort_order: number;
  category_tags: string[];
  client_name: string | null;
  project_role: string | null;
  project_timeline: string | null;
  project_industry: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectWithBlocks {
  project: ProjectRecord;
  blocks: ProjectBlockRecord[];
}
