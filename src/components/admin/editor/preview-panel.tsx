"use client";

import { useEffect, useState } from "react";
import { Monitor, Smartphone, Tablet, X } from "lucide-react";

import type { ProjectBlockRecord } from "@/lib/types/blocks";
import { Button } from "@/components/ui/button";
import { BlockPreviewRenderer } from "./block-preview-renderer";

const breakpoints = [
  { key: "desktop", label: "Desktop", width: 1280, icon: Monitor },
  { key: "tablet", label: "Tablet", width: 768, icon: Tablet },
  { key: "mobile", label: "Mobile", width: 375, icon: Smartphone },
] as const;

export function PreviewOverlay({
  blocks,
  onClose,
}: {
  blocks: ProjectBlockRecord[];
  onClose: () => void;
}) {
  const [active, setActive] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const bp = breakpoints.find((b) => b.key === active)!;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium">Preview</p>
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
        <Button type="button" variant="ghost" size="icon" onClick={onClose} title="Close preview (Esc)">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Preview viewport */}
      <div className="flex-1 overflow-auto bg-muted/30 p-6">
        <div
          className="dark portfolio-shell mx-auto min-h-full rounded-xl bg-background text-foreground"
          style={{ maxWidth: bp.width }}
        >
          <div className="px-5 py-10 md:px-8">
            {blocks.length === 0 ? (
              <p className="py-20 text-center text-sm text-muted-foreground">
                Add blocks to see a preview
              </p>
            ) : (
              blocks.map((block, index) => (
                <BlockPreviewRenderer
                  key={block.id}
                  block={block}
                  index={index}
                  prevType={index > 0 ? blocks[index - 1].block_type : null}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
