"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { FadeIn, FadeInStagger } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Leaf,
  Fire,
  Package,
  Storefront,
  ShoppingCart,
  PlusCircle,
  TrendDown,
  TrendUp,
  Envelope,
  CalendarBlank,
  Plugs,
} from "@phosphor-icons/react";

/* ── Scroll indicator ─────────────────────────────────── */

export function ScrollIndicator() {
  return (
    <motion.a
      href="#scene-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2, ease: EASE }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-accent transition-colors"
    >
      <span className="text-xs font-medium tracking-wide uppercase">
        Scroll to explore
      </span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M4 7l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.a>
  );
}

/* ── Shared constants ────────────────────────────────── */

const PLATFORM_URL = "https://app.roasteryplatform.com";
const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/* Cinematic — deliberate, slow reveals */
const DUR = {
  field: 0.8,
  card: 1.0,
  element: 0.7,
  counter: 1.8,
  color: 1.2,
} as const;

const STAGGER = {
  field: 0.35,
  card: 0.25,
  variant: 0.3,
} as const;

const staggerChildVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.card, ease: EASE },
  },
};

/* ── Off Your Bean inline SVG logo ───────────────────── */

function OffYourBeanLogo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Skull outline */}
      <path
        d="M100 20C60 20 30 55 30 95c0 25 10 45 25 58l-5 30c-1 6 4 11 10 10l15-3c7 4 16 6 25 6s18-2 25-6l15 3c6 1 11-4 10-10l-5-30c15-13 25-33 25-58 0-40-30-75-70-75z"
        fill="#F5F0EB"
        stroke="#1A1A1A"
        strokeWidth="6"
      />
      {/* Left eye */}
      <ellipse cx="75" cy="90" rx="14" ry="16" fill="#1A1A1A" />
      {/* Right eye */}
      <ellipse cx="125" cy="90" rx="14" ry="16" fill="#1A1A1A" />
      {/* Nose */}
      <path d="M95 110l5 8 5-8" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Teeth */}
      <path d="M72 130h56M80 130v10M90 130v10M100 130v10M110 130v10M120 130v10" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      {/* Coffee beans on head */}
      <ellipse cx="65" cy="45" rx="8" ry="12" transform="rotate(-30 65 45)" fill="#1A1A1A" />
      <ellipse cx="85" cy="32" rx="8" ry="12" transform="rotate(-10 85 32)" fill="#1A1A1A" />
      <ellipse cx="110" cy="30" rx="8" ry="12" transform="rotate(15 110 30)" fill="#1A1A1A" />
      <ellipse cx="132" cy="42" rx="8" ry="12" transform="rotate(35 132 42)" fill="#1A1A1A" />
      <ellipse cx="50" cy="62" rx="7" ry="10" transform="rotate(-45 50 62)" fill="#1A1A1A" />
      <ellipse cx="148" cy="58" rx="7" ry="10" transform="rotate(50 148 58)" fill="#1A1A1A" />
    </svg>
  );
}

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
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DUR.field, delay, ease: EASE }}
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
            <FadeIn
              direction={reverse ? "right" : "left"}
              duration={DUR.card}
            >
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
  const stockCount = useAnimatedCounter(120, isInView, DUR.counter, 1.6);

  return (
    <Scene
      id="scene-1"
      headline="It starts with the green bean."
      subheadline="Log every pallet you receive. Origin, weight, price paid — your inventory starts here."
    >
      <FadeIn direction="right" duration={DUR.card}>
        <div ref={ref} className="space-y-4">
          <MockupCard>
            <div className="flex items-center gap-2 mb-5">
              <Leaf size={20} weight="duotone" className="text-green-600" />
              <span className="text-sm font-semibold text-neutral-900">
                Add Green Bean
              </span>
            </div>
            <div className="space-y-3">
              <MockupField
                label="Name *"
                value="Ethiopia Yirgacheffe"
                delay={0.2}
                isInView={isInView}
              />
              <div className="grid grid-cols-3 gap-3">
                <MockupField
                  label="Origin Country"
                  value="Ethiopia"
                  delay={0.2 + STAGGER.field}
                  isInView={isInView}
                />
                <MockupField
                  label="Initial Stock (kg)"
                  value="120"
                  delay={0.2 + STAGGER.field * 2}
                  isInView={isInView}
                />
                <MockupField
                  label="Cost per kg (£)"
                  value="8.50"
                  delay={0.2 + STAGGER.field * 3}
                  isInView={isInView}
                />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: DUR.element, delay: 1.6, ease: EASE }}
              className="mt-4"
            >
              <button className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg">
                Add Green Bean
              </button>
            </motion.div>
          </MockupCard>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.card, delay: 1.8, ease: EASE }}
          >
            <MockupCard className="!p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <PlusCircle size={20} weight="duotone" className="text-green-600" />
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
  const greenStock = useAnimatedCounter(108, isInView, DUR.counter, 1.2);
  const roastedStock = useAnimatedCounter(10, isInView, DUR.counter, 1.2);

  return (
    <Scene
      id="scene-2"
      headline="Roast it. Track it. Automatically."
      subheadline="Log every roast and your green stock adjusts in real time. Weight loss calculated, roasted stock updated."
      reverse
    >
      <FadeIn direction="left" duration={DUR.card}>
        <div ref={ref} className="space-y-4">
          <MockupCard>
            <div className="flex items-center gap-2 mb-5">
              <Fire size={20} weight="duotone" className="text-[#D97706]" />
              <span className="text-sm font-semibold text-neutral-900">
                Log Roast
              </span>
            </div>
            <div className="space-y-3">
              <MockupField
                label="Green Bean"
                value="Ethiopia Yirgacheffe"
                delay={0.2}
                isInView={isInView}
              />
              <div className="grid grid-cols-2 gap-3">
                <MockupField
                  label="Green Weight (kg) *"
                  value="12"
                  delay={0.2 + STAGGER.field}
                  isInView={isInView}
                />
                <MockupField
                  label="Roasted Weight (kg) *"
                  value="10"
                  delay={0.2 + STAGGER.field * 2}
                  isInView={isInView}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: DUR.element, delay: 1.3, ease: EASE }}
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
              transition={{ duration: DUR.element, delay: 1.6, ease: EASE }}
              className="mt-4"
            >
              <button className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg">
                Log Roast
              </button>
            </motion.div>
          </MockupCard>

          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.card, delay: 1.5, ease: EASE }}
            >
              <MockupCard className="!p-4 text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendDown size={16} weight="duotone" className="text-red-500 mr-1" />
                  <span className="text-xs font-medium text-neutral-400">
                    Green Stock
                  </span>
                </div>
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.card, delay: 1.8, ease: EASE }}
            >
              <MockupCard className="!p-4 text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendUp size={16} weight="duotone" className="text-green-600 mr-1" />
                  <span className="text-xs font-medium text-neutral-400">
                    Roasted Stock
                  </span>
                </div>
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
   SCENE — Products & Integrations (combined)
   ═══════════════════════════════════════════════════════ */

