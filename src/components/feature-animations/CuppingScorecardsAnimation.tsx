"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Star } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

const attributes = [
  { name: "Aroma", score: 8.5, max: 10 },
  { name: "Flavour", score: 8.0, max: 10 },
  { name: "Aftertaste", score: 7.5, max: 10 },
  { name: "Acidity", score: 8.0, max: 10 },
  { name: "Body", score: 7.5, max: 10 },
  { name: "Overall", score: 8.5, max: 10 },
];

const totalScore = 87.5;

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
        onUpdate: (v) => setValue(Math.round(v * 10) / 10),
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, target, duration, delay]);
  return value;
}

export function CuppingScorecardsAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const finalScore = useAnimatedCounter(totalScore, isInView, DUR.counter, 1.6);

  return (
    <div ref={ref} className="space-y-4">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Star size={18} weight="duotone" className="text-[#D97706]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Cupping Scorecard</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.4, ease: EASE }}
          className="text-xs text-neutral-500 mb-5"
        >
          Ethiopia Yirgacheffe — Washed
        </motion.p>

        {/* Attribute rows */}
        <div className="space-y-3">
          {attributes.map((attr, i) => (
            <motion.div
              key={attr.name}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: DUR.field,
                delay: 0.5 + i * STAGGER.card,
                ease: EASE,
              }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-medium text-neutral-500 w-20 shrink-0">
                {attr.name}
              </span>
              <div className="flex-1 bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#D97706]"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: `${(attr.score / attr.max) * 100}%` } : {}}
                  transition={{
                    duration: DUR.counter,
                    delay: 0.7 + i * STAGGER.card,
                    ease: EASE,
                  }}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: DUR.element,
                  delay: 1.0 + i * STAGGER.card,
                  ease: EASE,
                }}
                className="text-xs font-bold text-neutral-900 tabular-nums w-8 text-right"
              >
                {attr.score}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Total score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 2.2, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#D97706]/10 flex items-center justify-center">
            <Star size={20} weight="fill" className="text-[#D97706]" />
          </div>
          <span className="text-sm font-medium text-neutral-700">SCA Total Score</span>
        </div>
        <span className="text-2xl font-black text-neutral-900 tabular-nums">
          {finalScore}
          <span className="text-sm font-medium text-neutral-400 ml-1">/ 100</span>
        </span>
      </motion.div>
    </div>
  );
}
