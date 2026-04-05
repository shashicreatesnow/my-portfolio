import { SettingsTabs } from "@/components/admin/settings/settings-tabs";
import { getSettings } from "@/lib/queries/settings";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return <SettingsTabs settings={settings} />;
}
