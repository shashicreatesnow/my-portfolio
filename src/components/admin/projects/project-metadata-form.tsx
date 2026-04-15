/* eslint-disable react-hooks/incompatible-library */

"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { projectMetadataSchema, type ProjectMetadataValues } from "@/lib/schemas/project";
import type { ProjectRecord } from "@/lib/types/projects";
import { updateProjectAction } from "@/lib/actions/projects";
import { slugify } from "@/lib/utils/slug";
import { DEFAULT_CATEGORY_TAGS } from "@/lib/constants/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/shared/image-uploader";
import { TagInput } from "@/components/admin/shared/tag-input";

export function ProjectMetadataForm({
  project,
  previewHref,
}: {
  project: ProjectRecord;
  previewHref: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [slugEdited, setSlugEdited] = useState(Boolean(project.slug));
  const [savedProject, setSavedProject] = useState(project);

  const form = useForm<ProjectMetadataValues>({
    resolver: zodResolver(projectMetadataSchema),
    defaultValues: {
      title: project.title,
      slug: project.slug,
      description: project.description || "",
      status: project.status,
      is_featured: project.is_featured,
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
    },
  });

  const titleValue = form.watch("title");
  const descriptionValue = form.watch("description") || "";
  const currentStatus = form.watch("status") || "draft";
  const currentFeatured = form.watch("is_featured") ?? false;
  const currentCategoryTags = form.watch("category_tags") || [];
  const currentCoverImage = form.watch("cover_image_url") || "";
  const currentOgImage = form.watch("og_image_url") || "";

  useEffect(() => {
    if (!slugEdited) {
      form.setValue("slug", slugify(titleValue), { shouldDirty: true });
    }
  }, [form, slugEdited, titleValue]);

  const statusLabel = useMemo(
    () => (currentStatus === "published" ? "Unpublish" : "Publish"),
    [currentStatus],
  );

  function onSubmit(values: ProjectMetadataValues) {
    startTransition(async () => {
      const result = await updateProjectAction(project.id, values);
      if (!result.success || !result.data) {
        toast.error(result.error || "Could not save project.");
        return;
      }

      setSavedProject(result.data);
      form.reset({
        ...values,
        slug: result.data.slug,
      });
      toast.success("Project saved");
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...form.register("title")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            {...form.register("slug")}
            onChange={(event) => {
              setSlugEdited(true);
              form.setValue("slug", event.target.value, { shouldDirty: true });
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...form.register("description")} />
          <p className="text-xs text-muted-foreground">{descriptionValue?.length || 0}/300</p>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Cover image</Label>
          <ImageUploader
            context="covers"
            projectId={project.id}
            value={currentCoverImage}
            onChange={(value) => form.setValue("cover_image_url", value, { shouldDirty: true })}
          />
        </div>
        <div className="space-y-3">
          <Label>Status</Label>
          <Select
            value={currentStatus}
            onValueChange={(value) =>
              form.setValue("status", value as "draft" | "published", { shouldDirty: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between rounded-3xl border border-border p-4">
          <div>
            <p className="font-medium">Featured project</p>
            <p className="text-sm text-muted-foreground">Show this on the homepage</p>
          </div>
          <Switch
            checked={currentFeatured}
            onCheckedChange={(checked) =>
              form.setValue("is_featured", checked, { shouldDirty: true })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Category tags</Label>
          <TagInput
            value={currentCategoryTags}
            onChange={(value) => form.setValue("category_tags", value, { shouldDirty: true })}
            suggestions={DEFAULT_CATEGORY_TAGS}
          />
        </div>
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="client_name">Client name</Label>
            <Input id="client_name" {...form.register("client_name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project_role">Role</Label>
            <Input id="project_role" {...form.register("project_role")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project_timeline">Timeline</Label>
            <Input id="project_timeline" {...form.register("project_timeline")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project_industry">Industry</Label>
            <Input id="project_industry" {...form.register("project_industry")} />
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="meta_title">Meta title</Label>
          <Input id="meta_title" {...form.register("meta_title")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="meta_description">Meta description</Label>
          <Textarea id="meta_description" {...form.register("meta_description")} />
        </div>
        <div className="space-y-2">
          <Label>OG image</Label>
          <ImageUploader
            context="general"
            projectId={project.id}
            value={currentOgImage}
            onChange={(value) => form.setValue("og_image_url", value, { shouldDirty: true })}
          />
        </div>
        <div className="flex flex-wrap gap-3 border-t border-border pt-4">
          <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              form.handleSubmit((values) =>
                onSubmit({
                  ...values,
                  status: values.status === "published" ? "draft" : "published",
                }),
              )()
            }
          >
            {statusLabel}
          </Button>
          <Button asChild variant="ghost">
            <Link href={previewHref} target="_blank">
              <ExternalLink className="h-4 w-4" />
              Preview
            </Link>
          </Button>
        </div>
        {savedProject.slug !== project.slug && (
          <p className="text-xs text-muted-foreground">
            Latest slug: <span className="font-medium">{savedProject.slug}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
