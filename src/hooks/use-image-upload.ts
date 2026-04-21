"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

const CONVERTIBLE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const WEBP_QUALITY = 0.85;

function isHeic(file: File) {
  const byType = /heic|heif/i.test(file.type);
  const byName = /\.(heic|heif)$/i.test(file.name);
  return byType || byName;
}

async function heicToJpeg(file: File): Promise<File> {
  const heic2any = (await import("heic2any")).default;
  const blob = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.95,
  });
  const out = Array.isArray(blob) ? blob[0] : blob;
  const baseName = file.name.replace(/\.(heic|heif)$/i, "");
  return new File([out], `${baseName}.jpg`, { type: "image/jpeg" });
}

function pngOrJpegToWebP(file: File): Promise<File> {
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

async function optimizeImage(file: File): Promise<File> {
  if (isHeic(file)) {
    const jpeg = await heicToJpeg(file);
    return pngOrJpegToWebP(jpeg);
  }
  return pngOrJpegToWebP(file);
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
      const optimized = await optimizeImage(file);
      const supabase = createClient();
      const safeName = optimized.name.replace(/[^a-zA-Z0-9.-]/g, "-");
      const fileName = `${Date.now()}-${safeName}`;
      const folder = projectId || "shared";
      const path = `${context}/${folder}/${fileName}`;

      const { error } = await supabase.storage
        .from("portfolio-images")
        .upload(path, optimized, {
          contentType: optimized.type,
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
