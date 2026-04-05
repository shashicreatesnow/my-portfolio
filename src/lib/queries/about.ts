import { defaultSiteSettings } from "@/lib/constants/site";
import { mockAboutBlocks } from "@/lib/constants/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AboutBlockRecord } from "@/lib/types/database";

export async function getAboutSettings() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return defaultSiteSettings.about;
  }

  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "about")
    .single();

  return (data?.value as typeof defaultSiteSettings.about) || defaultSiteSettings.about;
}

export async function getAboutBlocks() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return mockAboutBlocks;
  }

  const { data, error } = await supabase
    .from("about_blocks")
    .select("*")
    .order("sort_order");

  if (error) {
    return [];
  }

  return (data as AboutBlockRecord[]) ?? [];
}
