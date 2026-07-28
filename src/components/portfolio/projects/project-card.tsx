"use client";

import Image from "next/image";
import Link from "next/link";

import type { ProjectRecord } from "@/lib/types/projects";
import { createBlurDataUrl } from "@/lib/utils/image";

export function ProjectCard({ project }: { project: ProjectRecord }) {
  const primaryTag = project.category_tags[0];

  return (
    <div className="group relative rounded-2xl border border-[color:var(--rule)] bg-[color:var(--paper-2)] p-2.5 transition hover:border-[color:var(--accent)]/40 hover:shadow-[0_18px_48px_-24px_rgba(0,0,0,0.6)]">
      {/* stretched link covers the entire card */}
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
            className="absolute bottom-3 left-3 rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] backdrop-blur transition-all duration-300 ease-out group-hover:bottom-4 group-hover:translate-x-0.5"
            style={{
              backgroundColor: "rgba(10, 10, 9, 0.72)",
              borderColor: "rgba(242, 239, 233, 0.16)",
              color: "var(--ink)",
            }}
          >
            {primaryTag}
          </span>
        ) : null}
      </div>

      {/* Title */}
      <div className="pointer-events-none relative z-[2] px-2 pt-3.5 pb-2.5">
        <h3
          className="text-[18px] font-medium leading-snug tracking-[-0.005em] transition-colors duration-300 group-hover:text-[color:var(--accent)]"
          style={{ color: "var(--ink)" }}
        >
          {project.title}
        </h3>
      </div>
    </div>
  );
}
