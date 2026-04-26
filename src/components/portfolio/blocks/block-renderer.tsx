/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { codeToHtml } from "shiki";

import { Download } from "lucide-react";

import type { ProjectBlockRecord } from "@/lib/types/blocks";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { getEmbedUrl } from "@/lib/utils/video";
import { BeforeAfterSlider } from "./before-after-slider";

function widthClass(blockType: ProjectBlockRecord["block_type"], content: Record<string, any>) {
  if (blockType === "image" && content.display === "full-width") return "max-w-none";
  if (blockType === "image" && content.display === "small") return "mx-auto max-w-xl";
  if (["gallery", "metric_row", "before_after", "annotated_image", "columns_2", "columns_3", "table", "embed"].includes(blockType))
    return "mx-auto max-w-5xl";
  if (blockType === "spacer") return "max-w-none";
  return "mx-auto max-w-3xl";
}

type BlockType = ProjectBlockRecord["block_type"];

const HEADING_TYPES: BlockType[] = ["heading1", "heading2", "heading3"];
const VISUAL_TYPES: BlockType[] = [
  "image",
  "gallery",
  "before_after",
  "annotated_image",
  "video",
  "embed",
  "metric_row",
];

export function spacingClass(
  blockType: BlockType,
  index: number,
  prevType: BlockType | null = null,
) {
  // First block — no top margin
  if (index === 0) return "";

  // After a divider, everything is already spaced — keep gaps modest
  if (prevType === "divider") {
    if (blockType === "heading1") return "mt-12";
    if (blockType === "heading2") return "mt-10";
    if (blockType === "heading3") return "mt-8";
    return "mt-8";
  }

  // After a heading, the next block hugs the heading (typography-style)
  if (prevType === "heading1") {
    if (HEADING_TYPES.includes(blockType)) return "mt-12"; // h1 → h2 still some break
    if (VISUAL_TYPES.includes(blockType)) return "mt-8";
    return "mt-6";
  }
  if (prevType === "heading2") {
    if (HEADING_TYPES.includes(blockType)) return "mt-10";
    if (VISUAL_TYPES.includes(blockType)) return "mt-6";
    return "mt-4";
  }
  if (prevType === "heading3") {
    if (VISUAL_TYPES.includes(blockType)) return "mt-5";
    return "mt-3";
  }

  // Big section breaks (heading or divider following content)
  if (blockType === "heading1") return "mt-40";
  if (blockType === "divider") return "mt-32";
  if (blockType === "heading2") return "mt-24";
  if (blockType === "heading3") return "mt-16";

  // Visual content gets a bit more room
  if (VISUAL_TYPES.includes(blockType)) return "mt-12";

  // Default content rhythm (text → text, list → text, etc.)
  return "mt-8";
}

