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
    <footer className="mt-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4" />
              Email
            </Link>
            <Link href={contact.linkedin} target="_blank" className="inline-flex items-center gap-2 hover:text-foreground">
              <LinkIcon className="h-4 w-4" />
              LinkedIn
            </Link>
            <Link href={contact.behance} target="_blank" className="inline-flex items-center gap-2 hover:text-foreground">
              <Globe className="h-4 w-4" />
              Behance
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Shashi Pratap Singh</p>
        </div>
      </div>
    </footer>
  );
}
