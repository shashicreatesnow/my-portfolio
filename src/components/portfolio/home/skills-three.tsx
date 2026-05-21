import type { SkillRecord } from "@/lib/types/database";

type SkillIcon = (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;

const ProductIcon: SkillIcon = (props) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="7" y="10" width="26" height="20" rx="3" strokeDasharray="3 2.5" />
    <line x1="7" y1="17" x2="33" y2="17" strokeDasharray="3 2.5" />
    <circle cx="12" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
    <path d="M14 24 l4 -4 4 3 6 -6" strokeDasharray="3 2.5" />
  </svg>
);

const AiIcon: SkillIcon = (props) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="20" cy="20" r="13" strokeDasharray="3 2.5" />
    <path d="M20 7 q 9 13 0 26" strokeDasharray="3 2.5" />
    <path d="M7 20 h 26" strokeDasharray="3 2.5" opacity={0.6} />
  </svg>
);

const BrandIcon: SkillIcon = (props) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 30 L 18 16 L 24 24 L 32 10" strokeDasharray="3 2.5" />
    <circle cx="32" cy="10" r="2" />
    <path d="M8 33 h 26" strokeDasharray="3 2.5" opacity={0.5} />
  </svg>
);

const iconMap: Record<string, SkillIcon> = {
  product: ProductIcon,
  ai: AiIcon,
  brand: BrandIcon,
};

interface SkillsThreeProps {
  skills: SkillRecord[];
}

export function SkillsThree({ skills }: SkillsThreeProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section
      className="relative z-[3] mx-auto grid max-w-[1080px] border-t border-dashed border-[color:var(--rule)]"
      style={{
        padding: "clamp(56px, 6vw, 80px) clamp(20px, 4vw, 40px) clamp(72px, 8vw, 104px)",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "clamp(32px, 4vw, 56px)",
      }}
    >
      {skills.map((skill, index) => {
        const Icon = iconMap[skill.icon_key ?? ""] ?? ProductIcon;
        return (
          <div
            key={skill.id}
            className="group md:[&]:max-w-none [&]:max-w-[32ch]"
          >
            <Icon
              className="h-[38px] w-[38px] text-[color:var(--ink-muted)] transition-all duration-500 ease-out group-hover:rotate-[6deg] group-hover:scale-110 group-hover:text-[color:var(--accent)]"
              style={{
                transitionDelay: `${index * 40}ms`,
              }}
            />
            <h3 className="mt-4 mb-1.5 text-[14px] font-medium tracking-[0.01em] text-[color:var(--ink)] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
              {skill.title}
            </h3>
            {skill.description ? (
              <p className="text-[13.5px] leading-[1.65] text-[color:var(--ink-muted)] max-w-[32ch]">
                {skill.description}
              </p>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
