"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { CalendarBlank } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

const batches = [
  { day: 0, bean: "Ethiopia Yirga", weight: "12kg", order: "The Daily Grind × 10", color: "bg-green-50 border-green-200 text-green-700" },
  { day: 0, bean: "House Blend", weight: "20kg", order: "Café Nero × 15", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { day: 1, bean: "Colombia", weight: "15kg", order: "Bean & Gone × 8", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { day: 2, bean: "Brazil Santos", weight: "25kg", order: "The Corner Café × 20", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { day: 3, bean: "Guatemala", weight: "10kg", order: "Grind House × 5", color: "bg-rose-50 border-rose-200 text-rose-700" },
  { day: 4, bean: "Decaf Colombia", weight: "8kg", order: "Leaf & Bean × 6", color: "bg-teal-50 border-teal-200 text-teal-700" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const totalCapacity = 100;
const usedCapacity = 90;

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

export function ProductionPlannerAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const capacityUsed = useAnimatedCounter(usedCapacity, isInView, DUR.counter, 1.8);

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
            <CalendarBlank size={18} weight="duotone" className="text-[#2563EB]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Production Schedule</span>
          <span className="ml-auto text-xs text-neutral-400">This Week</span>
        </motion.div>

        {/* Day headers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.4, ease: EASE }}
          className="grid grid-cols-5 gap-2 mb-3"
        >
          {days.map((day) => (
            <span key={day} className="text-xs font-semibold text-neutral-400 text-center">
              {day}
            </span>
          ))}
        </motion.div>

        {/* Week grid */}
        <div className="grid grid-cols-5 gap-2">
          {days.map((_, dayIdx) => {
            const dayBatches = batches.filter((b) => b.day === dayIdx);
            return (
              <div key={dayIdx} className="min-h-[120px] space-y-2">
                {dayBatches.map((batch, batchIdx) => {
                  const globalIdx = batches.indexOf(batch);
                  return (
                    <motion.div
                      key={batch.bean}
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{
                        duration: DUR.field,
                        delay: 0.6 + globalIdx * STAGGER.card,
                        ease: EASE,
                      }}
                      className={`rounded-lg border p-2 ${batch.color}`}
                    >
                      <p className="text-xs font-semibold truncate">{batch.bean}</p>
                      <p className="text-[10px] font-medium opacity-80">{batch.weight}</p>
                      <p className="text-[10px] opacity-70 truncate mt-0.5">{batch.order}</p>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Capacity bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 2.2, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-neutral-500">Weekly Capacity</span>
          <span className="text-sm font-bold text-neutral-900 tabular-nums">
            {capacityUsed}
            <span className="text-xs font-normal text-neutral-400 ml-1">
              / {totalCapacity} kg
            </span>
          </span>
        </div>
        <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#2563EB]"
            initial={{ width: "0%" }}
            animate={isInView ? { width: `${(usedCapacity / totalCapacity) * 100}%` } : {}}
            transition={{ duration: DUR.counter, delay: 2.0, ease: EASE }}
          />
        </div>
      </motion.div>
    </div>
  );
}
