import type { ProjectBlockRecord } from "@/lib/types/blocks";
import type { ProjectRecord } from "@/lib/types/projects";

export interface CollectionRecord {
  id: string;
  image_url: string;
  image_blur_hash: string | null;
  caption: string | null;
  tags: string[];
  sort_order: number;
  is_published: boolean;
  width: number | null;
  height: number | null;
  created_at: string;
  updated_at: string;
}

export type SkillIconKey = "product" | "ai" | "brand";

export interface SkillRecord {
  id: string;
  title: string;
  description: string | null;
  icon_key: SkillIconKey | string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  logo_url: string | null;
  logo_dark_url: string | null;
  website_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type AboutBlockRecord = Omit<ProjectBlockRecord, "project_id">;

export interface SiteSettingRecord<T = unknown> {
  key: string;
  value: T;
  updated_at?: string;
}

export interface ActionResult<T = void> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface DatabaseTables {
  projects: ProjectRecord;
  project_blocks: ProjectBlockRecord;
  collections: CollectionRecord;
  skills: SkillRecord;
  clients: ClientRecord;
  about_blocks: AboutBlockRecord;
  site_settings: SiteSettingRecord;
}
