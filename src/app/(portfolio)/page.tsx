import Link from "next/link";

import { ClientsWall } from "@/components/portfolio/home/clients-wall";
import { HeroBrain } from "@/components/portfolio/home/hero-brain";
import { SkillsThree } from "@/components/portfolio/home/skills-three";
import { ProjectCard } from "@/components/portfolio/projects/project-card";
import { getPublishedClients } from "@/lib/queries/clients";
import { getFeaturedProjects } from "@/lib/queries/projects";
import { getSettings } from "@/lib/queries/settings";
import { getPublishedSkills } from "@/lib/queries/skills";

export default async function HomePage() {
  const [settings, featuredProjects, skills, clients] = await Promise.all([
    getSettings(),
    getFeaturedProjects(),
    getPublishedSkills(),
    getPublishedClients(),
  ]);

  return (
    <div className="w-full">
      <HeroBrain
        eyebrow={settings.hero.eyebrow || "Product & Brand Designer"}
        title={settings.hero.title || "A designer who can design"}
        titleAccent={settings.hero.title_accent}
        ledeText={settings.hero.subtitle}
        primaryHref={settings.hero.cta_link || "/works"}
        primaryLabel={settings.hero.cta_text || "enter the work"}
        secondaryHref={settings.hero.secondary_cta_link || "/about"}
        secondaryLabel={settings.hero.secondary_cta_text || "say hello"}
      />

      <ClientsWall clients={clients} />

      {featuredProjects.length > 0 ? (
        <section
          className="relative z-[3] mx-auto max-w-[1080px] border-t border-dashed border-[color:var(--rule)]"
          style={{ padding: "clamp(56px, 6vw, 80px) clamp(20px, 4vw, 40px)" }}
        >
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="portfolio-kicker">Selected work</span>
              <h2 className="mt-3 text-[28px] font-medium leading-tight tracking-[-0.025em] text-[color:var(--ink)] md:text-[36px]">
                Featured projects
              </h2>
            </div>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 self-start text-[13px] text-[color:var(--ink-muted)] transition hover:text-[color:var(--accent)] md:self-end"
            >
              View all work
              <span className="font-display italic">→</span>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      <SkillsThree skills={skills} />
    </div>
  );
}
