"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

const CONVERTIBLE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const WEBP_QUALITY = 0.85;

function toWebP(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!CONVERTIBLE_TYPES.includes(file.type)) {
      resolve(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            resolve(file);
            return;
          }

          const baseName = file.name.replace(/\.(png|jpe?g)$/i, "");
          resolve(new File([blob], `${baseName}.webp`, { type: "image/webp" }));
        },
        "image/webp",
        WEBP_QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };

    img.src = url;
  });
}

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
      const converted = await toWebP(file);
      const supabase = createClient();
      const safeName = converted.name.replace(/[^a-zA-Z0-9.-]/g, "-");
      const fileName = `${Date.now()}-${safeName}`;
      const folder = projectId || "shared";
      const path = `${context}/${folder}/${fileName}`;

      const { error } = await supabase.storage
        .from("portfolio-images")
        .upload(path, converted, {
          contentType: converted.type,
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
