"use client";

import { usePathname } from "next/navigation";

import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { AdminTopbar } from "@/components/admin/layout/admin-topbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar pathname={pathname} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
