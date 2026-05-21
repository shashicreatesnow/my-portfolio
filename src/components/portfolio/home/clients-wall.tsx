import Image from "next/image";

import type { ClientRecord } from "@/lib/types/database";

interface ClientsWallProps {
  clients: ClientRecord[];
  heading?: string;
}

export function ClientsWall({ clients, heading = "Worked with" }: ClientsWallProps) {
  if (clients.length === 0) {
    return null;
  }

  return (
    <section
      className="relative z-[3] mx-auto max-w-[1080px] border-t border-dashed border-[color:var(--rule)]"
      style={{ padding: "clamp(56px, 6vw, 80px) clamp(20px, 4vw, 40px)" }}
    >
      <div className="text-center">
        <span className="portfolio-kicker">{heading}</span>
      </div>

      <div className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
        {clients.map((client) => {
          const inner = client.logo_url ? (
            <Image
              src={client.logo_url}
              alt={client.name}
              width={140}
              height={48}
              className="h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="font-display text-[18px] italic text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink)]">
              {client.name}
            </span>
          );

          return client.website_url ? (
            <a
              key={client.id}
              href={client.website_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center"
            >
              {inner}
            </a>
          ) : (
            <div key={client.id} className="flex items-center justify-center">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
