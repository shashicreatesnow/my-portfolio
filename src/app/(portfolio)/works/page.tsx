import { ProjectGrid } from "@/components/portfolio/projects/project-grid";
import { getPublishedProjects } from "@/lib/queries/projects";

export default async function WorksPage() {
  const projects = await getPublishedProjects();

  return (
    <div
      className="relative z-[3] mx-auto max-w-[1080px]"
      style={{ padding: "clamp(40px,5vw,72px) clamp(20px,4vw,40px) clamp(72px,8vw,104px)" }}
    >
      <header className="mb-12 max-w-[44ch] space-y-4">
        <p className="portfolio-kicker">Works</p>
        <h1
          className="font-medium text-[color:var(--ink)]"
          style={{ fontSize: "clamp(36px,5vw,56px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
        >
          From concept to{" "}
          <span className="font-display italic font-normal text-[color:var(--accent)]">system</span>
        </h1>
      </header>
      <ProjectGrid projects={projects} />
    </div>
  );
}
