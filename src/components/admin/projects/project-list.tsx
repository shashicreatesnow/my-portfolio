"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { Copy, Eye, EyeOff, MoreHorizontal, Search, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { ProjectRecord } from "@/lib/types/projects";
import { deleteProjectAction, duplicateProjectAction, updateProjectAction } from "@/lib/actions/projects";
import { formatRelativeDate, truncate } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/admin/shared/status-badge";

export function ProjectList({ projects }: { projects: ProjectRecord[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "featured">("all");
  const [isPending, startTransition] = useTransition();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        (project.description || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "featured"
            ? project.is_featured
            : project.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, projects, search]);

  function mutate(message: string, task: () => Promise<void>) {
    startTransition(async () => {
      await task();
      toast.success(message);
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage published work, drafts, and featured stories.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search projects"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(["all", "published", "draft", "featured"] as const).map((tab) => (
            <Button
              key={tab}
              type="button"
              variant={filter === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tab)}
            >
              {tab === "all" ? "All" : tab === "draft" ? "Drafts" : tab[0].toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="grid gap-4 rounded-2xl border border-border bg-background p-5 md:grid-cols-[1fr_auto]"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={`/admin/projects/${project.id}`} className="text-lg font-semibold hover:text-primary">
                    {project.title}
                  </Link>
                  <StatusBadge status={project.status} />
                  {project.is_featured && <Badge>Featured</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{truncate(project.description, 180)}</p>
                <div className="flex flex-wrap gap-2">
                  {project.category_tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last edited {formatRelativeDate(project.updated_at)}
                </p>
              </div>
              <div className="flex items-start justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={isPending}
                  onClick={() =>
                    mutate("Project updated", async () => {
                      await updateProjectAction(project.id, {
                        ...project,
                        status: project.status,
                        description: project.description || "",
                        category_tags: project.category_tags || [],
                        client_name: project.client_name || "",
                        project_role: project.project_role || "",
                        project_timeline: project.project_timeline || "",
                        project_industry: project.project_industry || "",
                        meta_title: project.meta_title || "",
                        meta_description: project.meta_description || "",
                        cover_image_url: project.cover_image_url || "",
                        cover_image_blur_hash: project.cover_image_blur_hash || "",
                        og_image_url: project.og_image_url || "",
                        is_featured: !project.is_featured,
                      });
                    })
                  }
                >
                  <Star className={`h-4 w-4 ${project.is_featured ? "fill-current text-primary" : ""}`} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/projects/${project.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        mutate("Project duplicated", async () => {
                          await duplicateProjectAction(project.id);
                        })
                      }
                    >
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        mutate("Project status updated", async () => {
                          await updateProjectAction(project.id, {
                            ...project,
                            description: project.description || "",
                            category_tags: project.category_tags || [],
                            client_name: project.client_name || "",
                            project_role: project.project_role || "",
                            project_timeline: project.project_timeline || "",
                            project_industry: project.project_industry || "",
                            meta_title: project.meta_title || "",
                            meta_description: project.meta_description || "",
                            cover_image_url: project.cover_image_url || "",
                            cover_image_blur_hash: project.cover_image_blur_hash || "",
                            og_image_url: project.og_image_url || "",
                            status: project.status === "published" ? "draft" : "published",
                          });
                        })
                      }
                    >
                      {project.status === "published" ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Publish
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() =>
                        mutate("Project deleted", async () => {
                          await deleteProjectAction(project.id, project.slug);
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No projects match this view yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
