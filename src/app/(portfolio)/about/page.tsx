import Image from "next/image";

import { BlockRenderer } from "@/components/portfolio/blocks/block-renderer";
import { getAboutBlocks, getAboutSettings } from "@/lib/queries/about";

export default async function AboutPage() {
  const [about, blocks] = await Promise.all([getAboutSettings(), getAboutBlocks()]);

  return (
    <div
      className="relative z-[3] mx-auto max-w-[1080px]"
      style={{ padding: "clamp(40px,5vw,72px) clamp(20px,4vw,40px) clamp(72px,8vw,104px)" }}
    >
      <header className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-[color:var(--paper-2)]">
          {about.profile_image_url ? (
            <Image src={about.profile_image_url} alt={about.headline} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[color:var(--ink-soft)]">
              Profile image
            </div>
          )}
        </div>
        <div className="space-y-5">
          <p className="portfolio-kicker">About</p>
          <h1
            className="font-medium text-[color:var(--ink)]"
            style={{ fontSize: "clamp(36px,5vw,56px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
          >
            {about.headline}
          </h1>
        </div>
      </header>
      <div className="mt-20 space-y-20">
        {await Promise.all(blocks.map(async (block) => <BlockRenderer key={block.id} block={block} />))}
      </div>
    </div>
  );
}
