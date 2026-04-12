"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarBlank, InstagramLogo, FacebookLogo, LinkedinLogo } from "@phosphor-icons/react";
import { EASE, DUR, STAGGER } from "./shared";

const posts = [
  {
    day: "Mon",
    date: "7",
    platform: InstagramLogo,
    platformName: "Instagram",
    platformColor: "text-pink-600",
    platformBg: "bg-pink-100",
    caption: "Meet our newest single origin — washed Ethiopian Yirgacheffe...",
    time: "09:00",
  },
  {
    day: "Wed",
    date: "9",
    platform: FacebookLogo,
    platformName: "Facebook",
    platformColor: "text-[#2563EB]",
    platformBg: "bg-blue-100",
    caption: "Behind the scenes at the roastery this week. New batch of...",
    time: "12:00",
  },
  {
    day: "Fri",
    date: "11",
    platform: LinkedinLogo,
    platformName: "LinkedIn",
    platformColor: "text-sky-700",
    platformBg: "bg-sky-100",
    caption: "How we source our green beans — from farm to cup, traceability...",
    time: "08:30",
  },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function SocialSchedulingAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="bg-white rounded-xl border border-neutral-200 shadow-lg p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 0.2, ease: EASE }}
        className="flex items-center gap-2 mb-5"
      >
        <div className="w-8 h-8 rounded-lg bg-[#D97706]/10 flex items-center justify-center">
          <CalendarBlank size={18} weight="duotone" className="text-[#D97706]" />
        </div>
        <span className="text-sm font-bold text-neutral-900">Week View</span>
        <span className="text-xs text-neutral-400 ml-auto">Apr 7 – 13</span>
      </motion.div>

      {/* Week grid header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DUR.element, delay: 0.4, ease: EASE }}
        className="grid grid-cols-7 gap-1.5 mb-3"
      >
        {weekDays.map((day) => (
          <div key={day} className="text-center">
            <span className="text-xs font-semibold text-neutral-400 uppercase">
              {day}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Week grid with posts */}
      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((day) => {
          const post = posts.find((p) => p.day === day);
          const PlatformIcon = post?.platform;

          return (
            <div key={day} className="min-h-[120px]">
              {post && PlatformIcon ? (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: DUR.field,
                    delay: 0.6 + posts.indexOf(post) * (STAGGER.card + 0.15),
                    ease: EASE,
                  }}
                  className="p-2 rounded-lg border border-neutral-200 bg-white h-full"
                >
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className={`w-5 h-5 rounded-md ${post.platformBg} flex items-center justify-center`}>
                      <PlatformIcon size={12} weight="fill" className={post.platformColor} />
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-500">
                      {post.platformName}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-600 leading-snug line-clamp-3 mb-1.5">
                    {post.caption}
                  </p>
                  <span className="text-[10px] font-medium text-[#D97706]">
                    {post.time}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: DUR.element, delay: 0.5, ease: EASE }}
                  className="h-full rounded-lg border border-dashed border-neutral-100"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
