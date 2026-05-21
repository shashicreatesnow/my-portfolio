// Hand-drawn SVG sketches ported from mockups/shashi-cursor-cube.html
// All paths use currentColor so the parent controls hue via Tailwind text-* utilities.

import { cn } from "@/lib/utils/cn";

type SketchProps = React.SVGProps<SVGSVGElement>;

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DotsSketch({ className, ...rest }: SketchProps) {
  return (
    <svg
      viewBox="0 0 140 110"
      strokeWidth={1.6}
      {...baseProps}
      {...rest}
      className={cn("pointer-events-none", className)}
    >
      <path d="M12 22 C 32 18, 54 30, 70 24 C 88 17, 108 30, 128 22" strokeDasharray="2 4" opacity={0.65} />
      <path d="M16 60 C 36 54, 60 70, 86 60 C 104 53, 120 64, 130 58" strokeDasharray="2 4" opacity={0.55} />
      <circle cx="12" cy="22" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="70" cy="24" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="128" cy="22" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="60" r="2.2" fill="currentColor" stroke="none" opacity={0.6} />
      <circle cx="86" cy="60" r="2.2" fill="currentColor" stroke="none" opacity={0.6} />
      <circle cx="48" cy="92" r="2.2" fill="currentColor" stroke="none" opacity={0.5} />
      <circle cx="100" cy="96" r="2.2" fill="currentColor" stroke="none" opacity={0.5} />
    </svg>
  );
}

export function FlowSketch({ className, ...rest }: SketchProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      strokeWidth={1.7}
      {...baseProps}
      {...rest}
      className={cn("pointer-events-none", className)}
    >
      <path d="M16 56 C 14 38, 24 32, 40 33 L 78 33 C 96 32, 102 42, 100 58 C 102 74, 94 82, 78 81 L 40 82 C 22 83, 14 74, 16 56 Z" strokeDasharray="4 3" />
      <text x="34" y="62" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="17" fill="currentColor" stroke="none">brief</text>
      <path d="M104 58 C 118 50, 128 70, 142 58 C 150 52, 156 56, 162 58" strokeDasharray="4 3" />
      <path d="M156 53 l8 5 -6 7" />
      <path d="M196 56 C 224 52, 230 76, 220 88 C 208 100, 180 96, 174 80 C 170 66, 178 58, 196 56 Z" strokeDasharray="4 3" />
      <circle cx="198" cy="76" r="3" fill="currentColor" stroke="none" opacity={0.75} />
      <ellipse cx="200" cy="76" rx="32" ry="6" transform="rotate(-12 200 76)" strokeDasharray="3 3" opacity={0.55} />
      <text x="178" y="120" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="16" fill="currentColor" stroke="none">agent</text>
      <path d="M236 76 C 250 70, 262 86, 274 76" strokeDasharray="4 3" />
      <path d="M268 71 l8 5 -6 7" />
      <path d="M286 64 L 312 76 L 290 80 L 286 64 Z" strokeDasharray="4 3" />
      <path d="M290 80 L 296 72 L 312 76" opacity={0.7} />
      <text x="280" y="104" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="16" fill="currentColor" stroke="none">ship</text>
    </svg>
  );
}

export function ArrowSketch({ className, ...rest }: SketchProps) {
  return (
    <svg
      viewBox="0 0 180 110"
      strokeWidth={1.6}
      {...baseProps}
      {...rest}
      className={cn("pointer-events-none", className)}
    >
      <path d="M170 18 C 136 6, 88 10, 48 38 C 34 48, 28 60, 38 76 C 44 84, 52 86, 60 80" strokeDasharray="4 3" />
      <path d="M68 70 l-10 12 -6 -12" />
      <text x="60" y="100" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="16" fill="currentColor" stroke="none">it spins</text>
    </svg>
  );
}

export function UnderlineSketch({ className, ...rest }: SketchProps) {
  return (
    <svg
      viewBox="0 0 200 18"
      strokeWidth={1.6}
      {...baseProps}
      {...rest}
      className={cn("pointer-events-none", className)}
    >
      <path d="M6 11 C 40 4, 80 16, 120 8 C 150 2, 180 12, 196 8" />
    </svg>
  );
}

export function SparklesSketch({ className, ...rest }: SketchProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      strokeWidth={1.6}
      {...baseProps}
      {...rest}
      className={cn("pointer-events-none", className)}
    >
      <path d="M20 6 L 20 16 M 14 11 L 26 11" />
      <path d="M8 26 L 8 32 M 5 29 L 11 29" opacity={0.8} />
      <path d="M30 22 L 30 28 M 27 25 L 33 25" opacity={0.7} />
    </svg>
  );
}

export function SquiggleSketch({ className, ...rest }: SketchProps) {
  return (
    <svg
      viewBox="0 0 140 30"
      strokeWidth={1.6}
      {...baseProps}
      {...rest}
      className={cn("pointer-events-none", className)}
    >
      <path d="M4 16 C 14 6, 22 26, 32 16 C 42 6, 50 26, 60 16 C 70 6, 78 26, 88 16 C 98 6, 106 26, 116 16 C 124 10, 132 18, 136 14" />
    </svg>
  );
}

export function BracketSketch({ className, label = "what I do", ...rest }: SketchProps & { label?: string }) {
  return (
    <svg
      viewBox="0 0 200 36"
      strokeWidth={1.5}
      {...baseProps}
      {...rest}
      className={cn("pointer-events-none", className)}
    >
      <path d="M6 28 C 6 18, 14 14, 30 14 L 90 14 C 96 14, 100 10, 100 4 C 100 10, 104 14, 110 14 L 170 14 C 186 14, 194 18, 194 28" />
      <text x="100" y="34" textAnchor="middle" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="13" fill="currentColor" stroke="none">{label}</text>
    </svg>
  );
}

export function PlusSketch({ className, ...rest }: SketchProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      strokeWidth={1.4}
      {...baseProps}
      {...rest}
      className={cn("pointer-events-none", className)}
    >
      <path d="M7 1 L 7 13 M 1 7 L 13 7" />
    </svg>
  );
}
