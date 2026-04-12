"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { User, MapPin, CurrencyGbp, CalendarBlank } from "@phosphor-icons/react";
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

const mainContact = {
  name: "The Daily Grind",
  company: "Daily Grind Ltd",
  location: "Manchester",
  ltv: 2840,
  lastOrder: "3 Apr 2026",
};

export function CRMAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ltvValue = useAnimatedCounter(mainContact.ltv, isInView, DUR.counter, 1.6);

  return (
    <div ref={ref} className="relative flex items-center justify-center py-8">
      {/* Background offset cards */}
      <motion.div
        initial={{ opacity: 0, x: 16, y: 16, rotate: 3 }}
        animate={isInView ? { opacity: 0.4, x: 16, y: 16, rotate: 3 } : {}}
        transition={{ duration: DUR.card, delay: 0.4, ease: EASE }}
        className="absolute inset-0 bg-white rounded-xl border border-neutral-200 shadow-md"
      />
      <motion.div
        initial={{ opacity: 0, x: 8, y: 8, rotate: 1.5 }}
        animate={isInView ? { opacity: 0.6, x: 8, y: 8, rotate: 1.5 } : {}}
        transition={{ duration: DUR.card, delay: 0.6, ease: EASE }}
        className="absolute inset-0 bg-white rounded-xl border border-neutral-200 shadow-md"
      />

      {/* Main contact card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 0.8, ease: EASE }}
        className="relative bg-white rounded-xl border border-neutral-200 shadow-lg p-5 w-full z-10"
      >
        {/* Avatar + name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.0, ease: EASE }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
            <User size={22} weight="duotone" className="text-[#2563EB]" />
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-900">{mainContact.name}</p>
            <p className="text-xs text-neutral-500">{mainContact.company}</p>
          </div>
        </motion.div>

        {/* Details grid */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 1.2, ease: EASE }}
            className="flex items-center gap-2"
          >
            <MapPin size={16} weight="duotone" className="text-neutral-400" />
            <span className="text-sm text-neutral-600">{mainContact.location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 1.4, ease: EASE }}
            className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
          >
            <div className="flex items-center gap-2">
              <CurrencyGbp size={16} weight="duotone" className="text-[#2563EB]" />
              <span className="text-xs font-medium text-neutral-500">Lifetime Value</span>
            </div>
            <span className="text-lg font-black text-[#2563EB]">
              £{ltvValue.toLocaleString()}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 1.6, ease: EASE }}
            className="flex items-center gap-2"
          >
            <CalendarBlank size={16} weight="duotone" className="text-neutral-400" />
            <span className="text-xs text-neutral-500">Last order</span>
            <span className="text-xs font-medium text-neutral-700 ml-auto">{mainContact.lastOrder}</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
