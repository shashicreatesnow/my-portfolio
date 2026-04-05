"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "@/providers/cursor-provider";
import Image from "next/image";

export function CustomCursor() {
  const [hasMoved, setHasMoved] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { cursorState } = useCursor();

  // use Spring for ultra smooth trailing feeling
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    let moved = false;
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!moved) {
        moved = true;
        setHasMoved(true); // Only trigger re-render once
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") || 
        target.closest("button") || 
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Don't show cursor if mouse hasn't moved yet
  if (!hasMoved) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:flex items-center justify-center overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: cursorState.active ? "normal" : "difference",
      }}
      initial={{ width: 12, height: 12, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
      animate={
        cursorState.active
          ? { 
              width: cursorState.type === "media" ? 140 : 80, 
              height: cursorState.type === "media" ? 140 : 80, 
              backgroundColor: "rgba(255, 255, 255, 1)" 
            }
          : isHovering
          ? { width: 48, height: 48, backgroundColor: "rgba(255, 255, 255, 1)" }
          : { width: 12, height: 12, backgroundColor: "rgba(255, 255, 255, 0.4)" }
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {cursorState.active && cursorState.type === "media" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 h-full w-full"
          >
            <Image 
              src={cursorState.data} 
              alt="Cursor Preview" 
              fill 
              className="object-cover" 
              sizes="140px"
              priority
            />
          </motion.div>
        )}
        {cursorState.active && cursorState.type === "text" && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-background font-medium tracking-wide text-xs uppercase"
          >
            {cursorState.data}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
