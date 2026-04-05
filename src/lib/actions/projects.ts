"use server";

import { redirect } from "next/navigation";

import { getAllProjects } from "@/lib/queries/projects";
import { projectMetadataSchema } from "@/lib/schemas/project";
import { makeUniqueSlug, slugify } from "@/lib/utils/slug";
import type { ProjectRecord } from "@/lib/types/projects";
import {
  failure,
  getAuthedSupabase,
  revalidatePortfolio,
  success,
} from "@/lib/actions/_shared";

export async function createProjectAction() {
  try {
    const { supabase } = await getAuthedSupabase();
    const projects = await getAllProjects();
    const baseSlug = makeUniqueSlug(
      slugify("Untitled Project"),
      projects.map((project) => project.slug),
    );

    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: "Untitled Project",
        slug: baseSlug,
        status: "draft",
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    revalidatePortfolio(baseSlug);
    return success(data as ProjectRecord);
  } catch (error) {
    return failure<ProjectRecord>(error);
  }
}

export async function createProjectAndRedirectAction() {
  const result = await createProjectAction();
  if (!result.success || !result.data) {
    redirect("/admin/projects");
  }

  redirect(`/admin/projects/${result.data.id}`);
}

export async function updateProjectAction(id: string, input: unknown) {
  try {
    const { supabase } = await getAuthedSupabase();
    const values = projectMetadataSchema.parse(input);
    const allProjects = await getAllProjects();

    const slug = makeUniqueSlug(
      slugify(values.slug),
      allProjects
        .filter((project) => project.id !== id)
        .map((project) => project.slug),
    );

    const payload = {
      ...values,
      slug,
      description: values.description || null,
      client_name: values.client_name || null,
      project_role: values.project_role || null,
      project_timeline: values.project_timeline || null,
      project_industry: values.project_industry || null,
      meta_title: values.meta_title || null,
      meta_description: values.meta_description || null,
      cover_image_url: values.cover_image_url || null,
      cover_image_blur_hash: values.cover_image_blur_hash || null,
      og_image_url: values.og_image_url || null,
    };

    const { data, error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    revalidatePortfolio(slug);
    return success(data as ProjectRecord);
  } catch (error) {
    return failure<ProjectRecord>(error);
  }
}

export async function deleteProjectAction(id: string, slug?: string) {
  try {
    const { supabase } = await getAuthedSupabase();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePortfolio(slug);
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function reorderProjectsAction(items: Array<{ id: string; sort_order: number }>) {
  try {
    const { supabase } = await getAuthedSupabase();

    await Promise.all(
      items.map((item) =>
        supabase
          .from("projects")
          .update({ sort_order: item.sort_order })
          .eq("id", item.id),
      ),
    );

    revalidatePortfolio();
    return success();
  } catch (error) {
    return failure(error);
  }
}

export async function duplicateProjectAction(id: string) {
  try {
    const { supabase } = await getAuthedSupabase();
    const original = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (original.error || !original.data) {
      throw original.error || new Error("Project not found.");
    }

    const allProjects = await getAllProjects();
    const slug = makeUniqueSlug(
      slugify(`${original.data.title} copy`),
      allProjects.map((project) => project.slug),
    );

    const { data, error } = await supabase
      .from("projects")
      .insert({
        ...original.data,
        id: undefined,
        title: `${original.data.title} Copy`,
        slug,
        status: "draft",
      })
      .select("*")
      .single();

    if (error || !data) {
      throw error || new Error("Could not duplicate project.");
    }

    const blocks = await supabase
      .from("project_blocks")
      .select("*")
      .eq("project_id", id)
      .order("sort_order");

    if (blocks.data?.length) {
      await supabase.from("project_blocks").insert(
        blocks.data.map((block) => ({
          project_id: data.id,
          block_type: block.block_type,
          content: block.content,
          sort_order: block.sort_order,
        })),
      );
    }

    revalidatePortfolio(slug);
    return success(data as ProjectRecord);
  } catch (error) {
    return failure<ProjectRecord>(error);
  }
}
