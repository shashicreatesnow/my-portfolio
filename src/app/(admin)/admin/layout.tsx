import { AdminShell } from "@/components/admin/layout/admin-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="light"><AdminShell>{children}</AdminShell></div>;
}
