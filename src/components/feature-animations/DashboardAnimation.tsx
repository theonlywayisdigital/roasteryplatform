"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  Package,
  CurrencyGbp,
  Leaf,
  Users,
  ShoppingCart,
  Receipt,
  Warning,
} from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

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

const stats = [
  {
    label: "Total Orders",
    value: 142,
    prefix: "",
    suffix: "",
    icon: Package,
    color: "bg-[#2563EB]/10 text-[#2563EB]",
  },
  {
    label: "Revenue This Month",
    value: 4280,
    prefix: "£",
    suffix: "",
    icon: CurrencyGbp,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Stock Remaining",
    value: 38,
    prefix: "",
    suffix: "kg",
    icon: Leaf,
    color: "bg-amber-100 text-[#D97706]",
  },
  {
    label: "Active Buyers",
    value: 24,
    prefix: "",
    suffix: "",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
];

const activity = [
  {
    icon: ShoppingCart,
    text: "New order from The Daily Grind",
    time: "2 min ago",
    iconColor: "text-[#2563EB] bg-[#2563EB]/10",
  },
  {
    icon: Receipt,
    text: "Invoice INV-0047 sent to Café Nero",
    time: "15 min ago",
    iconColor: "text-green-600 bg-green-100",
  },
  {
    icon: Warning,
    text: "Ethiopia Yirgacheffe stock below 5kg",
    time: "1 hr ago",
    iconColor: "text-[#D97706] bg-amber-100",
  },
];

export function DashboardAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const counters = stats.map((s, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedCounter(s.value, isInView, DUR.counter, 0.6 + i * 0.2)
  );

  return (
    <div ref={ref} className="space-y-4">
      {/* Stat cards grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: DUR.field,
                delay: 0.3 + i * STAGGER.card,
                ease: EASE,
              }}
              className="bg-white rounded-xl border border-neutral-200 shadow-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <Icon size={16} weight="duotone" />
                </div>
                <span className="text-xs font-medium text-neutral-500">
                  {stat.label}
                </span>
              </div>
              <span className="text-2xl font-black text-neutral-900 tabular-nums">
                {stat.prefix}
                {counters[i].toLocaleString()}
                {stat.suffix && (
                  <span className="text-sm font-medium text-neutral-400 ml-0.5">
                    {stat.suffix}
                  </span>
                )}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: DUR.element, delay: 1.6, ease: EASE }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="text-sm font-bold text-neutral-900">Recent Activity</span>
        </motion.div>

        <div className="space-y-1">
          {activity.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: DUR.field,
                  delay: 1.8 + i * STAGGER.card,
                  ease: EASE,
                }}
                className="flex items-center gap-3 py-2.5 border-b border-neutral-50 last:border-0"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}
                >
                  <Icon size={14} weight="duotone" />
                </div>
                <span className="text-sm text-neutral-700 flex-1 truncate">
                  {item.text}
                </span>
                <span className="text-xs text-neutral-400 shrink-0">
                  {item.time}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
