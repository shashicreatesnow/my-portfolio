import { ProjectGrid } from "@/components/portfolio/projects/project-grid";
import { getPublishedProjects } from "@/lib/queries/projects";

export default async function WorksPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 pb-24 md:px-8">
      <header className="mb-16 max-w-2xl space-y-4">
        <p className="portfolio-kicker">Works</p>
        <h1 className="font-display text-4xl md:text-5xl">From concept to system</h1>
        <p className="text-base leading-8 text-muted-foreground">
          Projects that helped products grow through strategy, systems, and crafted execution.
        </p>
      </header>
      <ProjectGrid projects={projects} />
    </div>
  );
}
