import { CollectionGrid } from "@/components/portfolio/lab/collection-grid";
import { getCollections } from "@/lib/queries/collections";

export default async function LabPage() {
  const collections = await getCollections();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <header className="editorial-panel mb-12 rounded-[36px] px-6 py-10 md:px-8">
        <div className="portfolio-rule space-y-4">
        <p className="portfolio-kicker">Lab</p>
        <h1 className="font-display text-5xl md:text-6xl">Explorations and experiments</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Personal studies, visual experiments, and side explorations that inform the larger body of work.
        </p>
        </div>
      </header>
      <CollectionGrid items={collections} />
    </div>
  );
}
