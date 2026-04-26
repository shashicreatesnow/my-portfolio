"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";

export type Section = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

const LINE_WIDTH: Record<Section["level"], string> = {
  1: "w-6",
  2: "w-4",
  3: "w-2.5",
};

export function SectionNavigator({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    if (sections.length === 0) return;

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Pick the topmost visible heading
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(top.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  function jumpTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <nav
      aria-label="Sections"
      className="group fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 md:block"
    >
      <ul
        className={cn(
          "flex flex-col gap-2 rounded-2xl border border-transparent px-2 py-3 transition-all duration-200",
          "group-hover:border-[var(--portfolio-line)] group-hover:bg-background/80 group-hover:px-4 group-hover:py-3 group-hover:backdrop-blur-md",
        )}
      >
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => jumpTo(section.id)}
                className="flex items-center gap-3 text-left"
              >
                <span
                  className={cn(
                    "block h-px shrink-0 transition-all duration-200",
                    LINE_WIDTH[section.level],
                    isActive ? "bg-primary" : "bg-white/20 group-hover:bg-white/40",
                  )}
                />
                <span
                  className={cn(
                    "hidden whitespace-nowrap text-sm transition-colors duration-200 group-hover:inline",
                    section.level === 3 && "pl-3",
                    section.level === 2 && "pl-1",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {section.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
