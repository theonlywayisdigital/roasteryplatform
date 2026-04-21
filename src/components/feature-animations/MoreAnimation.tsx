"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Tray,
  Envelope,
  Robot,
  ArrowRight,
  CheckCircle,
  Package,
} from "@phosphor-icons/react";
import { EASE, DUR } from "./shared";

/* ── Typing hook ── */

function useTypingEffect(
  text: string,
  isActive: boolean,
  charDelay: number = 30,
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

/* ── AI shimmer overlay ── */

function AIShimmer() {
  return (
    <motion.div
      className="absolute inset-0 rounded-xl pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.06) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ── Main component ── */

export function MoreAnimation({ isActive }: { isActive: boolean }) {
  const [showAI, setShowAI] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [converted, setConverted] = useState(false);

  const emailText = useTypingEffect(
    "Hi, can I order 5kg House Blend?",
    isActive,
    35,
    600
  );

  useEffect(() => {
    if (!isActive) return;
    const t1 = setTimeout(() => setShowAI(true), 1800);
    const t2 = setTimeout(() => setShowOrder(true), 2600);
    const t3 = setTimeout(() => setConverted(true), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isActive]);

  return (
    <div className="space-y-3">
      {/* Inbox — email arriving */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 0.2, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
            <Tray size={18} weight="duotone" className="text-[#2563EB]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Inbox</span>
          <span className="ml-auto text-xs text-neutral-400">1 new</span>
        </div>

        {/* Email message */}
        <div className="p-3 rounded-lg border border-[#2563EB]/20 bg-[#2563EB]/[0.03]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Envelope size={16} weight="duotone" className="text-[#2563EB]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-neutral-900 mb-0.5">The Daily Grind</p>
              <p className="text-sm text-neutral-600 min-h-[20px]">
                {emailText}
                {emailText.length < "Hi, can I order 5kg House Blend?".length && isActive && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-0.5 h-3.5 bg-[#2563EB] ml-0.5 align-middle"
                  />
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI badge + structured order card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={showAI ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, ease: EASE }}
        className="relative bg-white rounded-xl border border-neutral-200 shadow-lg p-5 overflow-hidden"
      >
        <AIShimmer />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
              <Robot size={18} weight="duotone" className="text-[#2563EB]" />
            </div>
            <span className="text-sm font-bold text-neutral-900">AI Detected Order</span>
            <span className="ml-auto text-[10px] font-semibold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Robot size={10} weight="fill" />
              AI
            </span>
          </div>

          {/* Extracted order details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={showOrder ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, ease: EASE }}
            className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <Package size={16} weight="duotone" className="text-neutral-400" />
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Extracted Order
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Product</span>
              <span className="text-sm font-semibold text-neutral-900">House Blend</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Quantity</span>
              <span className="text-sm font-semibold text-neutral-900">5 kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Buyer</span>
              <span className="text-sm font-semibold text-neutral-900">The Daily Grind</span>
            </div>
          </motion.div>

          {/* Convert to Order button */}
          <div className="mt-4">
            {!converted ? (
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg"
              >
                Convert to Order
                <ArrowRight size={14} weight="bold" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: DUR.element, ease: EASE }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg"
              >
                <CheckCircle size={16} weight="fill" />
                Order Created
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
