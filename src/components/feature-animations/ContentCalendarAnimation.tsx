"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarBlank, Envelope, ShareNetwork, Rocket } from "@phosphor-icons/react";
import { EASE, DUR } from "./shared";

type EntryType = "email" | "social" | "launch";

interface CalendarEntry {
  day: number;
  type: EntryType;
  label: string;
}

const entries: CalendarEntry[] = [
  { day: 2, type: "email", label: "Welcome series" },
  { day: 5, type: "social", label: "IG: Brew tips" },
  { day: 7, type: "launch", label: "Ethiopia launch" },
  { day: 9, type: "social", label: "FB: Behind scenes" },
  { day: 12, type: "email", label: "Promo: 10% off" },
  { day: 14, type: "social", label: "LI: Farm story" },
  { day: 16, type: "email", label: "New arrival" },
  { day: 19, type: "social", label: "IG: Latte art" },
  { day: 21, type: "launch", label: "Decaf drop" },
  { day: 23, type: "email", label: "Reorder nudge" },
  { day: 26, type: "social", label: "FB: Cupping notes" },
  { day: 28, type: "social", label: "IG: Team photo" },
];

const typeConfig: Record<EntryType, { bg: string; text: string; dot: string }> = {
  email: { bg: "bg-blue-100", text: "text-[#2563EB]", dot: "bg-[#2563EB]" },
  social: { bg: "bg-amber-100", text: "text-[#D97706]", dot: "bg-[#D97706]" },
  launch: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-600" },
};

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

export function ContentCalendarAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // April 2026 starts on Wednesday (offset 2)
  const startOffset = 2;
  const daysInMonth = 30;

  return (
    <div ref={ref} className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
        className="flex items-center gap-2 mb-5"
      >
        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
          <CalendarBlank size={18} weight="duotone" className="text-[#2563EB]" />
        </div>
        <span className="text-sm font-bold text-neutral-900">Content Calendar</span>
        <span className="text-xs text-neutral-400 ml-auto">April 2026</span>
      </motion.div>

      {/* Day headers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 0.4, ease: EASE }}
        className="grid grid-cols-7 gap-1 mb-1"
      >
        {weekDays.map((day, i) => (
          <div key={i} className="text-center py-1">
            <span className="text-xs font-semibold text-neutral-400">{day}</span>
          </div>
        ))}
      </motion.div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="h-14" />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const entry = entries.find((e) => e.day === day);
          const entryIndex = entry ? entries.indexOf(entry) : -1;
          const config = entry ? typeConfig[entry.type] : null;

          return (
            <div key={day} className="h-14 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: DUR.element, delay: 0.5, ease: EASE }}
                className="text-[10px] text-neutral-400 mb-0.5 pl-1"
              >
                {day}
              </motion.div>
              {entry && config && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: DUR.element,
                    delay: 0.8 + entryIndex * 0.15,
                    ease: EASE,
                  }}
                  className={`${config.bg} ${config.text} rounded px-1 py-0.5`}
                >
                  <span className="text-[9px] font-semibold leading-tight line-clamp-2 block">
                    {entry.label}
                  </span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 2.8, ease: EASE }}
        className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
          <span className="text-xs text-neutral-500">Email</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#D97706]" />
          <span className="text-xs text-neutral-500">Social</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-600" />
          <span className="text-xs text-neutral-500">Launch</span>
        </div>
      </motion.div>
    </div>
  );
}
