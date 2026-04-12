"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { FadeIn, FadeInStagger } from "@/components/ui";
import { cn } from "@/lib/utils";

/* ── Shared constants ────────────────────────────────── */

const PLATFORM_URL = "https://app.roasteryplatform.com";
const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const staggerChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE as unknown as [number, number, number, number] },
  },
};

/* ── Reusable mockup primitives ──────────────────────── */

function MockupCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-neutral-200 shadow-lg p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

function MockupLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-medium text-neutral-400 mb-1">
      {children}
    </span>
  );
}

function MockupField({
  label,
  value,
  delay = 0,
  isInView,
}: {
  label: string;
  value: string;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <MockupLabel>{label}</MockupLabel>
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 font-medium">
        {value}
      </div>
    </motion.div>
  );
}

/* ── Animated counter hook ───────────────────────────── */

function useAnimatedCounter(
  target: number,
  isInView: boolean,
  duration: number = 1,
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

/* ── Scene layout wrapper ────────────────────────────── */

function Scene({
  headline,
  subheadline,
  children,
  reverse = false,
  id,
}: {
  headline: string;
  subheadline: string;
  children: React.ReactNode;
  reverse?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
            reverse && "lg:[direction:rtl]"
          )}
        >
          <div className={cn(reverse && "lg:[direction:ltr]")}>
            <FadeIn direction={reverse ? "right" : "left"}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 mb-4">
                {headline}
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-lg">
                {subheadline}
              </p>
            </FadeIn>
          </div>
          <div className={cn(reverse && "lg:[direction:ltr]")}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SCENE 1 — Add Green Stock
   ═══════════════════════════════════════════════════════ */

export function Scene1AddGreenStock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const stockCount = useAnimatedCounter(120, isInView, 1.2, 0.8);

  return (
    <Scene
      id="scene-1"
      headline="It starts with the green bean."
      subheadline="Log every pallet you receive. Origin, weight, price paid — your inventory starts here."
    >
      <FadeIn direction="right">
        <div ref={ref} className="space-y-4">
          <MockupCard>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span className="text-sm font-semibold text-neutral-900">
                Add Green Bean
              </span>
            </div>
            <div className="space-y-3">
              <MockupField
                label="Name *"
                value="Ethiopia Yirgacheffe"
                delay={0.1}
                isInView={isInView}
              />
              <div className="grid grid-cols-3 gap-3">
                <MockupField
                  label="Origin Country"
                  value="Ethiopia"
                  delay={0.3}
                  isInView={isInView}
                />
                <MockupField
                  label="Initial Stock (kg)"
                  value="120"
                  delay={0.5}
                  isInView={isInView}
                />
                <MockupField
                  label="Cost per kg (£)"
                  value="8.50"
                  delay={0.7}
                  isInView={isInView}
                />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9, ease: EASE }}
              className="mt-4"
            >
              <button className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg">
                Add Green Bean
              </button>
            </motion.div>
          </MockupCard>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1, ease: EASE }}
          >
            <MockupCard className="!p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2v12M2 8h12"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-700">
                  Green Stock Total
                </span>
              </div>
              <span className="text-2xl font-black text-neutral-900 tabular-nums">
                {stockCount}
                <span className="text-sm font-medium text-neutral-400 ml-1">
                  kg
                </span>
              </span>
            </MockupCard>
          </motion.div>
        </div>
      </FadeIn>
    </Scene>
  );
}

/* ═══════════════════════════════════════════════════════
   SCENE 2 — Log a Roast
   ═══════════════════════════════════════════════════════ */

