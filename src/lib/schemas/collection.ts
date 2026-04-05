import { z } from "zod";

export const collectionItemSchema = z.object({
  caption: z.string().max(240).optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  is_published: z.boolean().default(true),
});

export type CollectionItemValues = z.input<typeof collectionItemSchema>;
