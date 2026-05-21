"use client";

import { useMemo, useState } from "react";

import type { ProjectRecord } from "@/lib/types/projects";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/portfolio/projects/project-card";

// Fixed 4 buckets + "All". Each bucket lists the tag-matches that fall into it.
// Matching is case-insensitive and substring-based so individual project tags
// like "Brand Guidelines" still register under "Brand Design".
const FILTERS: Array<{ label: string; matches: string[] }> = [
  { label: "All", matches: [] },
  { label: "Product Design", matches: ["product design", "ui/ux", "ui ux", "uiux", "interaction"] },
  { label: "Brand Design", matches: ["brand", "identity"] },
  { label: "AI Automation", matches: ["ai", "agentic", "automation"] },
  { label: "Visual Design", matches: ["visual", "thumbnail", "graphic", "illustration"] },
];

function matchesBucket(project: ProjectRecord, matches: string[]) {
  if (matches.length === 0) return true;
  const tags = project.category_tags.map((t) => t.toLowerCase());
  return matches.some((needle) => tags.some((tag) => tag.includes(needle)));
}

export function ProjectGrid({ projects }: { projects: ProjectRecord[] }) {
  const [activeLabel, setActiveLabel] = useState("All");

  const filtered = useMemo(() => {
    const filter = FILTERS.find((f) => f.label === activeLabel) ?? FILTERS[0];
    return projects.filter((project) => matchesBucket(project, filter.matches));
  }, [activeLabel, projects]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Button
            key={filter.label}
            type="button"
            variant={filter.label === activeLabel ? "default" : "outline"}
            size="sm"
            className={
              filter.label === activeLabel
                ? "rounded-full bg-[color:var(--ink)] text-[color:var(--paper)] hover:bg-[color:var(--accent)]"
                : "rounded-full border-[color:var(--rule)] bg-transparent text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
            }
            onClick={() => setActiveLabel(filter.label)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[color:var(--rule)] bg-[color:var(--paper-2)] p-12 text-center text-[color:var(--ink-muted)]">
          No projects in this category yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