export function Scene2LogRoast() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const greenStock = useAnimatedCounter(108, isInView, 1, 0.6);
  const roastedStock = useAnimatedCounter(10, isInView, 1, 0.6);

  return (
    <Scene
      id="scene-2"
      headline="Roast it. Track it. Automatically."
      subheadline="Log every roast and your green stock adjusts in real time. Weight loss calculated, roasted stock updated."
      reverse
    >
      <FadeIn direction="left">
        <div ref={ref} className="space-y-4">
          <MockupCard>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-[#D97706]/10 flex items-center justify-center">
                <span className="text-xs">🔥</span>
              </div>
              <span className="text-sm font-semibold text-neutral-900">
                Log Roast
              </span>
            </div>
            <div className="space-y-3">
              <MockupField
                label="Green Bean"
                value="Ethiopia Yirgacheffe"
                delay={0.1}
                isInView={isInView}
              />
              <div className="grid grid-cols-2 gap-3">
                <MockupField
                  label="Green Weight (kg) *"
                  value="12"
                  delay={0.3}
                  isInView={isInView}
                />
                <MockupField
                  label="Roasted Weight (kg) *"
                  value="10"
                  delay={0.5}
                  isInView={isInView}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
              >
                <MockupLabel>Weight Loss</MockupLabel>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm font-semibold text-[#D97706]">
                  16.7%
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9, ease: EASE }}
              className="mt-4"
            >
              <button className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg">
                Log Roast
              </button>
            </motion.div>
          </MockupCard>

          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            >
              <MockupCard className="!p-4 text-center">
                <span className="text-xs font-medium text-neutral-400 block mb-1">
                  Green Stock
                </span>
                <span className="text-xl font-black text-red-500 tabular-nums">
                  {greenStock}
                  <span className="text-xs font-medium text-neutral-400 ml-1">
                    kg
                  </span>
                </span>
                <span className="text-xs text-red-400 block">▼ 12kg</span>
              </MockupCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1, ease: EASE }}
            >
              <MockupCard className="!p-4 text-center">
                <span className="text-xs font-medium text-neutral-400 block mb-1">
                  Roasted Stock
                </span>
                <span className="text-xl font-black text-green-600 tabular-nums">
                  {roastedStock}
                  <span className="text-xs font-medium text-neutral-400 ml-1">
                    kg
                  </span>
                </span>
                <span className="text-xs text-green-500 block">▲ 10kg</span>
              </MockupCard>
            </motion.div>
          </div>
        </div>
      </FadeIn>
    </Scene>
  );
}

/* ═══════════════════════════════════════════════════════
   SCENE 3 — Build Your Products
   ═══════════════════════════════════════════════════════ */

export function Scene3BuildProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    { name: "Ethiopia Single Origin", weight: "250g", price: "£9.50" },
    { name: "House Blend", weight: "1kg", price: "£28.00" },
    { name: "Espresso Dark", weight: "500g", price: "£14.00" },
  ];

  return (
    <Scene
      id="scene-3"
      headline="Turn your roasts into products."
      subheadline="Create bags, blends and variants. Set your prices, define your weights — your full product range in one place."
    >
      <FadeIn direction="right">
        <div ref={ref} className="space-y-4">
          <MockupCard>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span className="text-sm font-semibold text-neutral-900">
                Add Product
              </span>
            </div>
            <div className="space-y-3">
              <MockupField
                label="Product Name"
                value="Ethiopia Single Origin"
                delay={0.1}
                isInView={isInView}
              />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
              >
                <MockupLabel>Variants</MockupLabel>
                <div className="flex gap-2">
                  {[
                    { size: "250g", price: "£9.50" },
                    { size: "500g", price: "£17.00" },
                    { size: "1kg", price: "£30.00" },
                  ].map((v, i) => (
                    <motion.div
                      key={v.size}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + i * 0.15,
                        ease: EASE,
                      }}
                      className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-center"
                    >
                      <span className="text-xs font-bold text-neutral-900 block">
                        {v.size}
                      </span>
                      <span className="text-xs text-neutral-500">{v.price}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </MockupCard>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1, ease: EASE }}
            className="grid grid-cols-3 gap-3"
          >
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 1.1 + i * 0.15,
                  ease: EASE,
                }}
              >
                <MockupCard className="!p-3">
                  <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 mb-2 flex items-center justify-center">
                    <span className="text-2xl">☕</span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-900 truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {p.weight} · {p.price}
                  </p>
                </MockupCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeIn>
    </Scene>
  );
}

