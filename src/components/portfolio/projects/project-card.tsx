"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { ProjectRecord } from "@/lib/types/projects";
import { createBlurDataUrl } from "@/lib/utils/image";

export function ProjectCard({ project }: { project: ProjectRecord }) {
  const primaryTag = project.category_tags[0];
  const [showFull, setShowFull] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const check = () => {
      setIsTruncated(el.scrollHeight - 1 > el.clientHeight);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [project.description]);

  return (
    <div
      className="group relative rounded-2xl border border-[color:var(--rule)] bg-[color:var(--paper-2)] p-2.5 transition hover:border-[color:var(--accent)]/40 hover:shadow-[0_18px_48px_-24px_rgba(26,26,26,0.22)]"
      style={{ zIndex: showFull ? 40 : 1 }}
    >
      {/* stretched link covers the entire card; pointer-events-auto on the "more" button overrides this on top */}
      <Link
        href={`/works/${project.slug}`}
        aria-label={project.title}
        className="absolute inset-0 z-[1] rounded-2xl"
      />

      {/* Image area */}
      <div className="pointer-events-none relative z-[2] aspect-[4/3] overflow-hidden rounded-xl">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            placeholder="blur"
            blurDataURL={project.cover_image_blur_hash || createBlurDataUrl("SP")}
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-[color:var(--ink-soft)]"
            style={{ backgroundColor: "var(--paper)" }}
          >
            No image
          </div>
        )}
        {primaryTag ? (
          <span
            className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] backdrop-blur transition-all duration-300 ease-out group-hover:bottom-4 group-hover:translate-x-0.5"
            style={{
              backgroundColor: "rgba(244, 239, 230, 0.85)",
              color: "var(--ink-muted)",
            }}
          >
            {primaryTag}
          </span>
        ) : null}
      </div>

      {/* Title + description */}
      <div className="pointer-events-none relative z-[2] space-y-2 px-2 pt-3.5 pb-2.5">
        <h3
          className="text-[18px] font-medium leading-snug tracking-[-0.005em] transition-colors duration-300 group-hover:text-[color:var(--accent)]"
          style={{ color: "var(--ink)" }}
        >
          {project.title}
        </h3>
        {project.description ? (
          <div className="relative">
            <p
              ref={descRef}
              className="text-[13.5px] leading-[1.55]"
              style={{
                color: "var(--ink-muted)",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>
            {isTruncated ? (
              <>
                <button
                  type="button"
                  onMouseEnter={() => setShowFull(true)}
                  onMouseLeave={() => setShowFull(false)}
                  onFocus={() => setShowFull(true)}
                  onBlur={() => setShowFull(false)}
                  className="pointer-events-auto mt-1 inline-flex items-center text-[12px] font-medium underline-offset-2 hover:underline"
                  style={{ color: "var(--accent)" }}
                  aria-label={`Show full description for ${project.title}`}
                >
                  … more
                </button>
                {showFull ? (
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute left-0 right-0 top-full z-[30] mt-2 rounded-xl border p-4 shadow-[0_24px_60px_-24px_rgba(26,26,26,0.35)]"
                    style={{
                      backgroundColor: "var(--paper)",
                      borderColor: "var(--rule)",
                    }}
                  >
                    <p
                      className="text-[13.5px] leading-[1.6]"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {project.description}
                    </p>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
