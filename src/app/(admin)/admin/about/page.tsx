import { AboutEditor } from "@/components/admin/about/about-editor";
import { getAboutBlocks } from "@/lib/queries/about";

export default async function AdminAboutPage() {
  const blocks = await getAboutBlocks();
  return <AboutEditor blocks={blocks} />;
}
