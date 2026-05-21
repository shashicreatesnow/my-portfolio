"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export function Navbar({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-[color:var(--rule)]"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 py-4 md:px-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em]"
          style={{ color: "var(--ink)" }}
        >
          <span
            className="relative inline-block h-[7px] w-[7px] translate-y-[0.5px] rounded-full transition-transform duration-300 group-hover:scale-125"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-[brand-pulse_1.4s_ease-out_infinite]"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </span>
          <span className="relative">
            Shashi
            <span
              className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </span>
        </Link>

        <nav className="hidden items-center md:flex">
          {items.map((item, idx) => {
            const active = isActive(item.href);
            return (
              <span key={item.href} className="inline-flex items-center leading-none">
                {idx > 0 && (
                  <span className="mx-[18px] leading-none" style={{ color: "var(--rule)" }}>
                    ·
                  </span>
                )}
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "nav-link relative inline-block py-1 text-[13px] tracking-[0.01em]",
                    active && "is-active",
                  )}
                >
                  {item.label}
                  <span className="underline-bar" aria-hidden />
                </Link>
              </span>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 md:hidden"
          style={{ color: "var(--ink-muted)" }}
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <span className="relative inline-flex h-5 w-5 items-center justify-center">
            <Menu
              className={cn(
                "absolute h-5 w-5 transition-all duration-300",
                open ? "rotate-45 opacity-0" : "rotate-0 opacity-100",
              )}
            />
            <X
              className={cn(
                "absolute h-5 w-5 transition-all duration-300",
                open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0",
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          className="animate-[slide-down_260ms_ease-out] border-t border-dashed border-[color:var(--rule)] px-5 py-4 md:hidden"
          style={{ backgroundColor: "var(--paper)" }}
        >
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-mobile-link rounded-md px-3 py-3 text-sm"
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
