import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/portfolio/blocks/block-renderer";
import { Badge } from "@/components/ui/badge";
import { ProjectNavigation } from "@/components/portfolio/projects/project-navigation";
import { SectionNavigator, type Section } from "@/components/portfolio/projects/section-navigator";
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

  const sections: Section[] = entry.blocks
    .filter((b) => b.block_type === "heading1" || b.block_type === "heading2" || b.block_type === "heading3")
    .map((b) => ({
      id: `section-${b.id}`,
      text: ((b.content as { text?: string }).text ?? "").trim(),
      level: Number(b.block_type.replace("heading", "")) as 1 | 2 | 3,
    }))
    .filter((s) => s.text.length > 0);

  return (
    <>
      <SectionNavigator sections={sections} />
      <article
        className="relative z-[3] mx-auto max-w-[1080px]"
        style={{ padding: "clamp(40px,5vw,72px) clamp(20px,4vw,40px) clamp(72px,8vw,104px)" }}
      >
      <header className="space-y-7">
        <div className="max-w-[60ch] space-y-5">
          <p className="portfolio-kicker">Case Study</p>
          <div className="flex flex-wrap gap-2">
            {entry.project.category_tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full border-[color:var(--rule)] bg-transparent text-[11px] font-normal tracking-[0.04em] text-[color:var(--ink-muted)]"
              >
                {tag}
              </Badge>
            ))}
            {hasValidToken && (
              <Badge className="rounded-full bg-[color:var(--accent)] text-[color:var(--paper)]">Preview</Badge>
            )}
          </div>
          <h1
            className="font-medium text-[color:var(--ink)]"
            style={{ fontSize: "clamp(36px,5vw,56px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
          >
            {entry.project.title}
          </h1>
          <p className="max-w-[60ch] text-base leading-[1.65] text-[color:var(--ink-muted)]">
            {entry.project.description}
          </p>
        </div>
        <div className="grid gap-6 border-t border-dashed border-[color:var(--rule)] pt-6 md:grid-cols-4">
          {entry.project.client_name && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">Client</p>
              <p className="portfolio-meta mt-2 text-[color:var(--ink)]">{entry.project.client_name}</p>
            </div>
          )}
          {entry.project.project_role && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">Role</p>
              <p className="portfolio-meta mt-2 text-[color:var(--ink)]">{entry.project.project_role}</p>
            </div>
          )}
          {entry.project.project_timeline && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">Timeline</p>
              <p className="portfolio-meta mt-2 text-[color:var(--ink)]">{entry.project.project_timeline}</p>
            </div>
          )}
          {entry.project.project_industry && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">Industry</p>
              <p className="portfolio-meta mt-2 text-[color:var(--ink)]">{entry.project.project_industry}</p>
            </div>
          )}
        </div>
      </header>
      <div className="mt-20">
        {await Promise.all(
          entry.blocks.map(async (block, index) => (
            <BlockRenderer
              key={block.id}
              block={block}
              index={index}
              prevType={index > 0 ? entry.blocks[index - 1].block_type : null}
            />
          )),
        )}
      </div>
      <ProjectNavigation previous={previous} next={next} />
    </article>
    </>
  );
}
