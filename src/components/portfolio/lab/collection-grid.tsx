"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { CollectionRecord } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CollectionGrid({ items }: { items: CollectionRecord[] }) {
  const tags = useMemo(
    () => ["All", ...new Set(items.flatMap((item) => item.tags))],
    [items],
  );
  const [activeTag, setActiveTag] = useState("All");
  const [selected, setSelected] = useState<CollectionRecord | null>(null);

  const filtered = useMemo(() => {
    if (activeTag === "All") {
      return items;
    }
    return items.filter((item) => item.tags.includes(activeTag));
  }, [activeTag, items]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            type="button"
            variant={tag === activeTag ? "default" : "outline"}
            size="sm"
            className={
              tag === activeTag
                ? "rounded-full bg-primary text-primary-foreground"
                : "rounded-full border-white/6 bg-transparent text-muted-foreground hover:text-foreground"
            }
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            className="mb-6 block w-full overflow-hidden rounded-2xl border border-white/6 bg-white/[0.02] text-left transition hover:opacity-90"
            onClick={() => setSelected(item)}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={item.image_url} alt={item.caption || ""} fill className="object-cover" />
            </div>
            {item.caption && <p className="p-4 text-sm text-muted-foreground">{item.caption}</p>}
          </button>
        ))}
      </div>
      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-4xl border-white/10 bg-[rgba(10,10,11,0.96)]">
          {selected && (
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image src={selected.image_url} alt={selected.caption || ""} fill className="object-contain" />
              </div>
              <div className="space-y-2">
                <p className="text-lg">{selected.caption}</p>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <Button key={tag} type="button" variant="outline" size="sm" className="rounded-full border-white/6">
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
