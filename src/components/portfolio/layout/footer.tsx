import Link from "next/link";
import { Globe, LinkIcon, Mail } from "lucide-react";

export function Footer({
  contact,
}: {
  contact: {
    email: string;
    linkedin: string;
    behance: string;
  };
}) {
  return (
    <footer className="relative z-[3] border-t border-dashed border-[color:var(--rule)]">
      <div
        className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-between gap-3 text-[12px] tracking-[0.02em] text-[color:var(--ink-soft)] md:flex-row md:gap-0"
        style={{ padding: "20px clamp(20px,4vw,40px) 28px" }}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <Link
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--ink)]"
          >
            <Mail className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:text-[color:var(--accent)]" />
            Email
          </Link>
          <Link
            href={contact.linkedin}
            target="_blank"
            className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--ink)]"
          >
            <LinkIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:text-[color:var(--accent)]" />
            LinkedIn
          </Link>
          <Link
            href={contact.behance}
            target="_blank"
            className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--ink)]"
          >
            <Globe className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:text-[color:var(--accent)]" />
            Behance
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span>Bengaluru · {new Date().getFullYear()}</span>
          <span className="font-display italic text-[color:var(--ink-muted)]">made by hand, mostly</span>
        </div>
      </div>
    </footer>
  );
}
