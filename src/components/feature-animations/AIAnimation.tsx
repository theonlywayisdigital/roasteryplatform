"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Robot, Envelope, Package, Tray, ArrowRight } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

/* ── Typing hook ─────────────────────────────── */

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

/* ── Shimmer overlay ─────────────────────────── */

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

/* ── Main component ──────────────────────────── */

export function AIAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showCards, setShowCards] = useState([false, false, false]);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setShowCards([true, false, false]), 300);
    const t2 = setTimeout(() => setShowCards([true, true, false]), 1800);
    const t3 = setTimeout(() => setShowCards([true, true, true]), 3300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView]);

  /* Card 1 — Email Campaign generation */
  const emailSubject = useTypingEffect(
    "New arrival: Ethiopia Yirgacheffe",
    showCards[0],
    40,
    400
  );
  const emailBody = useTypingEffect(
    "We've just landed a stunning washed lot from Yirgacheffe. Bright citrus, floral notes, silky body — this is one of the best lots we've tasted this year.",
    showCards[0],
    20,
    1200
  );

  /* Card 2 — Product description generation */
  const productDesc = useTypingEffect(
    "A beautifully clean washed Ethiopian coffee with vibrant citrus acidity, jasmine florals, and a sweet bergamot finish. Roasted medium-light to preserve origin character.",
    showCards[1],
    20,
    400
  );

  /* Card 3 — Inbox to Order conversion */
  const [orderConverted, setOrderConverted] = useState(false);
  useEffect(() => {
    if (!showCards[2]) return;
    const t = setTimeout(() => setOrderConverted(true), 1200);
    return () => clearTimeout(t);
  }, [showCards[2]]);

  return (
    <div ref={ref} className="space-y-3">
      {/* Card 1 — Email Campaigns */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={showCards[0] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.field, ease: EASE }}
        className="relative bg-white rounded-xl border border-neutral-200 shadow-lg p-5 overflow-hidden"
      >
        <AIShimmer />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
              <Envelope size={14} weight="duotone" className="text-[#2563EB]" />
            </div>
            <span className="text-xs font-bold text-neutral-900">Email Campaigns</span>
            <span className="ml-auto text-[10px] font-semibold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Robot size={10} weight="fill" />
              AI
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="block text-[10px] font-medium text-neutral-400 mb-0.5">Subject</span>
              <div className="bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5 text-xs text-neutral-900 font-medium min-h-[28px]">
                {emailSubject}
                {emailSubject.length < "New arrival: Ethiopia Yirgacheffe".length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-0.5 h-3 bg-[#2563EB] ml-0.5 align-middle"
                  />
                )}
              </div>
            </div>
            <div>
              <span className="block text-[10px] font-medium text-neutral-400 mb-0.5">Body</span>
              <div className="bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5 text-xs text-neutral-600 min-h-[48px] leading-relaxed">
                {emailBody}
                {showCards[0] && emailBody.length < 140 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-0.5 h-3 bg-[#2563EB] ml-0.5 align-middle"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2 — Product Descriptions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={showCards[1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.field, ease: EASE }}
        className="relative bg-white rounded-xl border border-neutral-200 shadow-lg p-5 overflow-hidden"
      >
        <AIShimmer />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
              <Package size={14} weight="duotone" className="text-[#2563EB]" />
            </div>
            <span className="text-xs font-bold text-neutral-900">Product Descriptions</span>
            <span className="ml-auto text-[10px] font-semibold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Robot size={10} weight="fill" />
              AI
            </span>
          </div>
          <div className="space-y-2">
            <div className="bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5 text-xs text-neutral-900 font-medium">
              Ethiopia Yirgacheffe
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5 text-xs text-neutral-600 min-h-[48px] leading-relaxed">
              {productDesc}
              {showCards[1] && productDesc.length < 140 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-0.5 h-3 bg-[#2563EB] ml-0.5 align-middle"
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 3 — Inbox to Order */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={showCards[2] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DUR.field, ease: EASE }}
        className="relative bg-white rounded-xl border border-neutral-200 shadow-lg p-5 overflow-hidden"
      >
        <AIShimmer />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
              <Tray size={14} weight="duotone" className="text-[#2563EB]" />
            </div>
            <span className="text-xs font-bold text-neutral-900">Inbox → Order</span>
            <span className="ml-auto text-[10px] font-semibold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Robot size={10} weight="fill" />
              AI
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Email snippet */}
            <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-md p-2.5">
              <p className="text-[10px] font-semibold text-neutral-700 mb-0.5">The Daily Grind</p>
              <p className="text-[10px] text-neutral-500 leading-tight">
                &quot;20 bags of House Blend 1kg please, same delivery address.&quot;
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showCards[2] ? { opacity: 1 } : {}}
              transition={{ duration: DUR.element, delay: 0.6, ease: EASE }}
            >
              <ArrowRight size={16} weight="bold" className="text-[#2563EB] shrink-0" />
            </motion.div>

            {/* Order card */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={orderConverted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: DUR.field, ease: EASE }}
              className="flex-1 bg-green-50 border border-green-200 rounded-md p-2.5"
            >
              <p className="text-[10px] font-semibold text-green-700 mb-0.5">Order Created</p>
              <p className="text-[10px] text-green-600">House Blend 1kg × 20</p>
              <p className="text-[10px] text-green-500">The Daily Grind</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