const integrations = [
  { name: "Shopify", color: "#96BF48" },
  { name: "WooCommerce", color: "#7F54B3" },
  { name: "Wix", color: "#0C6EFC" },
  { name: "Squarespace", color: "#000000" },
];

export function SceneProductsAndIntegrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Scene
      id="scene-products"
      headline="Add your products. Sell everywhere."
      subheadline="Build your product range and map it directly to your roasted stock. Publish to your wholesale portal or connect your existing online store — Shopify, WooCommerce, Wix or Squarespace."
    >
      <FadeIn direction="right" duration={DUR.card}>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left — Product card being built */}
          <MockupCard className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Package size={20} weight="duotone" className="text-[#2563EB]" />
              <span className="text-sm font-semibold text-neutral-900">
                Add Product
              </span>
            </div>
            <MockupField
              label="Product Name"
              value="Ethiopia Single Origin"
              delay={0.2}
              isInView={isInView}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.field, delay: 0.2 + STAGGER.field, ease: EASE }}
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
                      duration: DUR.element,
                      delay: 1.0 + i * STAGGER.variant,
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
            <MockupField
              label="Roasted Stock"
              value="Ethiopia Yirgacheffe — 10 kg"
              delay={1.0 + STAGGER.variant * 3}
              isInView={isInView}
            />
            <MockupField
              label="Price"
              value="£9.50"
              delay={1.0 + STAGGER.variant * 4}
              isInView={isInView}
            />
          </MockupCard>

          {/* Right — Integrations tiles that light up */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.field, delay: 2.2, ease: EASE }}
            >
              <MockupCard className="!p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Plugs size={18} weight="duotone" className="text-[#2563EB]" />
                  <span className="text-xs font-semibold text-neutral-900">
                    Sell across channels
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {integrations.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0.4, scale: 0.95 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0.4, scale: 0.95 }
                      }
                      transition={{
                        duration: DUR.element,
                        delay: 2.6 + i * STAGGER.card,
                        ease: EASE,
                      }}
                      className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 relative"
                    >
                      <div
                        className="w-5 h-5 rounded shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-xs font-medium text-neutral-700">
                        {s.name}
                      </span>
                      {/* Connected indicator */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0 }
                        }
                        transition={{
                          duration: DUR.element,
                          delay: 3.0 + i * STAGGER.card,
                          ease: EASE,
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path
                            d="M1.5 4L3.5 6L6.5 2"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </MockupCard>
            </motion.div>

            {/* Wholesale portal tile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.field, delay: 3.6, ease: EASE }}
            >
              <MockupCard className="!p-4">
                <div className="flex items-center gap-2">
                  <Storefront size={18} weight="duotone" className="text-[#2563EB]" />
                  <span className="text-xs font-semibold text-neutral-900">
                    Wholesale Portal
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: DUR.element, delay: 4.0, ease: EASE }}
                    className="ml-auto text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full"
                  >
                    Published
                  </motion.span>
                </div>
              </MockupCard>
            </motion.div>
          </div>
        </div>
      </FadeIn>
    </Scene>
  );
}

/* ═══════════════════════════════════════════════════════
   SCENE 4 — Bespoke Wholesale Portal (Dramatic Rebrand)
   ═══════════════════════════════════════════════════════ */

export function Scene4WholesalePortal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /* Animation stage flags */
  const [stage, setStage] = useState(0);
  // 0 = blank/default, 1 = logo drops in, 2 = bg floods, 3 = accent follows

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setStage(1), 1200);  // logo appears
    const t2 = setTimeout(() => setStage(2), 2200);  // background floods to black
    const t3 = setTimeout(() => setStage(3), 3200);  // accent colours follow
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView]);

  const primaryColor = stage >= 2 ? "#1A1A1A" : "#E2E8F0";
  const accentColor = stage >= 3 ? "#D97706" : "#CBD5E1";
  const primaryHex = stage >= 2 ? "#1A1A1A" : "#E2E8F0";
  const accentHex = stage >= 3 ? "#D97706" : "#CBD5E1";

  return (
    <Scene
      id="scene-4"
      headline="Your brand. Their experience."
      subheadline="Give every wholesale buyer a branded ordering portal. Your logo, your colours — it looks like you built it yourself."
      reverse
    >
      <FadeIn direction="left" duration={DUR.card}>
        <div ref={ref} className="grid grid-cols-5 gap-4">
          {/* Left: Branding controls */}
          <div className="col-span-2">
            <MockupCard className="!p-4 space-y-4">
              <span className="text-xs font-semibold text-neutral-900 block">
                Brand Identity
              </span>

              {/* Logo upload */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: DUR.element, delay: 0.3, ease: EASE }}
              >
                <MockupLabel>Logo</MockupLabel>
                <div className="w-full h-14 border-2 border-dashed border-neutral-200 rounded-lg flex items-center justify-center overflow-hidden relative">
                  <motion.span
                    className="text-xs text-neutral-400 absolute"
                    animate={{ opacity: stage >= 1 ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    Upload logo
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.7 }}
                    animate={
                      stage >= 1
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 20, scale: 0.7 }
                    }
                    transition={{ duration: DUR.color, ease: EASE }}
                  >
                    <OffYourBeanLogo size={36} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Primary colour */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: DUR.element, delay: 0.6, ease: EASE }}
              >
                <MockupLabel>Primary colour</MockupLabel>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-7 h-7 rounded-md border border-neutral-200"
                    animate={{ backgroundColor: primaryColor }}
                    transition={{ duration: DUR.color, ease: EASE }}
                  />
                  <motion.span
                    className="text-xs text-neutral-500 font-mono"
                    key={primaryHex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {primaryHex}
                  </motion.span>
                </div>
              </motion.div>

              {/* Accent colour */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: DUR.element, delay: 0.9, ease: EASE }}
              >
                <MockupLabel>Accent colour</MockupLabel>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-7 h-7 rounded-md border border-neutral-200"
                    animate={{ backgroundColor: accentColor }}
                    transition={{ duration: DUR.color, ease: EASE }}
                  />
                  <motion.span
                    className="text-xs text-neutral-500 font-mono"
                    key={accentHex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {accentHex}
                  </motion.span>
                </div>
              </motion.div>
            </MockupCard>
          </div>

          {/* Right: Portal preview — dramatic transformation */}
          <div className="col-span-3">
            <MockupCard className="!p-0 overflow-hidden">
              {/* Hero banner area */}
              <motion.div
                className="h-32 flex flex-col justify-end p-4 relative overflow-hidden"
                animate={{ backgroundColor: primaryColor }}
                transition={{ duration: DUR.color, ease: EASE }}
              >
                {/* Nav bar at top */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2">
                  {/* Logo in nav */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      stage >= 1
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{ duration: DUR.card, ease: EASE }}
                  >
                    <OffYourBeanLogo size={24} />
                  </motion.div>
                  <div className="flex gap-3 text-xs">
                    <motion.span
                      animate={{ color: stage >= 2 ? "#ffffff" : "#64748b" }}
                      transition={{ duration: DUR.color, ease: EASE }}
                    >
                      Shop
                    </motion.span>
                    <motion.span
                      animate={{ color: stage >= 2 ? "#ffffff" : "#64748b" }}
                      transition={{ duration: DUR.color, ease: EASE }}
                    >
                      Wholesale
                    </motion.span>
                    <motion.span
                      animate={{ color: stage >= 2 ? "#ffffff" : "#64748b" }}
                      transition={{ duration: DUR.color, ease: EASE }}
                    >
                      Contact
                    </motion.span>
                  </div>
                </div>

                {/* Brand name in hero */}
                <motion.span
                  className="text-sm font-bold"
                  animate={{ color: stage >= 2 ? "#ffffff" : "#0f172a" }}
                  transition={{ duration: DUR.color, ease: EASE }}
                >
                  {stage >= 1 ? "Off Your Bean" : "Your Roastery"}
                </motion.span>
              </motion.div>

              {/* Product grid */}
              <div className="p-4">
                <motion.p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  animate={{ color: stage >= 2 ? "#1A1A1A" : "#64748b" }}
                  transition={{ duration: DUR.color, ease: EASE }}
                >
                  Our Coffee
                </motion.p>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-neutral-100" />
                      <div className="h-2 w-3/4 bg-neutral-200 rounded" />
                      <div className="h-2 w-1/2 bg-neutral-100 rounded" />
                      <motion.button
                        className="w-full py-1.5 rounded-md text-white text-xs font-semibold"
                        animate={{ backgroundColor: accentColor }}
                        transition={{ duration: DUR.color, ease: EASE }}
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
  const stockLevel = useAnimatedCounter(85, isInView, DUR.counter, 2.0);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setShowOrder(true), 1000);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <Scene
      id="scene-5"
      headline="Your buyers order. Stock is committed instantly."
      subheadline="When an order comes in, stock is reserved automatically. No spreadsheets, no double selling."
    >
      <FadeIn direction="right" duration={DUR.card}>
        <div ref={ref} className="space-y-4">
          {/* Incoming order card */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.92 }}
            animate={
              showOrder
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 80, scale: 0.92 }
            }
            transition={{ duration: DUR.card, ease: EASE }}
          >
            <MockupCard className="border-[#2563EB]/30 border-l-4 !border-l-[#2563EB]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                    <ShoppingCart size={14} weight="duotone" className="text-[#2563EB]" />
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR.card, delay: 2.2, ease: EASE }}
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
                  transition={{ duration: DUR.counter, delay: 2.0, ease: EASE }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: DUR.element, delay: 2.8, ease: EASE }}
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
   SCENE 6 — Invoice & Get Paid (Off Your Bean branded)
   ═══════════════════════════════════════════════════════ */

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
      <FadeIn direction="left" duration={DUR.card}>
        <div ref={ref}>
          <MockupCard className="!p-0 overflow-hidden">
            {/* Invoice header */}
            <div className="p-6 pb-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
                className="flex items-center justify-between mb-4"
              >
                <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider">
                  Invoice
                </span>
                <InvoiceStatusBadge isInView={isInView} />
              </motion.div>

              {/* Off Your Bean black brand bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: DUR.card, delay: 0.4, ease: EASE }}
                className="w-full h-1.5 bg-[#1A1A1A] rounded origin-left mb-6"
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DUR.field, delay: 0.8, ease: EASE }}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-3">
                  <OffYourBeanLogo size={40} />
                  <span className="text-base font-bold text-neutral-900">
                    Off Your Bean
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#D97706] block">
                    INVOICE
                  </span>
                  <span className="text-xs text-neutral-400">INV-0042</span>
                </div>
              </motion.div>
            </div>

            {/* Line items */}
            <div className="px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: DUR.element, delay: 1.2, ease: EASE }}
                className="border-t border-neutral-100 py-3 flex justify-between text-xs text-neutral-400"
              >
                <span>Description</span>
                <span>Amount</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DUR.field, delay: 1.5, ease: EASE }}
                className="border-t border-neutral-100 py-3 flex justify-between text-sm"
              >
                <span className="text-neutral-900">House Blend × 10</span>
                <span className="font-semibold text-neutral-900">£85.00</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DUR.field, delay: 1.9, ease: EASE }}
                className="border-t border-neutral-200 py-4 flex justify-between"
              >
                <span className="font-bold text-neutral-900">Total</span>
                <span className="text-lg font-black text-[#1A1A1A]">
                  £85.00
                </span>
              </motion.div>
            </div>

            {/* Pay Now button — Off Your Bean orange accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: DUR.element, delay: 2.3, ease: EASE }}
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

function FeatureCardMarketing() {
  return (
    <MockupCard className="h-full">
      <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-4">
        <Envelope size={24} weight="duotone" className="text-[#2563EB]" />
      </div>
      <h3 className="text-lg font-bold text-neutral-900 mb-2">
        Marketing Suite
      </h3>
      <p className="text-sm text-neutral-600 mb-5">
        Communicate with customers and leads.
      </p>
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Envelope size={16} weight="duotone" className="text-[#2563EB]" />
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
      <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-4">
        <CalendarBlank size={24} weight="duotone" className="text-[#2563EB]" />
      </div>
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
        <FadeIn duration={DUR.card}>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          staggerDelay={0.3}
        >
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
        <FadeIn duration={DUR.card}>
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
        <FadeIn duration={DUR.card}>
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
