import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mockProjectBlocks, mockProjects } from "@/lib/constants/mock-data";
import type { ProjectBlockRecord } from "@/lib/types/blocks";
import type { ProjectRecord, ProjectWithBlocks } from "@/lib/types/projects";

export async function getAllProjects() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return mockProjects;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");

  if (error) {
    return [];
  }

  return (data as ProjectRecord[]) ?? [];
}

export async function getPublishedProjects() {
  const projects = await getAllProjects();
  return projects.filter((project) => project.status === "published");
}

export async function getFeaturedProjects() {
  const projects = await getPublishedProjects();
  return projects.filter((project) => project.is_featured);
}

export async function getProjectById(id: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    const project = mockProjects.find((entry) => entry.id === id);
    if (!project) {
      return null;
    }

    return {
      project,
      blocks: mockProjectBlocks.filter((block) => block.project_id === id),
    } satisfies ProjectWithBlocks;
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    return null;
  }

  const { data: blocks } = await supabase
    .from("project_blocks")
    .select("*")
    .eq("project_id", id)
    .order("sort_order");

  return {
    project: project as ProjectRecord,
    blocks: (blocks as ProjectBlockRecord[]) ?? [],
  } satisfies ProjectWithBlocks;
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    const project = mockProjects.find((entry) => entry.slug === slug);
    if (!project || project.status !== "published") {
      return null;
    }

    return {
      project,
      blocks: mockProjectBlocks.filter((block) => block.project_id === project.id),
    } satisfies ProjectWithBlocks;
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!project) {
    return null;
  }

  const { data: blocks } = await supabase
    .from("project_blocks")
    .select("*")
    .eq("project_id", project.id)
    .order("sort_order");

  return {
    project: project as ProjectRecord,
    blocks: (blocks as ProjectBlockRecord[]) ?? [],
  } satisfies ProjectWithBlocks;
}

export async function getProjectPreviewBySlug(slug: string) {
  const admin = createAdminClient();

  if (!admin) {
    return getProjectBySlug(slug);
  }

  const { data: project } = await admin
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    return null;
  }

  const { data: blocks } = await admin
    .from("project_blocks")
    .select("*")
    .eq("project_id", project.id)
    .order("sort_order");

  return {
    project: project as ProjectRecord,
    blocks: (blocks as ProjectBlockRecord[]) ?? [],
  } satisfies ProjectWithBlocks;
}

export async function getProjectSlugs() {
  const projects = await getPublishedProjects();
  return projects.map((project) => project.slug);
}