/* ═══════════════════════════════════════════════════════
   SCENE 4 — Bespoke Wholesale Portal
   ═══════════════════════════════════════════════════════ */

export function Scene4WholesalePortal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeColor, setActiveColor] = useState("#1A1A1A");
  const [accentColor, setAccentColor] = useState("#D97706");

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setActiveColor("#2563EB"), 1200);
    const t2 = setTimeout(() => setAccentColor("#2563EB"), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInView]);

  return (
    <Scene
      id="scene-4"
      headline="Your brand. Their experience."
      subheadline="Give every wholesale buyer a branded ordering portal. Your logo, your colours — it looks like you built it yourself."
      reverse
    >
      <FadeIn direction="left">
        <div ref={ref} className="grid grid-cols-5 gap-4">
          {/* Left: Branding controls */}
          <div className="col-span-2">
            <MockupCard className="!p-4 space-y-4">
              <span className="text-xs font-semibold text-neutral-900 block">
                Brand Identity
              </span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
              >
                <MockupLabel>Logo</MockupLabel>
                <div className="w-full h-14 border-2 border-dashed border-neutral-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-neutral-400">Upload logo</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
              >
                <MockupLabel>Primary colour</MockupLabel>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-7 h-7 rounded-md border border-neutral-200 cursor-pointer ring-2 ring-[#2563EB]/30"
                    animate={{ backgroundColor: activeColor }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  <span className="text-xs text-neutral-500 font-mono">
                    {activeColor}
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
              >
                <MockupLabel>Accent colour</MockupLabel>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-7 h-7 rounded-md border border-neutral-200"
                    animate={{ backgroundColor: accentColor }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  <span className="text-xs text-neutral-500 font-mono">
                    {accentColor}
                  </span>
                </div>
              </motion.div>
            </MockupCard>
          </div>

          {/* Right: Portal preview */}
          <div className="col-span-3">
            <MockupCard className="!p-0 overflow-hidden">
              <motion.div
                className="h-28 flex items-end p-4"
                animate={{ backgroundColor: activeColor }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-white text-sm font-bold">
                    Your Roastery
                  </span>
                  <div className="flex gap-3 text-white/70 text-xs">
                    <span>Shop</span>
                    <span>Wholesale</span>
                    <span>Contact</span>
                  </div>
                </div>
              </motion.div>
              <div className="p-4">
                <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
                  Our Coffee
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-neutral-100" />
                      <div className="h-2 w-3/4 bg-neutral-200 rounded" />
                      <div className="h-2 w-1/2 bg-neutral-100 rounded" />
                      <motion.button
                        className="w-full py-1.5 rounded-md text-white text-xs font-semibold"
                        animate={{ backgroundColor: accentColor }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        Order
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </MockupCard>
          </div>
        </div>
      </FadeIn>
    </Scene>
  );
}

/* ═══════════════════════════════════════════════════════
   SCENE 5 — Buyers Order
   ═══════════════════════════════════════════════════════ */

export function Scene5BuyersOrder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const stockLevel = useAnimatedCounter(85, isInView, 0.8, 1.2);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setShowOrder(true), 600);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <Scene
      id="scene-5"
      headline="Your buyers order. Stock is committed instantly."
      subheadline="When an order comes in, stock is reserved automatically. No spreadsheets, no double selling."
    >
      <FadeIn direction="right">
        <div ref={ref} className="space-y-4">
          {/* Incoming order card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={
              showOrder
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 60, scale: 0.95 }
            }
            transition={{ duration: 0.5, ease: EASE }}
          >
            <MockupCard className="border-[#2563EB]/30 border-l-4 !border-l-[#2563EB]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                    <span className="text-xs">📦</span>
                  </div>
                  <span className="text-xs font-semibold text-[#2563EB]">
                    New Order
                  </span>
                </div>
                <span className="text-xs text-neutral-400">Just now</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Buyer</span>
                  <span className="font-medium text-neutral-900">
                    The Corner Cafe
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Product</span>
                  <span className="font-medium text-neutral-900">
                    House Blend 1kg
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Quantity</span>
                  <span className="font-medium text-neutral-900">× 5</span>
                </div>
              </div>
            </MockupCard>
          </motion.div>

          {/* Stock level indicator */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.4, ease: EASE }}
          >
            <MockupCard className="!p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-500">
                  House Blend — Available Stock
                </span>
                <span className="text-sm font-bold text-neutral-900 tabular-nums">
                  {stockLevel}
                  <span className="text-xs font-normal text-neutral-400 ml-1">
                    / 90 kg
                  </span>
                </span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#2563EB]"
                  initial={{ width: "100%" }}
                  animate={isInView ? { width: "94%" } : {}}
                  transition={{ duration: 1, delay: 1.2, ease: EASE }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.6, ease: EASE }}
                className="text-xs text-neutral-400 mt-2"
              >
                5kg reserved for ORD-1042
              </motion.p>
            </MockupCard>
          </motion.div>
        </div>
      </FadeIn>
    </Scene>
  );
}

