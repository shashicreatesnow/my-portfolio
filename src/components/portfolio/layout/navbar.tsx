"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

export function Navbar({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled && "border-b border-white/5 bg-background/80 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8",
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_22px_var(--portfolio-glow)]" />
          <span className="font-display text-[1.75rem] tracking-tight">Shashi Pratap Singh</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/4 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open && (
        <div className="border-b border-white/5 bg-background/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/4 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
