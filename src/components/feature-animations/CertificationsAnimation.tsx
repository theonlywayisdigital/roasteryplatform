"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

const certifications = [
  {
    name: "Organic",
    body: "Soil Association",
    expires: "12 Dec 2026",
    status: "valid" as const,
  },
  {
    name: "Fairtrade",
    body: "Fairtrade Foundation",
    expires: "3 Mar 2027",
    status: "valid" as const,
  },
  {
    name: "Rainforest Alliance",
    body: "Rainforest Alliance",
    expires: "1 Aug 2025",
    status: "expired" as const,
  },
];

export function CertificationsAnimation() {
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
        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
          <ShieldCheck size={18} weight="duotone" className="text-green-600" />
        </div>
        <span className="text-sm font-bold text-neutral-900">Certifications</span>
      </motion.div>

      <div className="space-y-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: DUR.field,
              delay: 0.4 + i * STAGGER.card,
              ease: EASE,
            }}
            className="flex items-center gap-4 p-3 rounded-lg border border-neutral-100 bg-neutral-50/50"
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              cert.status === "valid"
                ? "bg-green-100"
                : "bg-red-100"
            }`}>
              <ShieldCheck
                size={22}
                weight="duotone"
                className={cert.status === "valid" ? "text-green-600" : "text-red-500"}
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900">{cert.name}</p>
              <p className="text-xs text-neutral-500">{cert.body}</p>
              <p className="text-xs text-neutral-400 mt-0.5">Expires {cert.expires}</p>
            </div>

            {/* Status badge */}
            {cert.status === "valid" ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: DUR.element,
                  delay: 0.8 + i * STAGGER.card,
                  ease: EASE,
                }}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                Valid
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: [0, 1, 0.7, 1], scale: 1 } : {}}
                transition={{
                  duration: DUR.element,
                  delay: 0.8 + i * STAGGER.card,
                  ease: EASE,
                  opacity: {
                    duration: 2,
                    delay: 0.8 + i * STAGGER.card,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    times: [0, 0.3, 0.7, 1],
                  },
                }}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
                Expired
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
