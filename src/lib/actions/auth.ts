"use server";

import { redirect } from "next/navigation";

import { authSchema } from "@/lib/schemas/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { failure, success } from "@/lib/actions/_shared";

export async function signInAction(input: unknown) {
  try {
    const supabase = await createServerSupabaseClient();
    const values = authSchema.parse(input);

    if (!supabase) {
      throw new Error("Supabase environment variables are missing.");
    }

    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      throw error;
    }

    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}
