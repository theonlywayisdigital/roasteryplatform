"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Code, TrendUp } from "@phosphor-icons/react";
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

export function EmbeddedFormsAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [activeField, setActiveField] = useState(-1);

  const leadsCount = useAnimatedCounter(12, isInView, DUR.counter, 2.4);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setActiveField(0), 1200);
    const t2 = setTimeout(() => setActiveField(1), 2000);
    const t3 = setTimeout(() => setActiveField(-1), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView]);

  return (
    <div ref={ref} className="space-y-4">
      {/* Form card */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
            <Code size={18} weight="duotone" className="text-[#2563EB]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Embedded Form</span>
        </motion.div>

        {/* Form heading */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.4, ease: EASE }}
          className="text-lg font-black text-neutral-900 mb-4"
        >
          Join our wholesale list
        </motion.h3>

        {/* Business Name field */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.6, ease: EASE }}
          className="mb-3"
        >
          <span className="block text-xs font-medium text-neutral-400 mb-1">Business Name</span>
          <motion.div
            animate={{
              borderColor: activeField === 0 ? "#2563EB" : "#E5E7EB",
              boxShadow: activeField === 0 ? "0 0 0 3px rgba(37,99,235,0.1)" : "0 0 0 0px rgba(37,99,235,0)",
            }}
            transition={{ duration: 0.3, ease: EASE }}
            className="bg-neutral-50 border rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium"
          >
            {activeField >= 0 ? "The Daily Grind" : ""}
            {activeField === 0 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-[#2563EB] ml-0.5 align-text-bottom"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Email field */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.6 + STAGGER.field, ease: EASE }}
          className="mb-4"
        >
          <span className="block text-xs font-medium text-neutral-400 mb-1">Email Address</span>
          <motion.div
            animate={{
              borderColor: activeField === 1 ? "#2563EB" : "#E5E7EB",
              boxShadow: activeField === 1 ? "0 0 0 3px rgba(37,99,235,0.1)" : "0 0 0 0px rgba(37,99,235,0)",
            }}
            transition={{ duration: 0.3, ease: EASE }}
            className="bg-neutral-50 border rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium"
          >
            {activeField >= 1 ? "hello@dailygrind.co" : ""}
            {activeField === 1 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-[#2563EB] ml-0.5 align-text-bottom"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.6, ease: EASE }}
        >
          <button className="px-6 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg">
            Submit
          </button>
        </motion.div>
      </div>

      {/* Leads counter card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 2.2, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <TrendUp size={18} weight="duotone" className="text-green-600" />
          </div>
          <span className="text-sm font-medium text-neutral-700">
            New leads this month
          </span>
        </div>
        <span className="text-2xl font-black text-neutral-900 tabular-nums">
          {leadsCount}
        </span>
      </motion.div>
    </div>
  );
}
