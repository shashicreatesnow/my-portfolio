"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none bg-background">
      {/* Dark gradient base mapping */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      {/* Aurora Blobs */}
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(-5%, 8%) scale(1.15)",
            "translate(0%, 0%) scale(1)"
          ]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-[rgba(185,150,107,0.14)] blur-[120px] will-change-transform"
      />
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(8%, -5%) scale(0.9)",
            "translate(0%, 0%) scale(1)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[10%] right-[-10%] h-[60vh] w-[40vw] rounded-full bg-[rgba(255,255,255,0.04)] blur-[120px] will-change-transform"
      />
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%)",
            "translate(-4%, -6%)",
            "translate(0%, 0%)"
          ]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-20%] left-[20%] h-[50vh] w-[60vw] rounded-full bg-[rgba(185,150,107,0.09)] blur-[140px] will-change-transform"
      />
    </div>
  );
}
