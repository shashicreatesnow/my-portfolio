import { CollectionGrid } from "@/components/portfolio/lab/collection-grid";
import { getCollections } from "@/lib/queries/collections";

export default async function LabPage() {
  const collections = await getCollections();

  return (
    <div
      className="relative z-[3] mx-auto max-w-[1080px]"
      style={{ padding: "clamp(40px,5vw,72px) clamp(20px,4vw,40px) clamp(72px,8vw,104px)" }}
    >
      <header className="mb-12 max-w-[44ch] space-y-4">
        <p className="portfolio-kicker">Lab</p>
        <h1
          className="font-medium text-[color:var(--ink)]"
          style={{ fontSize: "clamp(36px,5vw,56px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
        >
          Explorations and{" "}
          <span className="font-display italic font-normal text-[color:var(--accent)]">experiments</span>
        </h1>
      </header>
      <CollectionGrid items={collections} />
    </div>
  );
}
