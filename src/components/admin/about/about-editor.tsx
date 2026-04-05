"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { AboutBlockRecord } from "@/lib/types/database";
import { saveAboutBlocksAction } from "@/lib/actions/blocks";
import { BlockEditor } from "@/components/admin/editor/block-editor";

export function AboutEditor({ blocks }: { blocks: AboutBlockRecord[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={isPending ? "opacity-90" : ""}>
      <BlockEditor
        initialBlocks={blocks}
        onSave={(nextBlocks) =>
          new Promise<void>((resolve, reject) => {
            startTransition(async () => {
              const result = await saveAboutBlocksAction(nextBlocks);
              if (!result.success) {
                toast.error(result.error || "Could not save about blocks");
                reject(new Error(result.error));
                return;
              }
              resolve();
            });
          })
        }
      />
    </div>
  );
}
