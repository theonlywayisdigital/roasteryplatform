"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Tray, Envelope, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE, DUR, STAGGER } from "./shared";

const emails = [
  {
    sender: "The Daily Grind",
    subject: "Order Request — House Blend × 20",
    preview: "Hi, could we place our usual order of 20 bags...",
    convertible: true,
  },
  {
    sender: "Café Nero",
    subject: "Re: Next week delivery",
    preview: "Thanks for confirming. We'll need the usual...",
    convertible: false,
  },
  {
    sender: "Bean & Gone",
    subject: "Wholesale enquiry",
    preview: "We're interested in stocking your Ethiopia...",
    convertible: false,
  },
];

export function InboxAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [converted, setConverted] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setConverted(true), 2800);
    return () => clearTimeout(timer);
  }, [isInView]);

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
          <Tray size={18} weight="duotone" className="text-[#2563EB]" />
        </div>
        <span className="text-sm font-bold text-neutral-900">Inbox</span>
        <span className="ml-auto text-xs text-neutral-400">3 messages</span>
      </motion.div>

      {/* Email rows */}
      <div className="space-y-1">
        {emails.map((email, i) => (
          <motion.div
            key={email.subject}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: DUR.field,
              delay: 0.5 + i * STAGGER.card,
              ease: EASE,
            }}
            className={cn(
              "p-3 rounded-lg border transition-colors",
              i === 0
                ? "border-[#2563EB]/20 bg-[#2563EB]/[0.03]"
                : "border-neutral-100 bg-neutral-50/50"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  i === 0 ? "bg-[#2563EB]/10" : "bg-neutral-100"
                )}
              >
                <Envelope
                  size={16}
                  weight="duotone"
                  className={i === 0 ? "text-[#2563EB]" : "text-neutral-400"}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      i === 0 ? "text-neutral-900" : "text-neutral-500"
                    )}
                  >
                    {email.sender}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    i === 0 ? "text-neutral-900" : "text-neutral-600"
                  )}
                >
                  {email.subject}
                </p>
                <p className="text-xs text-neutral-400 truncate mt-0.5">
                  {email.preview}
                </p>

                {/* Convert button — first email only */}
                {email.convertible && (
                  <div className="mt-2">
                    {!converted ? (
                      <motion.div
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-lg"
                      >
                        Convert to Order
                        <ArrowRight size={12} weight="bold" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: DUR.element, ease: EASE }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg"
                      >
                        <CheckCircle size={14} weight="fill" />
                        Order Created
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
