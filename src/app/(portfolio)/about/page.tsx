import Image from "next/image";

import { BlockRenderer } from "@/components/portfolio/blocks/block-renderer";
import { getAboutBlocks, getAboutSettings } from "@/lib/queries/about";

export default async function AboutPage() {
  const [about, blocks] = await Promise.all([getAboutSettings(), getAboutBlocks()]);

  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 pb-24 md:px-8">
      <header className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/6">
          {about.profile_image_url ? (
            <Image src={about.profile_image_url} alt={about.headline} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Profile image
            </div>
          )}
        </div>
        <div className="space-y-5">
          <p className="portfolio-kicker">About</p>
          <h1 className="font-display text-4xl md:text-5xl">{about.headline}</h1>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">{about.subheadline}</p>
        </div>
      </header>
      <div className="mt-20 space-y-20">
        {await Promise.all(blocks.map(async (block) => <BlockRenderer key={block.id} block={block} />))}
      </div>
    </div>
  );
}
