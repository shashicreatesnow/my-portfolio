import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";

import { signOutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

const titles: Record<string, string> = {
  "/admin/projects": "Projects",
  "/admin/collections": "Collections",
  "/admin/about": "About Page",
  "/admin/settings": "Settings",
};

export function AdminTopbar({ pathname }: { pathname: string }) {
  const title =
    Object.entries(titles).find(([key]) => pathname.startsWith(key))?.[1] ||
    "Admin";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-sm text-muted-foreground">Private workspace</p>
        <h1 className="font-display text-3xl text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button asChild variant="outline">
          <Link href="/" target="_blank">
            View site
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
        <form action={signOutAction}>
          <Button variant="ghost">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}
