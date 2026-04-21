"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import {
  Envelope,
  PaperPlaneTilt,
  Users,
  ChartBar,
} from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

/* ── Animated counter ── */

function useAnimatedCounter(
  target: number,
  isActive: boolean,
  duration: number = DUR.counter,
  delay: number = 0
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration,
        ease: EASE,
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isActive, target, duration, delay]);
  return value;
}

/* ── Typing hook ── */

function useTypingEffect(
  text: string,
  isActive: boolean,
  charDelay: number = 35,
  startDelay: number = 0
) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!isActive) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i <= text.length; i++) {
      timers.push(
        setTimeout(() => setTyped(text.slice(0, i)), startDelay + i * charDelay)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [isActive, text, charDelay, startDelay]);
  return typed;
}

/* ── Main component ── */

export function MarketingSuiteAnimation({ isActive }: { isActive: boolean }) {
  const [sent, setSent] = useState(false);

  const subject = useTypingEffect(
    "New arrival: Ethiopia Yirgacheffe",
    isActive,
    35,
    600
  );

  const openRate = useAnimatedCounter(68, isActive, DUR.counter, 2.8);
  const clickRate = useAnimatedCounter(24, isActive, DUR.counter, 3.0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setSent(true), 2200);
    return () => clearTimeout(t);
  }, [isActive]);

  return (
    <div className="space-y-3">
      {/* Email campaign card */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
            <Envelope size={18} weight="duotone" className="text-[#2563EB]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">New Campaign</span>
        </motion.div>

        {/* From field */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.3, ease: EASE }}
          className="mb-3"
        >
          <span className="block text-xs font-medium text-neutral-400 mb-1">From</span>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium">
            Off Your Bean
          </div>
        </motion.div>

        {/* Subject — typing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.3 + STAGGER.field, ease: EASE }}
          className="mb-3"
        >
          <span className="block text-xs font-medium text-neutral-400 mb-1">Subject</span>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium min-h-[36px]">
            {subject}
            {subject.length < "New arrival: Ethiopia Yirgacheffe".length && isActive && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-3.5 bg-[#2563EB] ml-0.5 align-middle"
              />
            )}
          </div>
        </motion.div>

        {/* Audience badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.4, ease: EASE }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB]/10 text-[#2563EB]">
            <Users size={14} weight="duotone" />
            <span className="text-xs font-semibold">42 wholesale buyers</span>
          </div>
        </motion.div>

        {/* Send button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.8, ease: EASE }}
        >
          {!sent ? (
            <motion.button
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg"
            >
              <PaperPlaneTilt size={16} weight="fill" />
              Send Campaign
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DUR.element, ease: EASE }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg"
            >
              <PaperPlaneTilt size={16} weight="fill" />
              Sent to 42 buyers
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 2.6, ease: EASE }}
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
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.card, delay: 2.8, ease: EASE }}
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
