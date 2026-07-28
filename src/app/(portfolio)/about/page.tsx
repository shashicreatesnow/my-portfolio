import { Globe, Link2, Mail, Phone } from "lucide-react";
import Image from "next/image";

import { BlockRenderer } from "@/components/portfolio/blocks/block-renderer";
import { getAboutBlocks, getAboutSettings } from "@/lib/queries/about";
import { getSettings } from "@/lib/queries/settings";

export default async function AboutPage() {
  const [about, blocks, settings] = await Promise.all([
    getAboutSettings(),
    getAboutBlocks(),
    getSettings(),
  ]);
  const contact = settings.contact as typeof settings.contact & { phone?: string };

  const contactItems = [
    contact.phone
      ? { icon: Phone, label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` }
      : null,
    contact.email
      ? { icon: Mail, label: contact.email, href: `mailto:${contact.email}` }
      : null,
    contact.linkedin
      ? { icon: Link2, label: "LinkedIn", href: contact.linkedin }
      : null,
    contact.behance
      ? { icon: Globe, label: "Behance", href: contact.behance }
      : null,
  ].filter(Boolean) as { icon: typeof Phone; label: string; href: string }[];

  return (
    <div
      className="relative z-[3] mx-auto max-w-[1080px]"
      style={{ padding: "clamp(40px,5vw,72px) clamp(20px,4vw,40px) clamp(72px,8vw,104px)" }}
    >
      <header className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-[color:var(--paper-2)]">
          {about.profile_image_url ? (
            <Image src={about.profile_image_url} alt={about.headline} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[color:var(--ink-soft)]">
              Profile image
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="portfolio-kicker">About</p>
            <h1
              className="font-medium text-[color:var(--ink)]"
              style={{ fontSize: "clamp(36px,5vw,56px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
            >
              {about.headline}
            </h1>
            {about.subheadline ? (
              <p
                className="font-display italic text-[color:var(--accent)]"
                style={{ fontSize: "clamp(19px,2.2vw,24px)", lineHeight: 1.35 }}
              >
                {about.subheadline}
              </p>
            ) : null}
          </div>

          {contactItems.length > 0 ? (
            <ul className="space-y-3 border-t border-dashed border-[color:var(--rule)] pt-6">
              {contactItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group inline-flex items-center gap-3 text-[15px] text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink)]"
                  >
                    <item.icon className="h-4 w-4 text-[color:var(--ink-soft)] transition group-hover:text-[color:var(--accent)]" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>
      <div className="mt-20 space-y-20">
        {await Promise.all(blocks.map(async (block) => <BlockRenderer key={block.id} block={block} />))}
      </div>
    </div>
  );
}
