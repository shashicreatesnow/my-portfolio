import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1).max(120),
  logo_url: z.string().url().optional().or(z.literal("")),
  logo_dark_url: z.string().url().optional().or(z.literal("")),
  website_url: z.string().url().optional().or(z.literal("")),
  sort_order: z.number().int().min(0).default(0),
  is_published: z.boolean().default(true),
});

export type ClientValues = z.input<typeof clientSchema>;
