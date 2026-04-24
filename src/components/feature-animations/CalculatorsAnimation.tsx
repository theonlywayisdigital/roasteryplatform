"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Calculator } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

function useAnimatedCounter(
  target: number,
  isInView: boolean,
  decimals: number = 1,
  duration: number = DUR.counter,
  delay: number = 0
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const factor = Math.pow(10, decimals);
    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration,
        ease: EASE,
        onUpdate: (v) => setValue(Math.round(v * factor) / factor),
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, target, decimals, duration, delay]);
  return value;
}

export function CalculatorsAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Results counters
  const greenCost = useAnimatedCounter(8.5, isInView, 2, DUR.counter, 2.0);
  const weightLoss = useAnimatedCounter(16.7, isInView, 1, DUR.counter, 2.2);
  const roastedCost = useAnimatedCounter(10.2, isInView, 2, DUR.counter, 2.4);
  const bagCost = useAnimatedCounter(5.1, isInView, 2, DUR.counter, 2.6);

  // Margin counters
  const retailMargin = useAnimatedCounter(65, isInView, 0, DUR.counter, 3.2);
  const wholesaleMargin = useAnimatedCounter(30, isInView, 0, DUR.counter, 3.4);

  return (
    <div ref={ref} className="space-y-4">
      {/* Calculator card */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="mb-1"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
              <Calculator size={18} weight="duotone" className="text-[#2563EB]" />
            </div>
            <span className="text-sm font-bold text-neutral-900">Margin Calculator</span>
          </div>
          <p className="text-[11px] text-neutral-400 ml-10">
            Select a roast profile and bag weight to see suggested prices
          </p>
        </motion.div>

        {/* Inputs */}
        <div className="space-y-3 mt-4">
          {/* Roast Profile dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 0.6, ease: EASE }}
          >
            <span className="block text-xs font-medium text-neutral-400 mb-1">Roast Profile</span>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium flex items-center justify-between">
              <span>Ethiopia Yirgacheffe</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neutral-400">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          {/* Bag Weight toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 0.6 + STAGGER.field, ease: EASE }}
          >
            <span className="block text-xs font-medium text-neutral-400 mb-1">Bag Weight</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <span className="px-3 py-2 text-xs font-semibold text-neutral-400 bg-neutral-50 flex-1 text-center">250g</span>
              <span className="px-3 py-2 text-xs font-semibold text-white bg-[#2563EB] flex-1 text-center">500g</span>
              <span className="px-3 py-2 text-xs font-semibold text-neutral-400 bg-neutral-50 flex-1 text-center">1kg</span>
            </div>
          </motion.div>

          {/* Wholesale Discount */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 0.6 + STAGGER.field * 2, ease: EASE }}
          >
            <span className="block text-xs font-medium text-neutral-400 mb-1">Wholesale Discount %</span>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium">
              35
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 1.8, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-5"
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <span className="text-[11px] font-medium text-neutral-400 block">Green Cost / kg</span>
            <span className="text-lg font-black text-neutral-900 tabular-nums">£{greenCost.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[11px] font-medium text-neutral-400 block">Weight Loss %</span>
            <span className="text-lg font-black text-[#D97706] tabular-nums">{weightLoss.toFixed(1)}%</span>
          </div>
          <div>
            <span className="text-[11px] font-medium text-neutral-400 block">Roasted Cost / kg</span>
            <span className="text-lg font-black text-neutral-900 tabular-nums">£{roastedCost.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[11px] font-medium text-neutral-400 block">Bag Cost</span>
            <span className="text-lg font-black text-neutral-900 tabular-nums">£{bagCost.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Suggested prices */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 3.0, ease: EASE }}
          className="bg-white rounded-xl border border-green-200 shadow-lg p-4 text-center"
        >
          <span className="text-[11px] font-medium text-green-600 block mb-1">Suggested Retail</span>
          <span className="text-2xl font-black text-green-700 tabular-nums">£14.50</span>
          <div className="mt-1 flex items-center justify-center gap-1">
            <span className="text-xs font-semibold text-green-600 tabular-nums">{retailMargin}%</span>
            <span className="text-[10px] text-neutral-400">margin</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 3.0 + STAGGER.card, ease: EASE }}
          className="bg-white rounded-xl border border-blue-200 shadow-lg p-4 text-center"
        >
          <span className="text-[11px] font-medium text-blue-600 block mb-1">Suggested Wholesale</span>
          <span className="text-2xl font-black text-blue-700 tabular-nums">£9.43</span>
          <div className="mt-1 flex items-center justify-center gap-1">
            <span className="text-xs font-semibold text-blue-600 tabular-nums">{wholesaleMargin}%</span>
            <span className="text-[10px] text-neutral-400">margin</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
