"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  ShoppingCart,
  Package,
  Receipt,
  CheckCircle,
  TrendDown,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE, DUR, STAGGER } from "./shared";

/* ── Animated counter ── */

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

/* ── Invoice Status Badge ── */

function InvoiceStatusBadge({ isInView }: { isInView: boolean }) {
  const [status, setStatus] = useState<"Draft" | "Sent">("Draft");

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setStatus("Sent"), 2800);
    return () => clearTimeout(t);
  }, [isInView]);

  const colors = {
    Draft: "bg-neutral-100 text-neutral-500",
    Sent: "bg-blue-100 text-[#2563EB]",
  };

  return (
    <motion.span
      key={status}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: DUR.element, ease: EASE }}
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
        colors[status]
      )}
    >
      {status}
    </motion.span>
  );
}

/* ── Main component ── */

export function SalesSuiteAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stockCount = useAnimatedCounter(86, isInView, DUR.counter, 2.0);

  return (
    <div ref={ref} className="space-y-3">
      {/* Order card sliding in */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: DUR.card, delay: 0.3, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
            <ShoppingCart size={18} weight="duotone" className="text-[#2563EB]" />
          </div>
          <span className="text-sm font-bold text-neutral-900">New Order</span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: DUR.element, delay: 0.8, ease: EASE }}
            className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700"
          >
            <CheckCircle size={10} weight="fill" className="mr-1" />
            Confirmed
          </motion.span>
        </div>

        {/* Order details */}
        <div className="space-y-2.5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 0.6, ease: EASE }}
            className="flex items-center justify-between"
          >
            <span className="text-xs text-neutral-400">Buyer</span>
            <span className="text-sm font-semibold text-neutral-900">The Daily Grind</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 0.6 + STAGGER.field, ease: EASE }}
            className="flex items-center justify-between"
          >
            <span className="text-xs text-neutral-400">Product</span>
            <span className="text-sm font-semibold text-neutral-900">House Blend 1kg × 10</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.field, delay: 0.6 + STAGGER.field * 2, ease: EASE }}
            className="flex items-center justify-between border-t border-neutral-100 pt-2.5"
          >
            <span className="text-xs font-bold text-neutral-900">Total</span>
            <span className="text-lg font-black text-neutral-900">£85.00</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stock bar decreasing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 1.6, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center">
              <TrendDown size={14} weight="duotone" className="text-[#D97706]" />
            </div>
            <span className="text-xs font-medium text-neutral-500">House Blend Stock</span>
          </div>
          <span className="text-lg font-black text-neutral-900 tabular-nums">
            {stockCount}
            <span className="text-xs font-medium text-neutral-400 ml-0.5">kg</span>
          </span>
        </div>
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#D97706] rounded-full"
            initial={{ width: "96%" }}
            animate={isInView ? { width: "86%" } : {}}
            transition={{ duration: DUR.counter, delay: 2.0, ease: EASE }}
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 2.4, ease: EASE }}
          className="text-[10px] text-red-400 block mt-1"
        >
          ▼ 10kg allocated
        </motion.span>
      </motion.div>

      {/* Invoice card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.card, delay: 2.2, ease: EASE }}
        className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D97706]/10 flex items-center justify-center">
              <Receipt size={18} weight="duotone" className="text-[#D97706]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">INV-0048</p>
              <p className="text-xs text-neutral-400">The Daily Grind · £85.00</p>
            </div>
          </div>
          <InvoiceStatusBadge isInView={isInView} />
        </div>
      </motion.div>
    </div>
  );
}
