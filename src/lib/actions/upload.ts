"use server";

import { createBlurDataUrl } from "@/lib/utils/image";
import {
  failure,
  getAuthedSupabase,
  success,
} from "@/lib/actions/_shared";

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file");
    const context = String(formData.get("context") || "general");
    const projectId = String(formData.get("projectId") || "shared");

    if (!(file instanceof File)) {
      throw new Error("File is required.");
    }

    const { supabase } = await getAuthedSupabase();
    const fileExt = file.name.split(".").pop() || "png";
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
    const path = `${context}/${projectId}/${fileName}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(path, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-images").getPublicUrl(path);

    return success({
      url: publicUrl,
      width: null,
      height: null,
      blur_hash: createBlurDataUrl(fileExt.slice(0, 2).toUpperCase()),
    });
  } catch (error) {
    return failure(error);
  }
}
