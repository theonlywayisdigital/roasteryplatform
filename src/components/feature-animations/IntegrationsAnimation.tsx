"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plugs, ShoppingBag } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

const categories = [
  {
    label: "Storefronts",
    connected: true,
    logos: [
      { name: "Shopify", color: "#96BF48" },
      { name: "WooCommerce", color: "#7F54B3" },
      { name: "Wix", color: "#0C6EFC" },
      { name: "Squarespace", color: "#1A1A1A" },
    ],
  },
  {
    label: "Accounting",
    connected: true,
    logos: [
      { name: "Xero", color: "#13B5EA" },
      { name: "QuickBooks", color: "#2CA01C" },
      { name: "Sage", color: "#00D639" },
    ],
  },
  {
    label: "Social",
    connected: false,
    logos: [
      { name: "Instagram", color: "#E1306C" },
      { name: "Facebook", color: "#1877F2" },
    ],
  },
  {
    label: "Google Merchant",
    connected: false,
    logos: [{ name: "Google", color: "#4285F4" }],
    hasShoppingIcon: true,
  },
];

export function IntegrationsAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
        className="flex items-center gap-2 mb-5"
      >
        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
          <Plugs size={18} weight="duotone" className="text-[#2563EB]" />
        </div>
        <span className="text-sm font-bold text-neutral-900">Integrations</span>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: DUR.field,
              delay: 0.4 + i * STAGGER.card,
              ease: EASE,
            }}
            className="relative p-4 rounded-lg border border-neutral-200 bg-neutral-50/50"
          >
            {/* Category label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-neutral-900">
                {cat.label}
              </span>
              {cat.connected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: DUR.element,
                    delay: 1.0 + i * STAGGER.card,
                    ease: EASE,
                  }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
              )}
            </div>

            {/* Logo marks */}
            <div className="flex items-center gap-2 flex-wrap">
              {cat.logos.map((logo, j) => (
                <motion.div
                  key={logo.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: DUR.element,
                    delay: 0.8 + i * STAGGER.card + j * 0.15,
                    ease: EASE,
                  }}
                  className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-md px-2 py-1.5"
                >
                  <div
                    className="w-4 h-4 rounded shrink-0"
                    style={{ backgroundColor: logo.color }}
                  />
                  <span className="text-[10px] font-medium text-neutral-700">
                    {logo.name}
                  </span>
                </motion.div>
              ))}
              {cat.hasShoppingIcon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: DUR.element,
                    delay: 0.8 + i * STAGGER.card + 0.3,
                    ease: EASE,
                  }}
                  className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-md px-2 py-1.5"
                >
                  <ShoppingBag size={14} weight="duotone" className="text-[#4285F4]" />
                  <span className="text-[10px] font-medium text-neutral-700">
                    Shopping
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
