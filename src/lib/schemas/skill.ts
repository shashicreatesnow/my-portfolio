import { z } from "zod";

export const skillSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().max(400).optional().or(z.literal("")),
  icon_key: z.string().max(40).optional().or(z.literal("")),
  sort_order: z.number().int().min(0).default(0),
  is_published: z.boolean().default(true),
});

export type SkillValues = z.input<typeof skillSchema>;
