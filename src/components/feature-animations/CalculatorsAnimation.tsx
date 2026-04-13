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

export function CalculatorsAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const weightLoss = useAnimatedCounter(2, isInView, 0, DUR.counter, 1.6);
  const lossPercent = useAnimatedCounter(16.7, isInView, 1, DUR.counter, 1.8);
  const costPerKg = useAnimatedCounter(9.88, isInView, 2, DUR.counter, 2.0);

  return (
    <div ref={ref} className="space-y-4">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center gap-2 mb-5"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
            <Calculator size={18} weight="duotone" className="text-[#2563EB]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Roast Loss Calculator</span>
        </motion.div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <MockupField
              label="Green Weight (kg)"
              value="12"
              delay={0.2}
              isInView={isInView}
            />
            <MockupField
              label="Roasted Weight (kg)"
              value="10"
              delay={0.2 + STAGGER.field}
              isInView={isInView}
            />
          </div>
          <MockupField
            label="Cost per kg Green (£)"
            value="8.50"
            delay={0.2 + STAGGER.field * 2}
            isInView={isInView}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.4, ease: EASE }}
          className="mt-4"
        >
          <button className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg">
            Calculate
          </button>
        </motion.div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 1.6, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 text-center"
        >
          <span className="text-xs font-medium text-neutral-500 block mb-1">Weight Loss</span>
          <span className="text-xl font-black text-neutral-900 tabular-nums">
            {weightLoss}
            <span className="text-xs font-medium text-neutral-400 ml-0.5">kg</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 1.8, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 text-center"
        >
          <span className="text-xs font-medium text-neutral-500 block mb-1">Loss %</span>
          <span className="text-xl font-black text-[#D97706] tabular-nums">
            {lossPercent}
            <span className="text-xs font-medium text-neutral-400 ml-0.5">%</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 2.0, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 text-center"
        >
          <span className="text-xs font-medium text-neutral-500 block mb-1">Cost / kg</span>
          <span className="text-xl font-black text-green-600 tabular-nums">
            £{costPerKg.toFixed(2)}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
