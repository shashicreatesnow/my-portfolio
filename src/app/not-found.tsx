import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-5 text-center text-foreground">
      <p className="text-sm uppercase tracking-[0.4em] text-primary">404</p>
      <h1 className="font-display text-6xl">Page not found</h1>
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
