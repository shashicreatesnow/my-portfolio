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

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {clients.map((client) => {
          const inner = (
            <span className="group inline-flex items-center gap-3">
              {client.logo_url ? (
                <Image
                  src={client.logo_url}
                  alt={client.name}
                  width={140}
                  height={40}
                  className="h-8 w-auto transition group-hover:scale-[1.04]"
                />
              ) : null}
              <span className="text-[15px] font-medium text-[color:var(--ink-muted)] transition group-hover:text-[color:var(--ink)]">
                {client.name}
              </span>
            </span>
          );

          return client.website_url ? (
            <a
              key={client.id}
              href={client.website_url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${client.name}`}
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
