import { Footer } from "@/components/portfolio/layout/footer";
import { Navbar } from "@/components/portfolio/layout/navbar";
import { PageTransition } from "@/components/portfolio/layout/page-transition";
import { getSettings } from "@/lib/queries/settings";

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="portfolio-shell flex min-h-screen flex-col bg-background text-foreground">
      <Navbar items={settings.navigation.items} />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <Footer contact={settings.contact} />
    </div>
  );
}
