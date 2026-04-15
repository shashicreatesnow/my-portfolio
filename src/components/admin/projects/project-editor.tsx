"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { ProjectBlockRecord } from "@/lib/types/blocks";
import type { ProjectRecord } from "@/lib/types/projects";
import { saveProjectBlocksAction } from "@/lib/actions/blocks";
import { BlockEditor } from "@/components/admin/editor/block-editor";
import { ProjectMetadataForm } from "@/components/admin/projects/project-metadata-form";

export function ProjectEditor({
  project,
  blocks,
  previewHref,
}: {
  project: ProjectRecord;
  blocks: ProjectBlockRecord[];
  previewHref: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={isPending ? "opacity-95" : ""}>
      <div className="grid h-[calc(100vh-6rem)] gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="overflow-y-auto pr-1">
          <BlockEditor
            initialBlocks={blocks}
            projectId={project.id}
            onSave={(nextBlocks) =>
              new Promise<void>((resolve, reject) => {
                startTransition(async () => {
                  const result = await saveProjectBlocksAction(
                    project.id,
                    project.slug,
                    nextBlocks,
                  );

                  if (!result.success) {
                    toast.error(result.error || "Could not save blocks");
                    reject(new Error(result.error));
                    return;
                  }

                  resolve();
                });
              })
            }
          />
        </div>
        <div className="overflow-y-auto">
          <ProjectMetadataForm project={project} previewHref={previewHref} />
        </div>
      </div>
    </div>
  );
}
