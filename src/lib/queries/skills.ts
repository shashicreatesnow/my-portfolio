import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mockSkills } from "@/lib/constants/mock-data";
import type { SkillRecord } from "@/lib/types/database";

export async function getAllSkills() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return mockSkills;
  }

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order");

  if (error) {
    return [];
  }

  return (data as SkillRecord[]) ?? [];
}

export async function getPublishedSkills() {
  const skills = await getAllSkills();
  return skills.filter((skill) => skill.is_published);
}

export async function getSkillById(id: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return mockSkills.find((skill) => skill.id === id) ?? null;
  }

  const { data } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  return (data as SkillRecord | null) ?? null;
}
