"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ChartBar, TrendUp } from "@phosphor-icons/react";
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

const months = [
  { label: "Oct", value: 3200, max: 6240 },
  { label: "Nov", value: 4100, max: 6240 },
  { label: "Dec", value: 3800, max: 6240 },
  { label: "Jan", value: 4600, max: 6240 },
  { label: "Feb", value: 5100, max: 6240 },
  { label: "Mar", value: 6240, max: 6240, highlight: true },
];

export function AnalyticsAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const bestMonthValue = useAnimatedCounter(6240, isInView, DUR.counter, 2.0);

  return (
    <div ref={ref} className="space-y-4">
      {/* Chart */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
            <ChartBar size={18} weight="duotone" className="text-[#2563EB]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Monthly Revenue</span>
        </motion.div>

        {/* Bar chart */}
        <div className="flex items-end gap-3 h-36 mb-3">
          {months.map((month, i) => (
            <div key={month.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <motion.div
                className={`w-full rounded-t-md ${month.highlight ? "bg-[#D97706]" : "bg-[#2563EB]"}`}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${(month.value / month.max) * 100}%` } : {}}
                transition={{
                  duration: DUR.counter,
                  delay: 0.4 + i * STAGGER.card,
                  ease: EASE,
                }}
              />
            </div>
          ))}
        </div>

        {/* Month labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.6, ease: EASE }}
          className="flex gap-3"
        >
          {months.map((month) => (
            <span
              key={month.label}
              className={`flex-1 text-center text-xs font-medium ${
                month.highlight ? "text-[#D97706] font-bold" : "text-neutral-400"
              }`}
            >
              {month.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 2.0, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-[#D97706]/10 flex items-center justify-center">
              <ChartBar size={14} weight="duotone" className="text-[#D97706]" />
            </div>
            <span className="text-xs font-medium text-neutral-500">Best Month</span>
          </div>
          <span className="text-sm font-semibold text-neutral-900 block">March</span>
          <span className="text-lg font-black text-[#D97706] tabular-nums">
            £{bestMonthValue.toLocaleString()}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 2.2, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center">
              <TrendUp size={14} weight="duotone" className="text-green-600" />
            </div>
            <span className="text-xs font-medium text-neutral-500">Growth</span>
          </div>
          <span className="text-2xl font-black text-green-600 tabular-nums">
            ↑ 18
            <span className="text-sm font-medium text-neutral-400 ml-0.5">%</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
