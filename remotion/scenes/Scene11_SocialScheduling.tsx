import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card } from "../components";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const posts: { day: string; platform: string; platformColor: string; platformBg: string; caption: string; time: string }[] = [
  { day: "Mon", platform: "Instagram", platformColor: "#E1306C", platformBg: "#FCE7F3", caption: "Meet our newest single origin — washed Ethiopian Yirgacheffe...", time: "09:00" },
  { day: "Wed", platform: "Facebook", platformColor: BRAND.blue, platformBg: "#DBEAFE", caption: "Behind the scenes at the roastery this week...", time: "12:00" },
];

export const Scene11_SocialScheduling: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const cardOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* Post tiles — all slide from right simultaneously */
  const postTileOpacity = interpolate(frame, [24, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const postTileX = interpolate(frame, [24, 38], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const postTileScale = interpolate(frame, [24, 38], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Stay consistent on social.
      </h1>

      <div style={{ opacity: cardOpacity }}>
        <Card style={{ width: 800 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="3" width="14" height="13" rx="2" stroke={BRAND.orange} strokeWidth="1.5" fill="none" /><path d="M2 7h14" stroke={BRAND.orange} strokeWidth="1.5" /></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Week View</span>
            <span style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY, marginLeft: "auto" }}>Apr 7 – 13</span>
          </div>

          {/* Week grid header */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginBottom: 12 }}>
            {weekDays.map((d) => (
              <div key={d} style={{ textAlign: "center" as const, fontSize: 13, fontWeight: 600, color: BRAND.muted, textTransform: "uppercase" as const, fontFamily: FONT_FAMILY }}>
                {d}
              </div>
            ))}
          </div>

          {/* Week grid with posts */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, minHeight: 180 }}>
            {weekDays.map((day) => {
              const post = posts.find((p) => p.day === day);

              if (!post) {
                return (
                  <div key={day} style={{ borderRadius: 10, border: "2px dashed #F3F4F6", minHeight: 140 }} />
                );
              }

              return (
                <div
                  key={day}
                  style={{
                    opacity: postTileOpacity,
                    transform: `translateX(${postTileX}px) scale(${postTileScale})`,
                    borderRadius: 10,
                    border: `1px solid ${BRAND.border}`,
                    padding: 12,
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: post.platformBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: post.platformColor, fontFamily: FONT_FAMILY }}>{post.platform.charAt(0)}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: BRAND.muted, fontFamily: FONT_FAMILY }}>{post.platform}</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.4, margin: 0, fontFamily: FONT_FAMILY, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const }}>
                    {post.caption}
                  </p>
                  <span style={{ fontSize: 11, fontWeight: 600, color: BRAND.orange, fontFamily: FONT_FAMILY, marginTop: "auto" }}>{post.time}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
