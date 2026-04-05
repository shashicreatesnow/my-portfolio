import { Footer } from "@/components/portfolio/layout/footer";
import { Navbar } from "@/components/portfolio/layout/navbar";
import { PageTransition } from "@/components/portfolio/layout/page-transition";
import { getSettings } from "@/lib/queries/settings";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { CursorProvider } from "@/providers/cursor-provider";
import { CustomCursor } from "@/components/portfolio/layout/custom-cursor";
import { AuroraBackground } from "@/components/portfolio/layout/aurora-background";
import { NoiseOverlay } from "@/components/portfolio/layout/noise-overlay";

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <SmoothScrollProvider>
      <CursorProvider>
        <div className="dark portfolio-shell bg-background min-h-screen text-foreground">
          <AuroraBackground />
          <NoiseOverlay />
          <CustomCursor />
          <Navbar items={settings.navigation.items} />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer contact={settings.contact} />
        </div>
      </CursorProvider>
    </SmoothScrollProvider>
  );
}
