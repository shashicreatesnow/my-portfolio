"use client";

import { useMotionValue, useSpring, useMotionTemplate, motion } from "framer-motion";
import { MouseEvent, useRef } from "react";

export function GlowPanel({ children, className = "", tilt = true }: { children: React.ReactNode, className?: string, tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000); 
  const mouseY = useMotionValue(-1000);
  
  const rotateX = useSpring(0, { stiffness: 350, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 350, damping: 30 });

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // For Glow
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
    
    // For 3D Tilt
    if (tilt) {
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const rotateXValue = ((event.clientY - top - halfHeight) / halfHeight) * -3; 
      const rotateYValue = ((event.clientX - left - halfWidth) / halfWidth) * 3;
      
      rotateX.set(rotateXValue);
      rotateY.set(rotateYValue);
    }
  }

  function onMouseLeave() {
    if (tilt) {
      rotateX.set(0);
      rotateY.set(0);
    }
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  const background = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(185, 150, 107, 0.16), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        perspective: 1200,
        transformStyle: "preserve-3d"
      }}
      className={`relative group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background, borderRadius: "inherit" }}
      />
      {children}
    </motion.div>
  );
}
