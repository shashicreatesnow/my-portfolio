import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mockClients } from "@/lib/constants/mock-data";
import type { ClientRecord } from "@/lib/types/database";

export async function getAllClients() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return mockClients;
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("sort_order");

  if (error) {
    return [];
  }

  return (data as ClientRecord[]) ?? [];
}

export async function getPublishedClients() {
  const clients = await getAllClients();
  return clients.filter((client) => client.is_published);
}

export async function getClientById(id: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return mockClients.find((client) => client.id === id) ?? null;
  }

  const { data } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  return (data as ClientRecord | null) ?? null;
}
