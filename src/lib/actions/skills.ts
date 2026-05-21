"use server";

import { skillSchema } from "@/lib/schemas/skill";
import type { SkillRecord } from "@/lib/types/database";
import {
  failure,
  getAuthedSupabase,
  revalidatePortfolio,
  success,
} from "@/lib/actions/_shared";

function normalize(values: ReturnType<typeof skillSchema.parse>) {
  return {
    title: values.title,
    description: values.description || null,
    icon_key: values.icon_key || null,
    sort_order: values.sort_order,
    is_published: values.is_published,
  };
}

export async function createSkillAction(input: unknown) {
  try {
    const { supabase } = await getAuthedSupabase();
    const values = skillSchema.parse(input);

    const { data, error } = await supabase
      .from("skills")
      .insert(normalize(values))
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success(data as SkillRecord);
  } catch (error) {
    return failure<SkillRecord>(error);
  }
}

export async function updateSkillAction(id: string, input: unknown) {
  try {
    const { supabase } = await getAuthedSupabase();
    const values = skillSchema.parse(input);

    const { data, error } = await supabase
      .from("skills")
      .update(normalize(values))
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success(data as SkillRecord);
  } catch (error) {
    return failure<SkillRecord>(error);
  }
}

export async function deleteSkillAction(id: string) {
  try {
    const { supabase } = await getAuthedSupabase();
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function reorderSkillsAction(items: Array<{ id: string; sort_order: number }>) {
  try {
    const { supabase } = await getAuthedSupabase();

    await Promise.all(
      items.map((item) =>
        supabase.from("skills").update({ sort_order: item.sort_order }).eq("id", item.id),
      ),
    );

    revalidatePortfolio();
    return success();
  } catch (error) {
    return failure(error);
  }
}
