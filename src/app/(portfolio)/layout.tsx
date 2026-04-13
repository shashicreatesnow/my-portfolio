import { Footer } from "@/components/portfolio/layout/footer";
import { Navbar } from "@/components/portfolio/layout/navbar";
import { NoiseOverlay } from "@/components/portfolio/layout/noise-overlay";
import { PageTransition } from "@/components/portfolio/layout/page-transition";
import { getSettings } from "@/lib/queries/settings";

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="dark portfolio-shell min-h-screen bg-background text-foreground">
      <NoiseOverlay />
      <Navbar items={settings.navigation.items} />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer contact={settings.contact} />
    </div>
  );
}
