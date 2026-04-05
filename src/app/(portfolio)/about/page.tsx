import Image from "next/image";

import { BlockRenderer } from "@/components/portfolio/blocks/block-renderer";
import { getAboutBlocks, getAboutSettings } from "@/lib/queries/about";

export default async function AboutPage() {
  const [about, blocks] = await Promise.all([getAboutSettings(), getAboutBlocks()]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <header className="editorial-panel grid gap-8 rounded-[40px] p-8 md:grid-cols-[0.7fr_1.3fr] md:p-12">
        <div className="relative aspect-square overflow-hidden rounded-[32px] border border-white/10">
          {about.profile_image_url ? (
            <Image src={about.profile_image_url} alt={about.headline} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Profile image
            </div>
          )}
        </div>
        <div className="space-y-5">
          <div className="portfolio-rule">
          <p className="portfolio-kicker">About</p>
          </div>
          <h1 className="font-display text-5xl md:text-6xl">{about.headline}</h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{about.subheadline}</p>
        </div>
      </header>
      <div className="mt-16 space-y-14">
        {await Promise.all(blocks.map(async (block) => <BlockRenderer key={block.id} block={block} />))}
      </div>
    </div>
  );
}
