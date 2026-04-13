"use client";

import Image from "next/image";
import { useTransition } from "react";
import { Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import type { CollectionRecord } from "@/lib/types/database";
import {
  createCollectionAction,
  deleteCollectionAction,
  updateCollectionAction,
} from "@/lib/actions/collections";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/admin/shared/tag-input";

export function CollectionManager({ collections }: { collections: CollectionRecord[] }) {
  const { upload, uploading } = useImageUpload();
  const [isPending, startTransition] = useTransition();

  async function handleUpload(file: File | null) {
    if (!file) return;
    try {
      const payload = await upload({ file, context: "collections" });
      const result = await createCollectionAction({
        image_url: payload.url,
        image_blur_hash: payload.blur_hash,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Collection item created");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    }
  }

  function updateItem(id: string, values: { caption: string; tags: string[]; is_published: boolean }) {
    startTransition(async () => {
      const result = await updateCollectionAction(id, values);
      if (!result.success) {
        toast.error(result.error || "Could not update collection item");
        return;
      }
      toast.success("Collection item updated");
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Collections</CardTitle>
            <p className="text-sm text-muted-foreground">Upload experiments, posters, and visual explorations.</p>
          </div>
          <label className="inline-flex cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => handleUpload(event.target.files?.[0] || null)}
            />
            <Button type="button" asChild>
              <span>
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload image"}
              </span>
            </Button>
          </label>
        </CardHeader>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        {collections.map((item) => (
          <Card key={item.id}>
            <CardContent className="space-y-4 p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={item.image_url} alt={item.caption || ""} fill className="object-cover" />
              </div>
              <Input
                defaultValue={item.caption || ""}
                onBlur={(event) =>
                  updateItem(item.id, {
                    caption: event.target.value,
                    tags: item.tags,
                    is_published: item.is_published,
                  })
                }
                placeholder="Caption"
              />
              <TagInput
                value={item.tags}
                onChange={(value) =>
                  updateItem(item.id, {
                    caption: item.caption || "",
                    tags: value,
                    is_published: item.is_published,
                  })
                }
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={item.is_published}
                    onCheckedChange={(checked) =>
                      updateItem(item.id, {
                        caption: item.caption || "",
                        tags: item.tags,
                        is_published: checked,
                      })
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.is_published ? "Published" : "Hidden"}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      const result = await deleteCollectionAction(item.id);
                      if (!result.success) {
                        toast.error(result.error || "Could not delete item");
                        return;
                      }
                      toast.success("Collection item removed");
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
