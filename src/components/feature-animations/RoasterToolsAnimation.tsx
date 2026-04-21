"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import {
  Leaf,
  Fire,
  TrendDown,
  TrendUp,
} from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

/* ── Animated counter ── */

function useAnimatedCounter(
  target: number,
  isActive: boolean,
  duration: number = DUR.counter,
  delay: number = 0,
  decimals: number = 0
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration,
        ease: EASE,
        onUpdate: (v) => {
          if (decimals > 0) {
            setValue(Math.round(v * Math.pow(10, decimals)) / Math.pow(10, decimals));
          } else {
            setValue(Math.round(v));
          }
        },
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isActive, target, duration, delay, decimals]);
  return value;
}

/* ── MockupField ── */

function MockupField({
  label,
  value,
  delay = 0,
  isActive,
}: {
  label: string;
  value: string;
  delay?: number;
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DUR.field, delay, ease: EASE }}
    >
      <span className="block text-xs font-medium text-neutral-400 mb-1">{label}</span>
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium">
        {value}
      </div>
    </motion.div>
  );
}

/* ── Main component ── */

export function RoasterToolsAnimation({ isActive }: { isActive: boolean }) {
  const [roastLogged, setRoastLogged] = useState(false);
  const greenStock = useAnimatedCounter(108, isActive, DUR.counter, 2.4);
  const roastedStock = useAnimatedCounter(10, isActive, DUR.counter, 2.4);
  const weightLoss = useAnimatedCounter(16.7, isActive, DUR.counter, 2.8, 1);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setRoastLogged(true), 1800);
    return () => clearTimeout(t);
  }, [isActive]);

  return (
    <div className="space-y-3">
      {/* Green bean entry */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 0.2, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Leaf size={18} weight="duotone" className="text-green-600" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Green Bean Added</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-3">
            <MockupField
              label="Name"
              value="Ethiopia Yirgacheffe"
              delay={0.4}
              isActive={isActive}
            />
          </div>
          <MockupField
            label="Origin"
            value="Ethiopia"
            delay={0.4 + STAGGER.field}
            isActive={isActive}
          />
          <MockupField
            label="Stock (kg)"
            value="120"
            delay={0.4 + STAGGER.field * 2}
            isActive={isActive}
          />
          <MockupField
            label="Cost/kg"
            value="£8.50"
            delay={0.4 + STAGGER.field * 3}
            isActive={isActive}
          />
        </div>
      </motion.div>

      {/* Roast logged card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 1.4, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Fire size={18} weight="duotone" className="text-[#D97706]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Roast Logged</span>
          {roastLogged && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DUR.element, ease: EASE }}
              className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700"
            >
              Logged
            </motion.span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MockupField
            label="Green Weight"
            value="12 kg"
            delay={1.6}
            isActive={isActive}
          />
          <MockupField
            label="Roasted Weight"
            value="10 kg"
            delay={1.6 + STAGGER.field}
            isActive={isActive}
          />
        </div>

        {/* Weight loss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 2.6, ease: EASE }}
          className="mt-3"
        >
          <span className="block text-xs font-medium text-neutral-400 mb-1">Weight Loss</span>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm font-semibold text-[#D97706] tabular-nums">
            {weightLoss}%
          </div>
        </motion.div>
      </motion.div>

      {/* Stock counters */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 2.2, ease: EASE }}
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
          <span className="text-[10px] text-red-400 block">▼ 12kg</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 2.4, ease: EASE }}
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
          <span className="text-[10px] text-green-500 block">▲ 10kg</span>
        </motion.div>
      </div>
    </div>
  );
}