/* ═══════════════════════════════════════════════════════
   SCENE 6 — Invoice & Get Paid
   ═══════════════════════════════════════════════════════ */

function InvoiceStatusBadge({ isInView }: { isInView: boolean }) {
  const [status, setStatus] = useState<"Draft" | "Sent" | "Paid">("Draft");

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setStatus("Sent"), 1400);
    const t2 = setTimeout(() => setStatus("Paid"), 2400);
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
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
        colors[status]
      )}
    >
      {status === "Paid" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"
        />
      )}
      {status}
    </motion.span>
  );
}

export function Scene6Invoice() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Scene
      id="scene-6"
      headline="Invoice in seconds. Get paid faster."
      subheadline="Generate professional invoices straight from your orders. Send, track, reconcile — without leaving the platform."
      reverse
    >
      <FadeIn direction="left">
        <div ref={ref}>
          <MockupCard className="!p-0 overflow-hidden">
            {/* Invoice header */}
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
                  Invoice
                </span>
                <InvoiceStatusBadge isInView={isInView} />
              </div>
              <div className="w-full h-1 bg-neutral-900 rounded mb-6" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-xs text-neutral-400 font-medium">
                    Logo
                  </div>
                  <span className="text-base font-bold text-neutral-900">
                    Your Roastery
                  </span>
                </div>
                <div className="text-right">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    className="text-sm font-bold text-[#2563EB] block"
                  >
                    INVOICE
                  </motion.span>
                  <span className="text-xs text-neutral-400">INV-0042</span>
                </div>
              </div>
            </div>

            {/* Line items */}
            <div className="px-6">
              <div className="border-t border-neutral-100 py-3 flex justify-between text-xs text-neutral-400">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
                className="border-t border-neutral-100 py-3 flex justify-between text-sm"
              >
                <span className="text-neutral-900">House Blend × 10</span>
                <span className="font-semibold text-neutral-900">£85.00</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9, ease: EASE }}
                className="border-t border-neutral-200 py-4 flex justify-between"
              >
                <span className="font-bold text-neutral-900">Total</span>
                <span className="text-lg font-black text-[#2563EB]">
                  £85.00
                </span>
              </motion.div>
            </div>

            {/* Pay Now button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.2, ease: EASE }}
              className="p-6 pt-2 flex justify-center"
            >
              <button className="px-8 py-2.5 bg-[#D97706] text-white text-sm font-semibold rounded-lg">
                Pay Now
              </button>
            </motion.div>
          </MockupCard>
        </div>
      </FadeIn>
    </Scene>
  );
}

/* ═══════════════════════════════════════════════════════
   ACT 2 — Feature Cards
   ═══════════════════════════════════════════════════════ */

function FeatureCardIntegrations() {
  return (
    <MockupCard className="h-full">
      <h3 className="text-lg font-bold text-neutral-900 mb-2">Integrations</h3>
      <p className="text-sm text-neutral-600 mb-5">
        Connect your existing shopfronts.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: "Shopify", color: "#96BF48" },
          { name: "WooCommerce", color: "#7F54B3" },
          { name: "Wix", color: "#0C6EFC" },
          { name: "Squarespace", color: "#000000" },
        ].map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2"
          >
            <div
              className="w-5 h-5 rounded"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-xs font-medium text-neutral-700">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </MockupCard>
  );
}

