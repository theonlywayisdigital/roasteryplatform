import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card } from "../components";

export const Scene8_CRM: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Background offset cards */
  const bg1Opacity = interpolate(frame, [12, 22], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bg2Opacity = interpolate(frame, [16, 26], [0, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* Main card */
  const cardOpacity = interpolate(frame, [22, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardY = interpolate(frame, [22, 36], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Detail reveals */
  const fo = (d: number) => interpolate(frame, [d, d + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fy = (d: number) => interpolate(frame, [d, d + 12], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* LTV counter */
  const ltvVal = Math.round(interpolate(frame, [0, 50], [0, 2840], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 50 }}>
        Know your buyers. Build the relationship.
      </h1>

      <div style={{ position: "relative", width: 480, height: 340 }}>
        {/* Background cards */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translate(16px, 16px) rotate(3deg)",
            opacity: bg1Opacity,
            backgroundColor: "#fff",
            borderRadius: 16,
            border: `1px solid ${BRAND.border}`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translate(8px, 8px) rotate(1.5deg)",
            opacity: bg2Opacity,
            backgroundColor: "#fff",
            borderRadius: 16,
            border: `1px solid ${BRAND.border}`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        />

        {/* Main contact card */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            opacity: cardOpacity,
            transform: `translateY(${cardY}px)`,
          }}
        >
          <Card style={{ width: 480 }}>
            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, opacity: fo(28), transform: `translateY(${fy(28)}px)` }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke={BRAND.blue} strokeWidth="2" fill="none" /><path d="M4 20c0-4 3-7 8-7s8 3 8 7" stroke={BRAND.blue} strokeWidth="2" fill="none" /></svg>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>The Daily Grind</div>
                <div style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Daily Grind Ltd</div>
              </div>
            </div>

            {/* Location */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: fo(36), transform: `translateY(${fy(36)}px)` }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2a5 5 0 0 0-5 5c0 4 5 9 5 9s5-5 5-9a5 5 0 0 0-5-5Z" stroke={BRAND.muted} strokeWidth="1.5" fill="none" /><circle cx="9" cy="7" r="1.5" fill={BRAND.muted} /></svg>
              <span style={{ fontSize: 15, color: "#6B7280", fontFamily: FONT_FAMILY }}>Manchester</span>
            </div>

            {/* LTV */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                backgroundColor: "#F9FAFB",
                borderRadius: 12,
                border: `1px solid ${BRAND.border}`,
                marginBottom: 14,
                opacity: fo(44),
                transform: `translateY(${fy(44)}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 18 18"><text x="3" y="14" fontSize="14" fontWeight="700" fill={BRAND.blue} fontFamily="serif">£</text></svg>
                <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Lifetime Value</span>
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: BRAND.blue, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
                £{ltvVal.toLocaleString()}
              </span>
            </div>

            {/* Last order */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: fo(52), transform: `translateY(${fy(52)}px)` }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="3" width="14" height="13" rx="2" stroke={BRAND.muted} strokeWidth="1.5" fill="none" /><path d="M2 7h14" stroke={BRAND.muted} strokeWidth="1.5" /></svg>
              <span style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Last order</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginLeft: "auto", fontFamily: FONT_FAMILY }}>3 Apr 2026</span>
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
