import Image from "next/image";
import Link from "next/link";

import type { ProjectRecord } from "@/lib/types/projects";
import { Badge } from "@/components/ui/badge";
import { createBlurDataUrl } from "@/lib/utils/image";

export function ProjectCard({ project }: { project: ProjectRecord }) {
  return (
    <Link
      href={`/works/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/6 bg-white/[0.02]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            placeholder="blur"
            blurDataURL={project.cover_image_blur_hash || createBlurDataUrl("SP")}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="font-display text-2xl leading-tight text-foreground">
            {project.title}
          </h3>
          <p className="portfolio-copy text-sm">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.category_tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
