import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/portfolio/projects/project-card";
import { Magnetic } from "@/components/portfolio/layout/magnetic";
import { TextReveal } from "@/components/portfolio/layout/text-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedProjects } from "@/lib/queries/projects";
import { getSettings } from "@/lib/queries/settings";

const skills = [
  ["Product Design", "End-to-end mobile and web product experiences"],
  ["Visual Design", "Thumbnails, posters, and visual systems at scale"],
  ["Brand Design", "Identity systems that differentiate and stick"],
  ["AI-Powered Workflows", "Design pipelines that multiply creative output"],
  ["Design Research", "Benchmarking, audience analysis, and competitive audits"],
];

export default async function HomePage() {
  const [settings, featuredProjects] = await Promise.all([
    getSettings(),
    getFeaturedProjects(),
  ]);

  return (
    <div className="w-full">
      <section className="grid-pattern story-fade relative w-full border-b border-white/5 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="relative z-10 space-y-8 lg:col-span-7">
            <div className="portfolio-rule">
              <p className="portfolio-kicker">Design systems thinking</p>
            </div>
            <h1 className="max-w-5xl font-display text-6xl leading-[0.9] tracking-tight md:text-[7.5rem] md:tracking-[-0.03em]">
              <TextReveal text={settings.hero.title} />
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {settings.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Magnetic intensity={0.15}>
                <Button asChild size="lg" className="signal-accent rounded-full border border-transparent">
                  <Link href={settings.hero.cta_link}>
                    {settings.hero.cta_text}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic intensity={0.15}>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/8 bg-white/[0.02]">
                  <Link href="/about">Learn more</Link>
                </Button>
              </Magnetic>
            </div>
          </div>
          <div className="relative z-10 grid gap-4 self-end lg:col-span-5 lg:pl-10">
            <div className="glass-quiet rounded-[30px] p-5">
              <p className="portfolio-kicker">Approach</p>
              <p className="mt-4 font-display text-3xl leading-tight">Strategic clarity, then crafted execution.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-quiet rounded-[26px] p-5">
                <p className="text-3xl font-display text-primary">Research</p>
                <p className="mt-2 text-sm text-muted-foreground">Benchmarking, audience understanding, decision framing.</p>
              </div>
              <div className="glass-quiet rounded-[26px] p-5">
                <p className="text-3xl font-display text-primary">Systems</p>
                <p className="mt-2 text-sm text-muted-foreground">Pipelines, reusable blocks, and scalable creative operations.</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end justify-between">
          <div className="portfolio-rule">
            <p className="portfolio-kicker">Selected work</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Systems that sharpen design output</h2>
          </div>
          <Magnetic intensity={0.1}>
            <Button asChild variant="ghost" className="rounded-full text-muted-foreground hover:bg-white/[0.04]">
              <Link href="/works">View all work</Link>
            </Button>
          </Magnetic>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="portfolio-rule mb-10">
          <p className="portfolio-kicker">Expertise</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">A practice built around leverage</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.map(([title, description]) => (
            <Card key={title} className="editorial-panel">
              <CardContent className="space-y-3 p-6">
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="portfolio-copy text-sm">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 md:grid-cols-2 md:px-8">
        <Card className="editorial-panel rounded-3xl">
          <CardContent className="space-y-4 p-8">
            <p className="portfolio-kicker">About</p>
            <h2 className="font-display text-4xl">{settings.about.headline}</h2>
            <p className="portfolio-copy text-lg">
              {settings.about.subheadline}
            </p>
            <Magnetic intensity={0.1}>
              <Button asChild variant="ghost" className="w-fit rounded-full text-muted-foreground hover:bg-white/[0.04]">
                <Link href="/about">
                  Learn more about me
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
          </CardContent>
        </Card>
        <Card className="editorial-panel rounded-3xl">
          <CardContent className="space-y-4 p-8">
            <p className="portfolio-kicker">Contact</p>
            <h2 className="font-display text-4xl">Ready to build something?</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{settings.contact.email}</p>
              <p>{settings.contact.linkedin}</p>
              <p>{settings.contact.behance}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
