import { CollectionGrid } from "@/components/portfolio/lab/collection-grid";
import { getCollections } from "@/lib/queries/collections";

export default async function LabPage() {
  const collections = await getCollections();

  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 pb-24 md:px-8">
      <header className="mb-16 max-w-2xl space-y-4">
        <p className="portfolio-kicker">Lab</p>
        <h1 className="font-display text-4xl md:text-5xl">Explorations and experiments</h1>
        <p className="text-base leading-8 text-muted-foreground">
          Personal studies, visual experiments, and side explorations that inform the larger body of work.
        </p>
      </header>
      <CollectionGrid items={collections} />
    </div>
  );
}
