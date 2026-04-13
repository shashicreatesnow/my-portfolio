"use client";

import { useState } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";

import type { ProjectBlockRecord } from "@/lib/types/blocks";
import { Button } from "@/components/ui/button";
import { BlockPreviewRenderer } from "./block-preview-renderer";

const breakpoints = [
  { key: "desktop", label: "Desktop", width: 1280, icon: Monitor },
  { key: "tablet", label: "Tablet", width: 768, icon: Tablet },
  { key: "mobile", label: "Mobile", width: 375, icon: Smartphone },
] as const;

export function PreviewPanel({ blocks }: { blocks: ProjectBlockRecord[] }) {
  const [active, setActive] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const bp = breakpoints.find((b) => b.key === active)!;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/* Breakpoint toolbar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-1">
          {breakpoints.map((b) => {
            const Icon = b.icon;
            return (
              <Button
                key={b.key}
                type="button"
                variant={active === b.key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActive(b.key)}
                title={b.label}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
        <span className="text-xs text-muted-foreground">{bp.width}px</span>
      </div>

      {/* Preview viewport */}
      <div className="flex-1 overflow-auto bg-muted/30 p-4">
        <div
          className="dark portfolio-shell mx-auto min-h-full rounded-xl bg-background text-foreground"
          style={{ maxWidth: bp.width }}
        >
          <div className="space-y-20 px-5 py-10 md:px-8">
            {blocks.length === 0 ? (
              <p className="py-20 text-center text-sm text-muted-foreground">
                Add blocks to see a preview
              </p>
            ) : (
              blocks.map((block) => (
                <BlockPreviewRenderer key={block.id} block={block} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
