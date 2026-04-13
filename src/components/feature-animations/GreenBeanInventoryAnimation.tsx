"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Leaf, PlusCircle } from "@phosphor-icons/react";
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
        onUpdate: (v) => setValue(Math.round(v)),
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

export function GreenBeanInventoryAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const stockCount = useAnimatedCounter(120, isInView, DUR.counter, 1.6);

  return (
    <div ref={ref} className="space-y-4">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center gap-2 mb-5"
        >
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Leaf size={18} weight="duotone" className="text-green-600" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Add Green Bean</span>
        </motion.div>

        <div className="space-y-3">
          <MockupField
            label="Name *"
            value="Ethiopia Yirgacheffe"
            delay={0.2}
            isInView={isInView}
          />
          <div className="grid grid-cols-3 gap-3">
            <MockupField
              label="Origin Country"
              value="Ethiopia"
              delay={0.2 + STAGGER.field}
              isInView={isInView}
            />
            <MockupField
              label="Initial Stock (kg)"
              value="120"
              delay={0.2 + STAGGER.field * 2}
              isInView={isInView}
            />
            <MockupField
              label="Cost per kg (£)"
              value="8.50"
              delay={0.2 + STAGGER.field * 3}
              isInView={isInView}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.6, ease: EASE }}
          className="mt-4"
        >
          <button className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg">
            Add Green Bean
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 1.8, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <PlusCircle size={20} weight="duotone" className="text-green-600" />
          </div>
          <span className="text-sm font-medium text-neutral-700">Green Stock Total</span>
        </div>
        <span className="text-2xl font-black text-neutral-900 tabular-nums">
          {stockCount}
          <span className="text-sm font-medium text-neutral-400 ml-1">kg</span>
        </span>
      </motion.div>
    </div>
  );
}
