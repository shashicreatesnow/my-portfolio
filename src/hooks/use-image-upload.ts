"use client";

import { useState } from "react";

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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("context", context);
      if (projectId) {
        formData.append("projectId", projectId);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Upload failed.");
      }

      return payload;
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading };
}
