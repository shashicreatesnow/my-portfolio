"use client";

import Image from "next/image";
import Link from "next/link";
import { GlowPanel } from "@/components/portfolio/layout/glow-panel";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCursor } from "@/providers/cursor-provider";

import type { ProjectRecord } from "@/lib/types/projects";
import { Badge } from "@/components/ui/badge";
import { createBlurDataUrl } from "@/lib/utils/image";

export function ProjectCard({ project }: { project: ProjectRecord }) {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursorState, resetCursor } = useCursor();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax the image Y position subtly between -15px and 15px during scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div 
      ref={ref}
      onMouseEnter={() => {
        if (project.cover_image_url) {
          setCursorState({ active: true, type: "media", data: project.cover_image_url });
        } else {
          setCursorState({ active: true, type: "text", data: "VIEW" });
        }
      }}
      onMouseLeave={resetCursor}
      className="h-full"
    >
      <GlowPanel tilt={true} className="rounded-[34px] h-full">
      <Link
        href={`/works/${project.slug}`}
        className="group editorial-panel block overflow-hidden rounded-[34px] h-full"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-b-[26px]">
          {project.cover_image_url ? (
            <motion.div style={{ y: imageY }} className="absolute -inset-[10%] h-[120%] w-[120%]">
              <Image
                src={project.cover_image_url}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                placeholder="blur"
                blurDataURL={project.cover_image_blur_hash || createBlurDataUrl("SP")}
              />
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center bg-secondary text-muted-foreground">
              No image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-60 transition group-hover:opacity-75" />
        </div>
        <div className="space-y-4 p-6 md:p-7">
          <div className="portfolio-rule space-y-3">
            <p className="portfolio-kicker">Case Study</p>
            <h3 className="font-display text-3xl leading-tight text-foreground md:text-[2rem]">
              {project.title}
            </h3>
            <p className="portfolio-copy text-sm">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.category_tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full border border-white/8 bg-white/[0.04] text-[#d9d1c4]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </GlowPanel>
    </div>
  );
}