function FeatureCardMarketing() {
  return (
    <MockupCard className="h-full">
      <h3 className="text-lg font-bold text-neutral-900 mb-2">
        Marketing Suite
      </h3>
      <p className="text-sm text-neutral-600 mb-5">
        Communicate with customers and leads.
      </p>
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded bg-[#2563EB]/10 flex items-center justify-center">
            <span className="text-xs">✉️</span>
          </div>
          <span className="text-xs font-semibold text-neutral-900">
            Campaign Preview
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-neutral-200 rounded" />
          <div className="h-2 w-3/4 bg-neutral-200 rounded" />
          <div className="h-8 w-24 bg-[#2563EB] rounded mt-3" />
        </div>
      </div>
    </MockupCard>
  );
}

function FeatureCardCalendar() {
  return (
    <MockupCard className="h-full">
      <h3 className="text-lg font-bold text-neutral-900 mb-2">
        Content Calendar
      </h3>
      <p className="text-sm text-neutral-600 mb-5">
        Schedule your social media posts.
      </p>
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span
              key={`${d}-${i}`}
              className="text-center text-[10px] font-medium text-neutral-400"
            >
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 28 }).map((_, i) => {
            const hasPost = [2, 5, 9, 14, 18, 22, 25].includes(i);
            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded flex items-center justify-center text-[10px]",
                  hasPost
                    ? "bg-[#2563EB] text-white font-bold"
                    : "bg-white text-neutral-400"
                )}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </MockupCard>
  );
}

export function Act2Features() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 mb-4">
              Everything else in one place.
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              Roastery Platform goes beyond operations.
            </p>
          </div>
        </FadeIn>
        <FadeInStagger
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          staggerDelay={0.15}
        >
          <motion.div variants={staggerChildVariants}>
            <FeatureCardIntegrations />
          </motion.div>
          <motion.div variants={staggerChildVariants}>
            <FeatureCardMarketing />
          </motion.div>
          <motion.div variants={staggerChildVariants}>
            <FeatureCardCalendar />
          </motion.div>
        </FadeInStagger>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CTA BLOCKS
   ═══════════════════════════════════════════════════════ */

export function CtaBlock({
  headline,
  buttonText,
  variant = "accent",
}: {
  headline: string;
  buttonText: string;
  variant?: "accent" | "dark";
}) {
  const bg = variant === "accent" ? "bg-accent" : "bg-neutral-900";
  return (
    <section className={cn("py-16 lg:py-20", bg)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-6">
              {headline}
            </h2>
            <a
              href={`${PLATFORM_URL}/signup`}
              className={cn(
                "inline-flex items-center px-8 py-4 border-2 font-semibold text-lg rounded-lg transition-colors",
                variant === "accent"
                  ? "border-white bg-white text-accent hover:bg-transparent hover:text-white"
                  : "border-accent bg-accent text-white hover:bg-transparent hover:text-accent"
              )}
            >
              {buttonText}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════ */

export function FinalCta() {
  return (
    <section className="py-24 lg:py-32 bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8">
              Your roastery.{" "}
              <span className="text-accent">Fully under control.</span>
            </h2>
            <a
              href={`${PLATFORM_URL}/signup`}
              className="inline-flex items-center px-8 py-4 border-2 border-accent bg-accent text-white font-semibold text-lg rounded-lg hover:bg-transparent hover:text-accent transition-colors"
            >
              Get started free
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
