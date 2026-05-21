"use server";

import { clientSchema } from "@/lib/schemas/client";
import type { ClientRecord } from "@/lib/types/database";
import {
  failure,
  getAuthedSupabase,
  revalidatePortfolio,
  success,
} from "@/lib/actions/_shared";

function normalize(values: ReturnType<typeof clientSchema.parse>) {
  return {
    name: values.name,
    logo_url: values.logo_url || null,
    logo_dark_url: values.logo_dark_url || null,
    website_url: values.website_url || null,
    sort_order: values.sort_order,
    is_published: values.is_published,
  };
}

export async function createClientAction(input: unknown) {
  try {
    const { supabase } = await getAuthedSupabase();
    const values = clientSchema.parse(input);

    const { data, error } = await supabase
      .from("clients")
      .insert(normalize(values))
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success(data as ClientRecord);
  } catch (error) {
    return failure<ClientRecord>(error);
  }
}

export async function updateClientAction(id: string, input: unknown) {
  try {
    const { supabase } = await getAuthedSupabase();
    const values = clientSchema.parse(input);

    const { data, error } = await supabase
      .from("clients")
      .update(normalize(values))
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success(data as ClientRecord);
  } catch (error) {
    return failure<ClientRecord>(error);
  }
}

export async function deleteClientAction(id: string) {
  try {
    const { supabase } = await getAuthedSupabase();
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) {
      throw error;
    }

    revalidatePortfolio();
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function reorderClientsAction(items: Array<{ id: string; sort_order: number }>) {
  try {
    const { supabase } = await getAuthedSupabase();

    await Promise.all(
      items.map((item) =>
        supabase.from("clients").update({ sort_order: item.sort_order }).eq("id", item.id),
      ),
    );

    revalidatePortfolio();
    return success();
  } catch (error) {
    return failure(error);
  }
}
