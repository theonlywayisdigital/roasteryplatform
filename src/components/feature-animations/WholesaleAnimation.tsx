"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, DUR } from "./shared";

/* ── Off Your Bean inline SVG logo (copied from how-it-works) ── */

function OffYourBeanLogo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100 20C60 20 30 55 30 95c0 25 10 45 25 58l-5 30c-1 6 4 11 10 10l15-3c7 4 16 6 25 6s18-2 25-6l15 3c6 1 11-4 10-10l-5-30c15-13 25-33 25-58 0-40-30-75-70-75z"
        fill="#F5F0EB"
        stroke="#1A1A1A"
        strokeWidth="6"
      />
      <ellipse cx="75" cy="90" rx="14" ry="16" fill="#1A1A1A" />
      <ellipse cx="125" cy="90" rx="14" ry="16" fill="#1A1A1A" />
      <path d="M95 110l5 8 5-8" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 130h56M80 130v10M90 130v10M100 130v10M110 130v10M120 130v10" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="65" cy="45" rx="8" ry="12" transform="rotate(-30 65 45)" fill="#1A1A1A" />
      <ellipse cx="85" cy="32" rx="8" ry="12" transform="rotate(-10 85 32)" fill="#1A1A1A" />
      <ellipse cx="110" cy="30" rx="8" ry="12" transform="rotate(15 110 30)" fill="#1A1A1A" />
      <ellipse cx="132" cy="42" rx="8" ry="12" transform="rotate(35 132 42)" fill="#1A1A1A" />
      <ellipse cx="50" cy="62" rx="7" ry="10" transform="rotate(-45 50 62)" fill="#1A1A1A" />
      <ellipse cx="148" cy="58" rx="7" ry="10" transform="rotate(50 148 58)" fill="#1A1A1A" />
    </svg>
  );
}

export function WholesaleAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [stage, setStage] = useState(0);
  // 0 = blank, 1 = logo drops in, 2 = bg floods, 3 = accent follows

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView]);

  const primaryColor = stage >= 2 ? "#1A1A1A" : "#E2E8F0";
  const accentColor = stage >= 3 ? "#D97706" : "#CBD5E1";
  const primaryHex = stage >= 2 ? "#1A1A1A" : "#E2E8F0";
  const accentHex = stage >= 3 ? "#D97706" : "#CBD5E1";

  return (
    <div ref={ref} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-lg">
      <div className="grid grid-cols-5 gap-3 h-full p-4">
        {/* Left: Branding controls */}
        <div className="col-span-2 flex flex-col">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 space-y-3 flex-1">
            <span className="text-xs font-semibold text-neutral-900 block">
              Brand Identity
            </span>

            {/* Logo upload */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: DUR.element, delay: 0.3, ease: EASE }}
            >
              <span className="block text-xs font-medium text-neutral-400 mb-1">Logo</span>
              <div className="w-full h-12 border-2 border-dashed border-neutral-200 rounded-lg flex items-center justify-center overflow-hidden relative">
                <motion.span
                  className="text-xs text-neutral-400 absolute"
                  animate={{ opacity: stage >= 1 ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  Upload logo
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.7 }}
                  animate={
                    stage >= 1
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 20, scale: 0.7 }
                  }
                  transition={{ duration: DUR.color, ease: EASE }}
                >
                  <OffYourBeanLogo size={30} />
                </motion.div>
              </div>
            </motion.div>

            {/* Primary colour */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: DUR.element, delay: 0.6, ease: EASE }}
            >
              <span className="block text-xs font-medium text-neutral-400 mb-1">Primary</span>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-6 h-6 rounded-md border border-neutral-200"
                  animate={{ backgroundColor: primaryColor }}
                  transition={{ duration: DUR.color, ease: EASE }}
                />
                <motion.span
                  className="text-xs text-neutral-500 font-mono"
                  key={primaryHex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {primaryHex}
                </motion.span>
              </div>
            </motion.div>

            {/* Accent colour */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: DUR.element, delay: 0.9, ease: EASE }}
            >
              <span className="block text-xs font-medium text-neutral-400 mb-1">Accent</span>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-6 h-6 rounded-md border border-neutral-200"
                  animate={{ backgroundColor: accentColor }}
                  transition={{ duration: DUR.color, ease: EASE }}
                />
                <motion.span
                  className="text-xs text-neutral-500 font-mono"
                  key={accentHex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {accentHex}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Portal preview */}
        <div className="col-span-3 flex flex-col">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-lg overflow-hidden flex-1 flex flex-col">
            {/* Hero banner */}
            <motion.div
              className="h-24 flex flex-col justify-end p-3 relative overflow-hidden"
              animate={{ backgroundColor: primaryColor }}
              transition={{ duration: DUR.color, ease: EASE }}
            >
              {/* Nav bar */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    stage >= 1
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  transition={{ duration: DUR.card, ease: EASE }}
                >
                  <OffYourBeanLogo size={20} />
                </motion.div>
                <div className="flex gap-2 text-[10px]">
                  {["Shop", "Wholesale", "Contact"].map((label) => (
                    <motion.span
                      key={label}
                      animate={{ color: stage >= 2 ? "#ffffff" : "#64748b" }}
                      transition={{ duration: DUR.color, ease: EASE }}
                    >
                      {label}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Brand name */}
              <motion.span
                className="text-xs font-bold"
                animate={{ color: stage >= 2 ? "#ffffff" : "#0f172a" }}
                transition={{ duration: DUR.color, ease: EASE }}
              >
                {stage >= 1 ? "Off Your Bean" : "Your Roastery"}
              </motion.span>
            </motion.div>

            {/* Product grid */}
            <div className="p-3 flex-1">
              <motion.p
                className="text-[10px] font-bold uppercase tracking-wider mb-2"
                animate={{ color: stage >= 2 ? "#1A1A1A" : "#64748b" }}
                transition={{ duration: DUR.color, ease: EASE }}
              >
                Our Coffee
              </motion.p>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="w-full aspect-square rounded-lg bg-neutral-100" />
                    <div className="h-1.5 w-3/4 bg-neutral-200 rounded" />
                    <div className="h-1.5 w-1/2 bg-neutral-100 rounded" />
                    <motion.button
                      className="w-full py-1 rounded-md text-white text-[10px] font-semibold"
                      animate={{ backgroundColor: accentColor }}
                      transition={{ duration: DUR.color, ease: EASE }}
                    >
                      Order
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
