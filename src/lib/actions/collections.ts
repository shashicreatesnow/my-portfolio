"use server";

import { collectionItemSchema } from "@/lib/schemas/collection";
import type { CollectionRecord } from "@/lib/types/database";
import {
  failure,
  getAuthedSupabase,
  revalidatePortfolio,
  success,
} from "@/lib/actions/_shared";

export async function updateCollectionAction(id: string, input: unknown) {
  try {
    const { supabase } = await getAuthedSupabase();
    const values = collectionItemSchema.parse(input);

    const { data, error } = await supabase
      .from("collections")
      .update(values)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success(data as CollectionRecord);
  } catch (error) {
    return failure<CollectionRecord>(error);
  }
}

export async function createCollectionAction(input: {
  image_url: string;
  image_blur_hash?: string | null;
  caption?: string | null;
  tags?: string[];
  width?: number | null;
  height?: number | null;
}) {
  try {
    const { supabase } = await getAuthedSupabase();
    const { data, error } = await supabase
      .from("collections")
      .insert({
        image_url: input.image_url,
        image_blur_hash: input.image_blur_hash || null,
        caption: input.caption || null,
        tags: input.tags || [],
        width: input.width || null,
        height: input.height || null,
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success(data as CollectionRecord);
  } catch (error) {
    return failure<CollectionRecord>(error);
  }
}

export async function deleteCollectionAction(id: string) {
  try {
    const { supabase } = await getAuthedSupabase();
    const { error } = await supabase.from("collections").delete().eq("id", id);
    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function reorderCollectionsAction(items: Array<{ id: string; sort_order: number }>) {
  try {
    const { supabase } = await getAuthedSupabase();

    await Promise.all(
      items.map((item) =>
        supabase
          .from("collections")
          .update({ sort_order: item.sort_order })
          .eq("id", item.id),
      ),
    );

    revalidatePortfolio();
    return success();
  } catch (error) {
    return failure(error);
  }
}
