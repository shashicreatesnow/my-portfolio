/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { codeToHtml } from "shiki";

import type { ProjectBlockRecord } from "@/lib/types/blocks";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

function widthClass(blockType: ProjectBlockRecord["block_type"], content: Record<string, any>) {
  if (blockType === "image" && content.display === "full-width") return "max-w-none";
  if (blockType === "image" && content.display === "small") return "mx-auto max-w-xl";
  if (["gallery", "metric_row", "before_after", "annotated_image", "columns_2", "columns_3"].includes(blockType))
    return "mx-auto max-w-5xl";
  if (blockType === "spacer") return "max-w-none";
  return "mx-auto max-w-3xl";
}

async function CodeMarkup({ code, language }: { code: string; language: string }) {
  const html = await codeToHtml(code || "", {
    lang: language || "text",
    theme: "github-dark",
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function BlockRenderer({ block }: { block: ProjectBlockRecord }) {
  const content = block.content as Record<string, any>;

  return (
    <section className={cn("w-full", widthClass(block.block_type, content))}>
      {block.block_type === "text" && (
        <div
          className="prose-block portfolio-copy text-[1.05rem]"
          dangerouslySetInnerHTML={{ __html: content.html || "" }}
        />
      )}
      {block.block_type === "heading2" && (
        <h2 className="font-display text-4xl leading-tight md:text-5xl">{content.text}</h2>
      )}
      {block.block_type === "heading3" && (
        <h3 className="font-display text-3xl leading-tight md:text-4xl">{content.text}</h3>
      )}
      {block.block_type === "quote" && (
        <blockquote className="editorial-panel rounded-[28px] border-l-4 border-primary p-6">
          <p className="font-display text-2xl italic leading-relaxed">{content.text}</p>
          {content.attribution && <footer className="mt-4 text-sm text-muted-foreground">{content.attribution}</footer>}
        </blockquote>
      )}
      {block.block_type === "image" && content.url && (
        <figure className="space-y-4">
          <div className="editorial-panel relative min-h-96 overflow-hidden rounded-[32px]">
            <Image src={content.url} alt={content.alt || ""} fill className="object-cover" />
          </div>
          {content.caption && <figcaption className="text-center text-sm text-muted-foreground">{content.caption}</figcaption>}
        </figure>
      )}
      {block.block_type === "gallery" && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(content.images || []).map((image: any, index: number) => (
            <figure key={index} className="space-y-2">
              <div className="editorial-panel relative aspect-[4/3] overflow-hidden rounded-[28px]">
                <Image src={image.url} alt={image.alt || ""} fill className="object-cover" />
              </div>
              {image.caption && <figcaption className="text-sm text-muted-foreground">{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {block.block_type === "callout" && (
        <div className="editorial-panel rounded-[32px] p-8">
          <p className="font-display text-5xl">{content.value}</p>
          <p className="portfolio-meta mt-2 text-xl">{content.label}</p>
          {content.description && <p className="mt-4 text-sm text-muted-foreground">{content.description}</p>}
        </div>
      )}
      {block.block_type === "metric_row" && (
        <div className="grid gap-4 md:grid-cols-3">
          {(content.metrics || []).map((metric: any, index: number) => (
            <div key={index} className="editorial-panel rounded-[28px] p-6">
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
      {block.block_type === "before_after" && (
        <div className="grid gap-4 md:grid-cols-2">
          {(["before", "after"] as const).map((side) => (
            <figure key={side} className="space-y-3">
              <Badge variant="secondary" className="rounded-full border border-white/8 bg-white/[0.04] text-[#d9d1c4]">{side === "before" ? "Before" : "After"}</Badge>
              <div className="editorial-panel relative min-h-80 overflow-hidden rounded-[28px]">
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
            <div className="editorial-panel relative min-h-[32rem] overflow-hidden rounded-[32px]">
              <Image src={content.url} alt={content.alt || ""} fill className="object-cover" />
              {(content.annotations || []).map((point: any, index: number) => (
                <button
                  key={point.id}
                  type="button"
                  title={`${point.label}${point.description ? `: ${point.description}` : ""}`}
                  className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-[0_0_24px_var(--portfolio-glow)]"
                  style={{ left: `${point.x}%`, top: `${point.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            {(content.annotations || []).map((point: any, index: number) => (
              <div key={point.id} className="editorial-panel rounded-[24px] p-4">
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
          <div className="editorial-panel aspect-video overflow-hidden rounded-[32px]">
            <iframe
              className="h-full w-full"
              src={content.url}
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
            <div key={index} className="editorial-panel space-y-4 rounded-[28px] p-5">
              {(column.blocks || []).map((nestedBlock: any) => (
                <div key={nestedBlock.id} className="space-y-2">
                  {nestedBlock.block_type === "text" && (
                    <div dangerouslySetInnerHTML={{ __html: nestedBlock.content.html || "" }} />
                  )}
                  {nestedBlock.block_type === "heading2" || nestedBlock.block_type === "heading3" ? (
                    <h4 className="font-display text-2xl">{nestedBlock.content.text}</h4>
                  ) : null}
                  {nestedBlock.block_type === "image" && nestedBlock.content.url ? (
                    <div className="relative min-h-48 overflow-hidden rounded-[20px]">
                      <Image src={nestedBlock.content.url} alt={nestedBlock.content.alt || ""} fill className="object-cover" />
                    </div>
                  ) : null}
                  {nestedBlock.block_type === "callout" && (
                    <div className="signal-accent rounded-[20px] p-4">
                      <p className="font-display text-3xl">{nestedBlock.content.value}</p>
                      <p className="text-sm text-muted-foreground">{nestedBlock.content.label}</p>
                    </div>
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
      {block.block_type === "code" && (
        <div className="editorial-panel overflow-hidden rounded-[28px] bg-[#0d1117]">
          <CodeMarkup code={content.code || ""} language={content.language || "text"} />
          {content.caption && <p className="border-t border-white/10 px-4 py-3 text-sm text-muted-foreground">{content.caption}</p>}
        </div>
      )}
    </section>
  );
}
