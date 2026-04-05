"use server";

import type { ProjectBlockRecord } from "@/lib/types/blocks";
import {
  failure,
  getAuthedSupabase,
  revalidatePortfolio,
  success,
} from "@/lib/actions/_shared";

export async function saveProjectBlocksAction(
  projectId: string,
  projectSlug: string,
  blocks: ProjectBlockRecord[],
) {
  try {
    const { supabase } = await getAuthedSupabase();

    const { error: deleteError } = await supabase
      .from("project_blocks")
      .delete()
      .eq("project_id", projectId);

    if (deleteError) {
      throw deleteError;
    }

    if (blocks.length) {
      const { error } = await supabase.from("project_blocks").insert(
        blocks.map((block, index) => ({
          project_id: projectId,
          block_type: block.block_type,
          content: block.content,
          sort_order: index,
        })),
      );

      if (error) {
        throw error;
      }
    }

    revalidatePortfolio(projectSlug);
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function saveAboutBlocksAction(blocks: ProjectBlockRecord[]) {
  try {
    const { supabase } = await getAuthedSupabase();

    const { error: deleteError } = await supabase.from("about_blocks").delete().neq("id", "");
    if (deleteError) {
      throw deleteError;
    }

    if (blocks.length) {
      const { error } = await supabase.from("about_blocks").insert(
        blocks.map((block, index) => ({
          block_type: block.block_type,
          content: block.content,
          sort_order: index,
        })),
      );

      if (error) {
        throw error;
      }
    }

    revalidatePortfolio();
    return success();
  } catch (error) {
    return failure(error);
  }
}
