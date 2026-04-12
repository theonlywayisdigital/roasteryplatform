"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Envelope, Users, ChartBar } from "@phosphor-icons/react";
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

export function EmailCampaignsAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const openRate = useAnimatedCounter(68, isInView, DUR.counter, 2.0);
  const clickRate = useAnimatedCounter(24, isInView, DUR.counter, 2.2);

  return (
    <div ref={ref} className="space-y-4">
      {/* Email campaign card */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
            <Envelope size={18} weight="duotone" className="text-[#2563EB]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">New Campaign</span>
        </motion.div>

        {/* Sender */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.4, ease: EASE }}
          className="mb-3"
        >
          <span className="block text-xs font-medium text-neutral-400 mb-1">From</span>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium">
            Off Your Bean
          </div>
        </motion.div>

        {/* Subject line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.4 + STAGGER.field, ease: EASE }}
          className="mb-3"
        >
          <span className="block text-xs font-medium text-neutral-400 mb-1">Subject</span>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium">
            New arrival: Ethiopia Yirgacheffe
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.4 + STAGGER.field * 2, ease: EASE }}
          className="mb-4"
        >
          <span className="block text-xs font-medium text-neutral-400 mb-1">Preview</span>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-500">
            We&apos;ve just landed a stunning washed lot from Yirgacheffe...
          </div>
        </motion.div>

        {/* Audience badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.4, ease: EASE }}
          className="flex items-center gap-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB]/10 text-[#2563EB]">
            <Users size={14} weight="duotone" />
            <span className="text-xs font-semibold">42 wholesale buyers</span>
          </div>
        </motion.div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 1.8, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center">
              <ChartBar size={14} weight="duotone" className="text-green-600" />
            </div>
            <span className="text-xs font-medium text-neutral-500">Open Rate</span>
          </div>
          <span className="text-2xl font-black text-neutral-900 tabular-nums">
            {openRate}
            <span className="text-sm font-medium text-neutral-400 ml-0.5">%</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 2.0, ease: EASE }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-[#2563EB]/10 flex items-center justify-center">
              <ChartBar size={14} weight="duotone" className="text-[#2563EB]" />
            </div>
            <span className="text-xs font-medium text-neutral-500">Click Rate</span>
          </div>
          <span className="text-2xl font-black text-neutral-900 tabular-nums">
            {clickRate}
            <span className="text-sm font-medium text-neutral-400 ml-0.5">%</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
