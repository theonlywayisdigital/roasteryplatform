"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Storefront } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

const products = [
  {
    name: "Ethiopia Yirgacheffe",
    size: "250g",
    price: "£8.50",
    stock: 85,
    channel: "Wholesale",
  },
  {
    name: "House Blend",
    size: "500g",
    price: "£12.00",
    stock: 62,
    channel: "Wholesale",
  },
  {
    name: "Decaf Colombia",
    size: "1kg",
    price: "£18.50",
    stock: 34,
    channel: "Wholesale",
  },
];

function StockBar({ level, isInView, delay }: { level: number; isInView: boolean; delay: number }) {
  const color =
    level >= 60 ? "bg-green-500" : level >= 40 ? "bg-[#D97706]" : "bg-red-500";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: DUR.counter, delay, ease: EASE }}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: delay + 0.3, ease: EASE }}
        className="text-xs font-medium text-neutral-500 tabular-nums w-8 text-right"
      >
        {level}%
      </motion.span>
    </div>
  );
}

export function ProductManagementAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
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
        <span className="text-sm font-bold text-neutral-900">Product Catalogue</span>
      </motion.div>

      {/* Product cards */}
      <div className="space-y-3">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: DUR.field,
              delay: 0.5 + i * STAGGER.card,
              ease: EASE,
            }}
            className="p-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-neutral-900 truncate">
                    {product.name}
                  </p>
                  <span className="text-xs text-neutral-400">{product.size}</span>
                </div>
                <p className="text-sm font-bold text-[#2563EB] mt-0.5">{product.price}</p>
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: DUR.element,
                  delay: 0.8 + i * STAGGER.card,
                  ease: EASE,
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold flex-shrink-0"
              >
                <Storefront size={12} weight="duotone" />
                {product.channel}
              </motion.span>
            </div>

            {/* Stock level */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-400">Stock level</span>
              </div>
              <StockBar
                level={product.stock}
                isInView={isInView}
                delay={0.9 + i * STAGGER.card}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
