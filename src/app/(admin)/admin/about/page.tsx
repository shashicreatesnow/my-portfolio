import { AboutEditor } from "@/components/admin/about/about-editor";
import { AboutProfileForm } from "@/components/admin/about/about-profile-form";
import { getAboutBlocks } from "@/lib/queries/about";
import { getSettings } from "@/lib/queries/settings";

export default async function AdminAboutPage() {
  const [settings, blocks] = await Promise.all([getSettings(), getAboutBlocks()]);

  return (
    <div className="space-y-8">
      <AboutProfileForm settings={settings} />
      <div>
        <h2 className="mb-1 text-lg font-semibold">Page content</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Blocks shown below the profile header — text, images, galleries, quotes, stats.
        </p>
        <AboutEditor blocks={blocks} />
      </div>
    </div>
  );
}
