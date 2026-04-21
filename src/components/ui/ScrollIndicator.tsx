"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ScrollIndicator({ href = "#content" }: { href?: string }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2, ease: EASE }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-accent transition-colors"
    >
      <span className="text-xs font-medium tracking-wide uppercase">
        Scroll to explore
      </span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M4 7l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.a>
  );
}
