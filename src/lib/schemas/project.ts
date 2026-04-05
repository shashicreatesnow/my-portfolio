import { z } from "zod";

export const projectMetadataSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  description: z.string().max(300).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  is_featured: z.boolean().default(false),
  category_tags: z.array(z.string()).default([]),
  client_name: z.string().max(100).optional().or(z.literal("")),
  project_role: z.string().max(100).optional().or(z.literal("")),
  project_timeline: z.string().max(100).optional().or(z.literal("")),
  project_industry: z.string().max(100).optional().or(z.literal("")),
  meta_title: z.string().max(200).optional().or(z.literal("")),
  meta_description: z.string().max(300).optional().or(z.literal("")),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  cover_image_blur_hash: z.string().optional().or(z.literal("")),
  og_image_url: z.string().url().optional().or(z.literal("")),
});

export type ProjectMetadataValues = z.input<typeof projectMetadataSchema>;
