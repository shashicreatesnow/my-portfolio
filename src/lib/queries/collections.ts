import { mockCollections } from "@/lib/constants/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CollectionRecord } from "@/lib/types/database";

export async function getCollections(includeDrafts = false) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return mockCollections;
  }

  let query = supabase.from("collections").select("*").order("sort_order");
  if (!includeDrafts) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return (data as CollectionRecord[]) ?? [];
}
