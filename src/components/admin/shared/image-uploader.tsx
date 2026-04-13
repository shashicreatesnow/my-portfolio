"use client";

import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImageUpload } from "@/hooks/use-image-upload";

export function ImageUploader({
  value,
  onChange,
  context,
  projectId,
}: {
  value?: string | null;
  onChange: (value: string) => void;
  context: string;
  projectId?: string;
}) {
  const { upload, uploading } = useImageUpload();

  async function handleFile(file: File | null) {
    if (!file) {
      return;
    }

    try {
      const payload = await upload({ file, context, projectId });
      onChange(payload.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    }
  }

  return (
    <div className="space-y-3">
      <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/40 p-4 text-center">
        {value ? (
          <div className="relative h-40 w-full overflow-hidden rounded-3xl">
            <Image src={value} alt="" fill className="object-cover" />
          </div>
        ) : (
          <>
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <Upload className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="mt-3 text-sm text-muted-foreground">
              Drop an image here or click to browse
            </span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0] || null)}
        />
      </label>
      <Input
        placeholder="Or paste an image URL"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
          <X className="h-4 w-4" />
          Remove
        </Button>
      )}
    </div>
  );
}
