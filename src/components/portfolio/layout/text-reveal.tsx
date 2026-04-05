"use client";

import { motion } from "framer-motion";

export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  // Use a unique separator that's unlikely to be in the text to keep multi-spaced elements grouped
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 50, damping: 12 } 
    },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span key={i} className="mr-3 overflow-hidden inline-block pb-2">
          <motion.span variants={item} className="inline-block">
            {word}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  );
}
