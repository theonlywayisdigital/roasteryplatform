"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Package, User, Truck, CheckCircle as Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE, DUR, STAGGER } from "./shared";

const STATUS_CYCLE: { label: string; color: string }[] = [
  { label: "Pending", color: "bg-neutral-100 text-neutral-500" },
  { label: "Processing", color: "bg-blue-100 text-[#2563EB]" },
  { label: "Dispatched", color: "bg-amber-100 text-[#D97706]" },
  { label: "Delivered", color: "bg-green-100 text-green-700" },
];

const orders = [
  { buyer: "The Daily Grind", product: "House Blend × 10", amount: "£85.00" },
  { buyer: "Café Nero", product: "Ethiopia Yirga × 5", amount: "£62.50" },
  { buyer: "Bean & Gone", product: "Decaf Colombia × 8", amount: "£72.00" },
];

function StatusBadge({ statusIndex }: { statusIndex: number }) {
  const status = STATUS_CYCLE[statusIndex];
  return (
    <motion.span
      key={status.label}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: DUR.element, ease: EASE }}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
        status.color
      )}
    >
      {status.label === "Delivered" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: DUR.element, ease: EASE }}
          className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"
        />
      )}
      {status.label}
    </motion.span>
  );
}

export function OrderTrackingAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [statusIndices, setStatusIndices] = useState([0, 0, 0]);

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Stagger status cycling per row
    orders.forEach((_, rowIdx) => {
      const baseDelay = 1200 + rowIdx * 400;
      for (let step = 1; step < STATUS_CYCLE.length; step++) {
        timers.push(
          setTimeout(() => {
            setStatusIndices((prev) => {
              const next = [...prev];
              next[rowIdx] = step;
              return next;
            });
          }, baseDelay + step * 1200)
        );
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-lg p-5 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
        className="flex items-center gap-2 mb-4"
      >
        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
          <Package size={18} weight="duotone" className="text-[#2563EB]" />
        </div>
        <span className="text-sm font-bold text-neutral-900">Recent Orders</span>
      </motion.div>

      {/* Column headers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 0.4, ease: EASE }}
        className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 pb-2 border-b border-neutral-100 text-xs text-neutral-400 mb-1"
      >
        <span>Customer</span>
        <span>Product</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Status</span>
      </motion.div>

      {/* Order rows */}
      <div className="flex-1 flex flex-col justify-center space-y-1">
        {orders.map((order, i) => (
          <motion.div
            key={order.buyer}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: DUR.field,
              delay: 0.6 + i * STAGGER.card,
              ease: EASE,
            }}
            className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 items-center py-2.5 border-b border-neutral-50"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                <User size={14} weight="duotone" className="text-neutral-400" />
              </div>
              <span className="text-sm font-medium text-neutral-900 truncate">
                {order.buyer}
              </span>
            </div>
            <span className="text-sm text-neutral-600 truncate">{order.product}</span>
            <span className="text-sm font-semibold text-neutral-900 text-right">
              {order.amount}
            </span>
            <div className="flex justify-end">
              <StatusBadge statusIndex={statusIndices[i]} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
