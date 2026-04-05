import { CollectionManager } from "@/components/admin/collections/collection-manager";
import { getCollections } from "@/lib/queries/collections";

export default async function AdminCollectionsPage() {
  const collections = await getCollections(true);
  return <CollectionManager collections={collections} />;
}