async function CodeMarkup({ code, language }: { code: string; language: string }) {
  const html = await codeToHtml(code || "", {
    lang: language || "text",
    theme: "github-dark",
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function BlockRenderer({
  block,
  index = 0,
  prevType = null,
}: {
  block: ProjectBlockRecord;
  index?: number;
  prevType?: ProjectBlockRecord["block_type"] | null;
}) {
  const content = block.content as Record<string, any>;

  return (
    <section className={cn("w-full", widthClass(block.block_type, content), spacingClass(block.block_type, index, prevType))}>
      {block.block_type === "text" && (
        <div
          className="prose-block portfolio-copy text-[1.05rem]"
          dangerouslySetInnerHTML={{ __html: content.html || "" }}
        />
      )}
      {block.block_type === "heading1" && (
        <h1 className="font-display text-5xl leading-tight md:text-6xl">{content.text}</h1>
      )}
      {block.block_type === "heading2" && (
        <h2 className="font-display text-4xl leading-tight md:text-5xl">{content.text}</h2>
      )}
      {block.block_type === "heading3" && (
        <h3 className="font-display text-3xl leading-tight md:text-4xl">{content.text}</h3>
      )}
      {block.block_type === "quote" && (
        <blockquote className="border-l-2 border-primary pl-6">
          <p className="font-display text-2xl italic leading-relaxed">{content.text}</p>
          {content.attribution && <footer className="mt-4 text-sm text-muted-foreground">{content.attribution}</footer>}
        </blockquote>
      )}
      {block.block_type === "image" && content.url && (
        <figure className="space-y-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <Image src={content.url} alt={content.alt || ""} fill className="object-cover" />
          </div>
          {content.caption && <figcaption className="text-center text-sm text-muted-foreground">{content.caption}</figcaption>}
        </figure>
      )}
      {block.block_type === "gallery" && content.layout === "carousel" && (
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {(content.images || []).filter((i: any) => i.url).map((image: any, index: number) => (
            <figure key={index} className="w-[80%] flex-none snap-center space-y-2 md:w-[45%]">
              <div className="editorial-panel relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={image.url} alt={image.alt || ""} fill className="object-cover" />
              </div>
              {image.caption && <figcaption className="text-sm text-muted-foreground">{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {block.block_type === "gallery" && content.layout === "masonry" && (
        <div style={{ columns: content.columns || 3, columnGap: "1rem" }}>
          {(content.images || []).filter((i: any) => i.url).map((image: any, index: number) => (
            <figure key={index} className="mb-4 space-y-2" style={{ breakInside: "avoid" }}>
              <div className="editorial-panel relative overflow-hidden rounded-2xl">
                <Image src={image.url} alt={image.alt || ""} width={800} height={600} className="h-auto w-full object-cover" />
              </div>
              {image.caption && <figcaption className="text-sm text-muted-foreground">{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {block.block_type === "gallery" && content.layout !== "carousel" && content.layout !== "masonry" && (
        <div className={cn("grid gap-4",
          content.columns === 2 ? "md:grid-cols-2" :
          content.columns === 4 ? "md:grid-cols-2 xl:grid-cols-4" :
          "md:grid-cols-2 xl:grid-cols-3"
        )}>
          {(content.images || []).filter((i: any) => i.url).map((image: any, index: number) => (
            <figure key={index} className="space-y-2">
              <div className="editorial-panel relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={image.url} alt={image.alt || ""} fill className="object-cover" />
              </div>
              {image.caption && <figcaption className="text-sm text-muted-foreground">{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {block.block_type === "callout" && (
        <div className={cn(
          "rounded-2xl p-8 editorial-panel",
          content.style === "subtle" ? "" :
          content.style === "accent" ? "border-t-2 border-primary" :
          "border-l-2 border-primary"
        )}>
          <p className="font-display text-4xl">{content.value}</p>
          <p className={cn("mt-2 text-lg", content.style === "subtle" ? "text-muted-foreground" : "portfolio-meta")}>{content.label}</p>
          {content.description && <p className="mt-4 text-sm text-muted-foreground">{content.description}</p>}
        </div>
      )}
      {block.block_type === "metric_row" && (
        <div className="grid gap-4 md:grid-cols-3">
          {(content.metrics || []).map((metric: any, index: number) => (
            <div key={index} className="editorial-panel rounded-2xl p-6">
              <p className="font-display text-4xl">
                {metric.prefix}
                {metric.value}
                {metric.suffix}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
      {block.block_type === "before_after" && content.mode === "slider" && (
        <BeforeAfterSlider
          beforeUrl={content.before?.url}
          beforeAlt={content.before?.alt}
          afterUrl={content.after?.url}
          afterAlt={content.after?.alt}
          caption={content.caption}
        />
      )}
      {block.block_type === "before_after" && content.mode !== "slider" && (
        <div className="grid gap-4 md:grid-cols-2">
          {(["before", "after"] as const).map((side) => (
            <figure key={side} className="space-y-3">
              <Badge variant="secondary" className="rounded-full border border-white/8 bg-white/[0.04] text-[#d9d1c4]">{side === "before" ? "Before" : "After"}</Badge>
              <div className="editorial-panel relative min-h-80 overflow-hidden rounded-2xl">
                {content[side]?.url && (
                  <Image src={content[side].url} alt={content[side].alt || ""} fill className="object-cover" />
                )}
              </div>
              {content[side]?.caption && <figcaption className="text-sm text-muted-foreground">{content[side].caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {block.block_type === "annotated_image" && (
        <div className="space-y-4">
          {content.url && (
            <div className="editorial-panel relative min-h-[32rem] overflow-hidden rounded-2xl">
              <Image src={content.url} alt={content.alt || ""} fill className="object-cover" />
              {(content.annotations || []).map((point: any, index: number) => (
                <button
                  key={point.id}
                  type="button"
                  title={`${point.label}${point.description ? `: ${point.description}` : ""}`}
                  className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  style={{ left: `${point.x}%`, top: `${point.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            {(content.annotations || []).map((point: any, index: number) => (
              <div key={point.id} className="editorial-panel rounded-xl p-4">
                <p className="font-medium">
                  {index + 1}. {point.label}
                </p>
                {point.description && <p className="mt-2 text-sm text-muted-foreground">{point.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      {block.block_type === "video" && content.url && (
        <div className="space-y-4">
          <div className="editorial-panel aspect-video overflow-hidden rounded-2xl">
            <iframe
              className="h-full w-full"
              src={getEmbedUrl(content.url, content.provider)}
              title={content.caption || "Video embed"}
              loading="lazy"
              allowFullScreen
            />
          </div>
          {content.caption && <p className="text-sm text-muted-foreground">{content.caption}</p>}
        </div>
      )}
      {(block.block_type === "columns_2" || block.block_type === "columns_3") && (
        <div className={cn("grid gap-6", block.block_type === "columns_3" ? "md:grid-cols-3" : "md:grid-cols-2")}>
          {(content.columns || []).map((column: any, index: number) => (
            <div key={index} className="editorial-panel space-y-4 rounded-2xl p-5">
              {(column.blocks || []).map((nestedBlock: any) => (
                <div key={nestedBlock.id} className="space-y-2">
                  {nestedBlock.block_type === "text" && (
                    <div dangerouslySetInnerHTML={{ __html: nestedBlock.content.html || "" }} />
                  )}
                  {nestedBlock.block_type === "heading2" || nestedBlock.block_type === "heading3" ? (
                    <h4 className="font-display text-2xl">{nestedBlock.content.text}</h4>
                  ) : null}
                  {nestedBlock.block_type === "image" && nestedBlock.content.url ? (
                    <div className="relative min-h-48 overflow-hidden rounded-xl">
                      <Image src={nestedBlock.content.url} alt={nestedBlock.content.alt || ""} fill className="object-cover" />
                    </div>
                  ) : null}
                  {nestedBlock.block_type === "callout" && (
                    <div className="editorial-panel rounded-xl p-4">
                      <p className="font-display text-3xl">{nestedBlock.content.value}</p>
                      <p className="text-sm text-muted-foreground">{nestedBlock.content.label}</p>
                    </div>
                  )}
                  {nestedBlock.block_type === "list" && (
                    nestedBlock.content.list_type === "numbered" ? (
                      <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                        {(nestedBlock.content.items || []).filter((item: any) => item.text).map((item: any) => (
                          <li key={item.id}>{item.text}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {(nestedBlock.content.items || []).filter((item: any) => item.text).map((item: any) => (
                          <li key={item.id}>{item.text}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {block.block_type === "divider" && (
        <hr className={cn("border-white/10", content.style === "dotted" && "border-dashed", content.style === "thick" && "border-2")} />
      )}
      {block.block_type === "spacer" && (
        <div
          style={{
            height:
              content.size === "small"
                ? 24
                : content.size === "medium"
                  ? 48
                  : content.size === "large"
                    ? 80
                    : 120,
          }}
        />
      )}
      {block.block_type === "list" && (
        <div className="prose-block portfolio-copy text-[1.05rem]">
          {content.list_type === "numbered" ? (
            <ol className="list-decimal space-y-2 pl-6">
              {(content.items || []).filter((item: any) => item.text).map((item: any) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ol>
          ) : (
            <ul className="list-disc space-y-2 pl-6">
              {(content.items || []).filter((item: any) => item.text).map((item: any) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {block.block_type === "toggle" && content.title && (
        <details className="editorial-panel overflow-hidden rounded-2xl">
          <summary className="flex cursor-pointer items-center gap-3 p-6 font-display text-xl [&::marker]:hidden [&::-webkit-details-marker]:hidden">
            <svg className="h-5 w-5 shrink-0 transition-transform [[open]>&]:rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            {content.title}
          </summary>
          <div
            className="prose-block portfolio-copy border-t border-white/8 px-6 pb-6 pt-4 text-[1.05rem]"
            dangerouslySetInnerHTML={{ __html: content.content_html || "" }}
          />
        </details>
      )}
      {block.block_type === "table" && (content.rows || []).length > 0 && (
        <div className="editorial-panel overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {content.has_header !== false && (content.rows || []).length > 0 && (
                <thead>
                  <tr className="border-b border-white/10">
                    {content.rows[0].map((cell: string, i: number) => (
                      <th key={i} className="px-4 py-3 text-left font-medium">{cell}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {(content.rows || []).slice(content.has_header !== false ? 1 : 0).map((row: string[], ri: number) => (
                  <tr key={ri} className="border-b border-white/5 last:border-b-0">
                    {row.map((cell: string, ci: number) => (
                      <td key={ci} className="px-4 py-3 text-muted-foreground">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {block.block_type === "embed" && content.url && (
        <div className="space-y-4">
          <div className={cn(
            "editorial-panel overflow-hidden rounded-2xl",
            content.aspect_ratio === "square" && "aspect-square",
            content.aspect_ratio === "tall" && "aspect-[9/16]",
            content.aspect_ratio !== "square" && content.aspect_ratio !== "tall" && "aspect-video",
          )}>
            <iframe
              className="h-full w-full"
              src={content.url}
              title={content.caption || "Embed"}
              loading="lazy"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
          {content.caption && <p className="text-sm text-muted-foreground">{content.caption}</p>}
        </div>
      )}
      {block.block_type === "file" && content.file_url && (
        <a
          href={content.file_url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-panel flex items-center gap-4 rounded-2xl p-6 transition-colors hover:border-primary/30"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{content.file_name || "Download"}</p>
            {content.description && <p className="mt-1 text-sm text-muted-foreground">{content.description}</p>}
          </div>
          {content.file_size && (
            <span className="text-sm text-muted-foreground">{content.file_size}</span>
          )}
        </a>
      )}
      {block.block_type === "code" && (
        <div className="editorial-panel overflow-hidden rounded-2xl bg-[#0d1117]">
          <CodeMarkup code={content.code || ""} language={content.language || "text"} />
          {content.caption && <p className="border-t border-white/10 px-4 py-3 text-sm text-muted-foreground">{content.caption}</p>}
        </div>
      )}
    </section>
  );
}
