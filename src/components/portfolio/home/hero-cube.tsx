import Link from "next/link";

import {
  ArrowSketch,
  DotsSketch,
  FlowSketch,
  PlusSketch,
  SparklesSketch,
  UnderlineSketch,
} from "@/components/portfolio/sketches";

import styles from "./hero-cube.module.css";

interface HeroCubeProps {
  eyebrow?: string;
  ledeText?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function HeroCube({
  eyebrow = "Product & Brand Designer",
  ledeText = "Anyone can design a screen. I design the system and the agent that runs it.",
  primaryHref = "/works",
  primaryLabel = "enter the work",
  secondaryHref = "/about",
  secondaryLabel = "say hello",
}: HeroCubeProps) {
  return (
    <section className="relative">
      {/* ambient sketches anchored to corners */}
      <DotsSketch
        className="absolute hidden md:block"
        style={{
          top: "96px",
          left: "clamp(20px, 4vw, 56px)",
          width: "100px",
          color: "var(--accent)",
          opacity: 0.5,
          transform: "rotate(-4deg)",
          zIndex: 2,
        }}
      />
      <FlowSketch
        className="absolute hidden md:block"
        style={{
          top: "80px",
          right: "clamp(20px, 4vw, 56px)",
          width: "200px",
          color: "var(--ink-muted)",
          opacity: 0.65,
          transform: "rotate(-2deg)",
          zIndex: 2,
        }}
      />
      <ArrowSketch
        className="absolute hidden md:block"
        style={{
          top: "48%",
          right: "clamp(20px, 4vw, 64px)",
          width: "110px",
          color: "var(--ink-muted)",
          opacity: 0.65,
          transform: "rotate(6deg)",
          zIndex: 2,
        }}
      />
      <PlusSketch
        className="absolute hidden md:block"
        style={{
          top: "22%",
          left: "18%",
          width: "14px",
          color: "var(--ink-soft)",
          opacity: 0.5,
          transform: "rotate(8deg)",
          zIndex: 2,
        }}
      />
      <PlusSketch
        className="absolute hidden md:block"
        style={{
          top: "38%",
          right: "16%",
          width: "14px",
          color: "var(--ink-soft)",
          opacity: 0.5,
          transform: "rotate(-12deg)",
          zIndex: 2,
        }}
      />

      {/* main hero stack */}
      <div
        className="relative z-[3] mx-auto max-w-[1080px] text-center"
        style={{
          padding:
            "clamp(20px, 3vw, 40px) clamp(20px, 4vw, 40px) clamp(36px, 4vw, 56px)",
        }}
      >
        <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--ink-soft)] before:inline-block before:h-px before:w-[22px] before:bg-[color:var(--rule)] after:inline-block after:h-px after:w-[22px] after:bg-[color:var(--rule)]">
          {eyebrow}
        </div>

        <h1
          className="mx-auto max-w-[18ch] font-medium text-[color:var(--ink)]"
          style={{
            fontSize: "clamp(38px, 5.4vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
          }}
        >
          A designer who can design{" "}
          <span className="relative inline-block pb-[0.16em]">
            <span
              className="font-display italic font-normal text-[color:var(--accent)]"
              style={{ fontSize: "1.08em", lineHeight: 0.95, letterSpacing: "-0.005em" }}
            >
              AI Systems
            </span>
            <UnderlineSketch
              className="absolute left-1/2 -bottom-0.5 -translate-x-1/2"
              style={{ width: "92%", maxWidth: "260px", color: "var(--accent)", opacity: 0.6, zIndex: 1 }}
            />
            <SparklesSketch
              className="absolute"
              style={{
                top: "-26px",
                right: "-30px",
                width: "38px",
                color: "var(--accent)",
                opacity: 0.75,
                transform: "rotate(8deg)",
              }}
            />
          </span>
        </h1>

        <p
          className="mx-auto mt-[18px] max-w-[46ch] text-[15.5px] font-normal leading-[1.6] text-[color:var(--ink-muted)]"
        >
          {ledeText}
        </p>

        {/* cube */}
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.floor} />
          <div className={styles.cube}>
            <div className={`${styles.face} ${styles.f1}`} />
            <div className={`${styles.face} ${styles.f2}`} />
            <div className={`${styles.face} ${styles.f3}`} />
            <div className={`${styles.face} ${styles.f4}`} />
            <div className={`${styles.face} ${styles.f5}`} />
            <div className={`${styles.face} ${styles.f6}`} />
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-[clamp(28px,3vw,40px)] inline-flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-[color:var(--paper)] transition hover:-translate-y-px hover:bg-[color:var(--accent)] hover:shadow-[0_14px_30px_-16px_rgba(0,0,0,0.4)]"
          >
            {primaryLabel}
            <span className="font-display italic text-[17px] leading-none -translate-y-px">→</span>
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ink)] bg-transparent px-5 py-3 text-sm font-medium text-[color:var(--ink)] transition hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)]"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
