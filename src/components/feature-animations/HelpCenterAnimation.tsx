"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MagnifyingGlass, FileText } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

const searchQuery = "How do I log a roast?";

const results = [
  {
    title: "Logging your first roast batch",
    desc: "Step-by-step guide to recording green weight, roasted weight, and profiles.",
  },
  {
    title: "Understanding weight loss %",
    desc: "How weight loss is calculated and what it means for your pricing.",
  },
  {
    title: "Setting up your wholesale portal",
    desc: "Brand your portal, add products, and invite your first buyer.",
  },
];

export function HelpCenterAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [typedText, setTypedText] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Start typing after initial delay
    for (let i = 0; i <= searchQuery.length; i++) {
      timers.push(
        setTimeout(() => {
          setTypedText(searchQuery.slice(0, i));
        }, 600 + i * 60)
      );
    }

    // Show results after typing completes
    timers.push(
      setTimeout(() => setShowResults(true), 600 + searchQuery.length * 60 + 300)
    );

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref} className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
        className="flex items-center gap-2 mb-5"
      >
        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
          <MagnifyingGlass size={18} weight="duotone" className="text-[#2563EB]" />
        </div>
        <span className="text-sm font-bold text-neutral-900">Help Center</span>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.field, delay: 0.4, ease: EASE }}
        className="relative mb-5"
      >
        <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5">
          <MagnifyingGlass size={16} className="text-neutral-400 mr-2 shrink-0" />
          <span className="text-sm text-neutral-900 font-medium">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-0.5 h-4 bg-[#2563EB] ml-0.5 align-middle"
            />
          </span>
        </div>
      </motion.div>

      {/* Results */}
      <div className="space-y-2">
        {results.map((result, i) => (
          <motion.div
            key={result.title}
            initial={{ opacity: 0, y: 12 }}
            animate={showResults ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: DUR.field,
              delay: i * STAGGER.card,
              ease: EASE,
            }}
            className="flex gap-3 p-3 rounded-lg border border-neutral-100 hover:border-[#2563EB]/20 bg-neutral-50/50 transition-colors group cursor-default"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0">
              <FileText size={16} weight="duotone" className="text-[#2563EB]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900 group-hover:text-[#2563EB] transition-colors">
                {result.title}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5 truncate">
                {result.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
