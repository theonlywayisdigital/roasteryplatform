"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, DUR } from "./shared";

/* ── Off Your Bean inline SVG logo ── */

function OffYourBeanLogo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100 20C60 20 30 55 30 95c0 25 10 45 25 58l-5 30c-1 6 4 11 10 10l15-3c7 4 16 6 25 6s18-2 25-6l15 3c6 1 11-4 10-10l-5-30c15-13 25-33 25-58 0-40-30-75-70-75z"
        fill="#F5F0EB"
        stroke="#1A1A1A"
        strokeWidth="6"
      />
      <ellipse cx="75" cy="90" rx="14" ry="16" fill="#1A1A1A" />
      <ellipse cx="125" cy="90" rx="14" ry="16" fill="#1A1A1A" />
      <path d="M95 110l5 8 5-8" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 130h56M80 130v10M90 130v10M100 130v10M110 130v10M120 130v10" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="65" cy="45" rx="8" ry="12" transform="rotate(-30 65 45)" fill="#1A1A1A" />
      <ellipse cx="85" cy="32" rx="8" ry="12" transform="rotate(-10 85 32)" fill="#1A1A1A" />
      <ellipse cx="110" cy="30" rx="8" ry="12" transform="rotate(15 110 30)" fill="#1A1A1A" />
      <ellipse cx="132" cy="42" rx="8" ry="12" transform="rotate(35 132 42)" fill="#1A1A1A" />
      <ellipse cx="50" cy="62" rx="7" ry="10" transform="rotate(-45 50 62)" fill="#1A1A1A" />
      <ellipse cx="148" cy="58" rx="7" ry="10" transform="rotate(50 148 58)" fill="#1A1A1A" />
    </svg>
  );
}

/* ── Invoice Status Badge ── */

function InvoiceStatusBadge({ isInView }: { isInView: boolean }) {
  const [status, setStatus] = useState<"Draft" | "Sent" | "Paid">("Draft");

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setStatus("Sent"), 2200);
    const t2 = setTimeout(() => setStatus("Paid"), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInView]);

  const colors = {
    Draft: "bg-neutral-100 text-neutral-500",
    Sent: "bg-blue-100 text-[#2563EB]",
    Paid: "bg-green-100 text-green-700",
  };

  return (
    <motion.span
      key={status}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: DUR.element, ease: EASE }}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
        colors[status]
      )}
    >
      {status === "Paid" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: DUR.element, ease: EASE }}
          className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"
        />
      )}
      {status}
    </motion.span>
  );
}

/* ── Invoice Animation ── */

export function InvoiceAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-lg flex flex-col">
      {/* Invoice header */}
      <div className="p-5 pb-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
          className="flex items-center justify-between mb-3"
        >
          <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider">
            Invoice
          </span>
          <InvoiceStatusBadge isInView={isInView} />
        </motion.div>

        {/* Brand bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: DUR.card, delay: 0.4, ease: EASE }}
          className="w-full h-1.5 bg-[#1A1A1A] rounded origin-left mb-5"
        />

        {/* Logo + Invoice number */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 0.8, ease: EASE }}
          className="flex items-center justify-between mb-5"
        >
          <div className="flex items-center gap-3">
            <OffYourBeanLogo size={36} />
            <span className="text-sm font-bold text-neutral-900">
              Off Your Bean
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#D97706] block">
              INVOICE
            </span>
            <span className="text-xs text-neutral-400">INV-0042</span>
          </div>
        </motion.div>
      </div>

      {/* Line items */}
      <div className="px-5 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.2, ease: EASE }}
          className="border-t border-neutral-100 py-2.5 flex justify-between text-xs text-neutral-400"
        >
          <span>Description</span>
          <span>Amount</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 1.5, ease: EASE }}
          className="border-t border-neutral-100 py-2.5 flex justify-between text-sm"
        >
          <span className="text-neutral-900">House Blend × 10</span>
          <span className="font-semibold text-neutral-900">£85.00</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.field, delay: 1.9, ease: EASE }}
          className="border-t border-neutral-200 py-3 flex justify-between"
        >
          <span className="font-bold text-neutral-900">Total</span>
          <span className="text-lg font-black text-[#1A1A1A]">£85.00</span>
        </motion.div>

        {/* Pay Now button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 2.3, ease: EASE }}
          className="py-4 flex justify-center mt-auto"
        >
          <button className="px-8 py-2.5 bg-[#D97706] text-white text-sm font-semibold rounded-lg">
            Pay Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}
