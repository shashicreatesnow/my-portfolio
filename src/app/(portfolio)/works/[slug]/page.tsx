import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/portfolio/blocks/block-renderer";
import { Badge } from "@/components/ui/badge";
import { ProjectNavigation } from "@/components/portfolio/projects/project-navigation";
import { getProjectBySlug, getProjectPreviewBySlug, getPublishedProjects } from "@/lib/queries/projects";
import { verifyPreviewToken } from "@/lib/utils/preview-token";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string; token?: string }>;
}

export default async function CaseStudyPage({
  params,
  searchParams,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const isPreviewRequested = query.preview === "true";
  const hasValidToken =
    isPreviewRequested &&
    process.env.REVALIDATION_SECRET &&
    verifyPreviewToken(slug, query.token, process.env.REVALIDATION_SECRET);

  const entry = hasValidToken
    ? await getProjectPreviewBySlug(slug)
    : await getProjectBySlug(slug);

  if (!entry) {
    notFound();
  }

  const publishedProjects = await getPublishedProjects();
  const currentIndex = publishedProjects.findIndex((project) => project.slug === slug);
  const previous = currentIndex > 0 ? publishedProjects[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < publishedProjects.length - 1
      ? publishedProjects[currentIndex + 1]
      : null;

  return (
    <article className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <header className="editorial-panel space-y-8 rounded-[38px] p-6 md:p-8">
        <div className="space-y-5">
          <div className="portfolio-rule">
            <p className="portfolio-kicker">Case Study</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.project.category_tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full border border-white/8 bg-white/[0.04] text-[#d9d1c4]">
                {tag}
              </Badge>
            ))}
            {hasValidToken && <Badge className="signal-accent rounded-full border border-transparent">Preview</Badge>}
          </div>
          <h1 className="max-w-4xl font-display text-5xl leading-[0.96] md:text-7xl">{entry.project.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{entry.project.description}</p>
        </div>
        <div className="grid gap-4 rounded-[32px] border border-white/8 bg-white/[0.03] p-6 md:grid-cols-4">
          {entry.project.client_name && (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Client</p>
              <p className="portfolio-meta mt-2">{entry.project.client_name}</p>
            </div>
          )}
          {entry.project.project_role && (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Role</p>
              <p className="portfolio-meta mt-2">{entry.project.project_role}</p>
            </div>
          )}
          {entry.project.project_timeline && (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Timeline</p>
              <p className="portfolio-meta mt-2">{entry.project.project_timeline}</p>
            </div>
          )}
          {entry.project.project_industry && (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Industry</p>
              <p className="portfolio-meta mt-2">{entry.project.project_industry}</p>
            </div>
          )}
        </div>
      </header>
      <div className="mt-16 space-y-14">
        {await Promise.all(entry.blocks.map(async (block) => <BlockRenderer key={block.id} block={block} />))}
      </div>
      <ProjectNavigation previous={previous} next={next} />
    </article>
  );
}
