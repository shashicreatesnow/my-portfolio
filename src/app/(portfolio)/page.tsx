import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/portfolio/projects/project-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/queries/projects";
import { getSettings } from "@/lib/queries/settings";

export default async function HomePage() {
  const [settings, featuredProjects] = await Promise.all([
    getSettings(),
    getFeaturedProjects(),
  ]);

  return (
    <div className="w-full">
      <section className="pt-48 pb-32 md:pt-56 md:pb-40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl space-y-8">
            <p className="portfolio-kicker">Design systems thinking</p>
            <h1 className="font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">
              {settings.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {settings.hero.subtitle}
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href={settings.hero.cta_link}>
                {settings.hero.cta_text}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-32 md:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="portfolio-kicker">Selected work</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">Systems that sharpen design output</h2>
          </div>
          <Button asChild variant="ghost" className="w-fit rounded-full text-muted-foreground">
            <Link href="/works">View all work</Link>
          </Button>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
