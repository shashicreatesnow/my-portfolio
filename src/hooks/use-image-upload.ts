"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  async function upload({
    file,
    context,
    projectId,
  }: {
    file: File;
    context: string;
    projectId?: string;
  }) {
    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "png";
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
      const fileName = `${Date.now()}-${safeName}`;
      const folder = projectId || "shared";
      const path = `${context}/${folder}/${fileName}`;

      const { error } = await supabase.storage
        .from("portfolio-images")
        .upload(path, file, {
          contentType: file.type,
          upsert: true,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-images").getPublicUrl(path);

      return {
        url: publicUrl,
        width: null,
        height: null,
        blur_hash: null,
      };
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading };
}
