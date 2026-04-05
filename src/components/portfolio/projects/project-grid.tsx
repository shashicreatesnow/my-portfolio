"use client";

import { useMemo, useState } from "react";

import type { ProjectRecord } from "@/lib/types/projects";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/portfolio/projects/project-card";

export function ProjectGrid({ projects }: { projects: ProjectRecord[] }) {
  const tags = useMemo(
    () => ["All", ...new Set(projects.flatMap((project) => project.category_tags))],
    [projects],
  );
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    if (activeTag === "All") {
      return projects;
    }
    return projects.filter((project) => project.category_tags.includes(activeTag));
  }, [activeTag, projects]);

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
                ? "signal-accent rounded-full border border-transparent text-primary-foreground"
                : "rounded-full border-white/8 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04]"
            }
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="editorial-panel rounded-[32px] border-dashed p-12 text-center text-muted-foreground">
          No projects in this category yet.
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
