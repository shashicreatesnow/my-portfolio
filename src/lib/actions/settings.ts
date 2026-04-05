"use server";

import {
  aboutSettingsSchema,
  contactSettingsSchema,
  heroSettingsSchema,
  navigationSettingsSchema,
  seoSettingsSchema,
} from "@/lib/schemas/settings";
import {
  failure,
  getAuthedSupabase,
  revalidatePortfolio,
  success,
} from "@/lib/actions/_shared";

async function upsertSetting(key: string, value: unknown) {
  const { supabase } = await getAuthedSupabase();
  const { error } = await supabase.from("site_settings").upsert({ key, value });

  if (error) {
    throw error;
  }

  revalidatePortfolio();
}

export async function saveHeroSettingsAction(input: unknown) {
  try {
    await upsertSetting("hero", heroSettingsSchema.parse(input));
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function saveContactSettingsAction(input: unknown) {
  try {
    await upsertSetting("contact", contactSettingsSchema.parse(input));
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function saveSeoSettingsAction(input: unknown) {
  try {
    await upsertSetting("seo", seoSettingsSchema.parse(input));
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function saveNavigationSettingsAction(input: unknown) {
  try {
    await upsertSetting("navigation", navigationSettingsSchema.parse(input));
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function saveAboutSettingsAction(input: unknown) {
  try {
    await upsertSetting("about", aboutSettingsSchema.parse(input));
    return success();
  } catch (error) {
    return failure(error);
  }
}
