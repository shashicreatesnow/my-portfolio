import { ProjectGrid } from "@/components/portfolio/projects/project-grid";
import { getPublishedProjects } from "@/lib/queries/projects";

export default async function WorksPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <header className="editorial-panel mb-12 rounded-[36px] px-6 py-10 md:px-8">
        <div className="portfolio-rule space-y-4">
        <p className="portfolio-kicker">Works</p>
        <h1 className="font-display text-5xl md:text-6xl">
          From concept to system
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Projects that helped products grow through strategy, systems, and crafted execution.
        </p>
        </div>
      </header>
      <ProjectGrid projects={projects} />
    </div>
  );
}
