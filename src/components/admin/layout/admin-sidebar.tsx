"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  Images,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/admin/projects", label: "Projects", icon: LayoutDashboard },
  { href: "/admin/collections", label: "Collections", icon: Images },
  { href: "/admin/about", label: "About Page", icon: User },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-card p-5 lg:flex lg:flex-col">
      <Link href="/admin/projects" className="mb-8 px-2">
        <p className="font-semibold">Shashi Admin</p>
        <p className="text-xs text-muted-foreground">Portfolio</p>
      </Link>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors",
                active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-border p-4 text-sm text-muted-foreground">
        <Link href="/" className="inline-flex items-center gap-2 text-primary">
          View site
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
