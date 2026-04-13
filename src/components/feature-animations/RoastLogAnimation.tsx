"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Fire, TrendDown, TrendUp } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

function useAnimatedCounter(
  target: number,
  isInView: boolean,
  duration: number = DUR.counter,
  delay: number = 0
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration,
        ease: EASE,
        onUpdate: (v) => setValue(Math.round(v * 10) / 10),
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, target, duration, delay]);
  return value;
}

function MockupLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-medium text-neutral-400 mb-1">
      {children}
    </span>
  );
}

function MockupField({
  label,
  value,
  delay = 0,
  isInView,
}: {
  label: string;
  value: string;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DUR.field, delay, ease: EASE }}
    >
      <MockupLabel>{label}</MockupLabel>
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium">
        {value}
      </div>
    </motion.div>
  );
}

export function RoastLogAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const greenStock = useAnimatedCounter(108, isInView, DUR.counter, 1.5);
  const roastedStock = useAnimatedCounter(10, isInView, DUR.counter, 1.5);

  return (
    <div ref={ref} className="space-y-4">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center gap-2 mb-5"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Fire size={18} weight="duotone" className="text-[#D97706]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Log Roast</span>
        </motion.div>

        <div className="space-y-3">
          <MockupField
            label="Green Bean"
            value="Ethiopia Yirgacheffe"
            delay={0.2}
            isInView={isInView}
          />
          <div className="grid grid-cols-2 gap-3">
            <MockupField
              label="Green Weight (kg) *"
              value="12"
              delay={0.2 + STAGGER.field}
              isInView={isInView}
            />
            <MockupField
              label="Roasted Weight (kg) *"
              value="10"
              delay={0.2 + STAGGER.field * 2}
              isInView={isInView}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: DUR.element, delay: 1.3, ease: EASE }}
          >
            <MockupLabel>Weight Loss</MockupLabel>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm font-semibold text-[#D97706]">
              16.7%
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.6, ease: EASE }}
          className="mt-4"
        >
          <button className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg">
            Log Roast
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 1.5, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 text-center"
        >
          <div className="flex items-center justify-center mb-1">
            <TrendDown size={16} weight="duotone" className="text-red-500 mr-1" />
            <span className="text-xs font-medium text-neutral-400">Green Stock</span>
          </div>
          <span className="text-xl font-black text-red-500 tabular-nums">
            {greenStock}
            <span className="text-xs font-medium text-neutral-400 ml-1">kg</span>
          </span>
          <span className="text-xs text-red-400 block">▼ 12kg</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 1.8, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 text-center"
        >
          <div className="flex items-center justify-center mb-1">
            <TrendUp size={16} weight="duotone" className="text-green-600 mr-1" />
            <span className="text-xs font-medium text-neutral-400">Roasted Stock</span>
          </div>
          <span className="text-xl font-black text-green-600 tabular-nums">
            {roastedStock}
            <span className="text-xs font-medium text-neutral-400 ml-1">kg</span>
          </span>
          <span className="text-xs text-green-500 block">▲ 10kg</span>
        </motion.div>
      </div>
    </div>
  );
}
