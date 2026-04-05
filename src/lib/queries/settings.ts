import { defaultSiteSettings } from "@/lib/constants/site";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getSettings() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return defaultSiteSettings;
  }

  const { data } = await supabase.from("site_settings").select("*");

  const settings = Object.fromEntries(
    (data ?? []).map((entry) => [entry.key, entry.value]),
  );

  return {
    hero: settings.hero ?? defaultSiteSettings.hero,
    about: settings.about ?? defaultSiteSettings.about,
    contact: settings.contact ?? defaultSiteSettings.contact,
    seo: settings.seo ?? defaultSiteSettings.seo,
    navigation: settings.navigation ?? defaultSiteSettings.navigation,
  };
}

export async function getSetting<T>(key: keyof typeof defaultSiteSettings) {
  const settings = await getSettings();
  return settings[key] as T;
}
