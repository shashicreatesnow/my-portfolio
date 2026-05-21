import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-5 text-center text-foreground">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">404</p>
      <h1 className="text-[44px] font-medium tracking-[-0.03em] md:text-[60px]">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you’re looking for isn’t here. Head back to the work archive or return home.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/works">View works</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
