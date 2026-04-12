"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export function BeforeAfterSlider({
  beforeUrl,
  beforeAlt,
  afterUrl,
  afterAlt,
  caption,
}: {
  beforeUrl?: string;
  beforeAlt?: string;
  afterUrl?: string;
  afterAlt?: string;
  caption?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  function updatePosition(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  }

  function handlePointerDown(e: React.PointerEvent) {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }

  function handlePointerUp() {
    isDragging.current = false;
  }

  if (!beforeUrl || !afterUrl) return null;

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="editorial-panel relative aspect-video cursor-col-resize select-none overflow-hidden rounded-[32px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "none" }}
      >
        {/* After image (full background) */}
        <Image src={afterUrl} alt={afterAlt || "After"} fill className="object-cover" />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={beforeUrl} alt={beforeAlt || "Before"} fill className="object-cover" />
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/50 text-white backdrop-blur-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <Badge variant="secondary" className="absolute top-4 left-4 z-10 rounded-full border border-white/8 bg-black/50 text-white backdrop-blur-sm">
          Before
        </Badge>
        <Badge variant="secondary" className="absolute top-4 right-4 z-10 rounded-full border border-white/8 bg-black/50 text-white backdrop-blur-sm">
          After
        </Badge>
      </div>
      {caption && <p className="text-center text-sm text-muted-foreground">{caption}</p>}
    </div>
  );
}
