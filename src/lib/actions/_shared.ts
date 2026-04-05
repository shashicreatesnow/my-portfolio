import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/lib/types/database";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getAuthedSupabase() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase environment variables are missing.");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return { supabase, user };
}

export function success<T>(data?: T): ActionResult<T> {
  return { success: true, data };
}

export function failure<T = void>(error: unknown): ActionResult<T> {
  return {
    success: false,
    error: error instanceof Error ? error.message : "Something went wrong.",
  };
}

export function revalidatePortfolio(projectSlug?: string) {
  revalidatePath("/");
  revalidatePath("/works");
  revalidatePath("/lab");
  revalidatePath("/about");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/collections");
  revalidatePath("/admin/about");
  revalidatePath("/admin/settings");
  if (projectSlug) {
    revalidatePath(`/works/${projectSlug}`);
  }
}
