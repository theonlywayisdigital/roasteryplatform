import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card, Field } from "../components";

export const Scene1_GreenBean: React.FC = () => {
  const frame = useCurrentFrame();

  /* ── Headline ── */
  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Card fade + scale ── */
  const cardOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardScale = interpolate(frame, [10, 22], [0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Side card slides in from right ── */
  const sideOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sideX = interpolate(frame, [10, 22], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Field fade helper ── */
  const fo = (d: number) => interpolate(frame, [d, d + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fy = (d: number) => interpolate(frame, [d, d + 15], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Stock counter ── */
  const stockVal = Math.round(interpolate(frame, [0, 60], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));

  /* ── Button ── */
  const btnOpacity = interpolate(frame, [18, 33], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        It starts with the green bean.
      </h1>

      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        {/* Main card */}
        <div style={{ opacity: cardOpacity, transform: `scale(${cardScale})`, transformOrigin: "left center" }}>
          <Card style={{ width: 520 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#16A34A" strokeWidth="2" fill="none" />
                  <path d="M10 6v8M6 10h8" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Add Green Bean</span>
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ opacity: fo(18), transform: `translateY(${fy(18)}px)` }}>
                <Field label="Name *" value="Ethiopia Yirgacheffe" />
              </div>
              <div style={{ display: "flex", gap: 14, opacity: fo(26), transform: `translateY(${fy(26)}px)` }}>
                <div style={{ flex: 1 }}>
                  <Field label="Origin Country" value="Ethiopia" />
                </div>
                <div style={{ flex: 1 }}>
                  <Field label="Initial Stock (kg)" value="120" />
                </div>
                <div style={{ flex: 1 }}>
                  <Field label="Cost per kg (£)" value="8.50" />
                </div>
              </div>
            </div>

            {/* Button */}
            <div style={{ marginTop: 20, opacity: btnOpacity }}>
              <div style={{
                backgroundColor: BRAND.blue, color: "#fff",
                padding: "10px 24px", borderRadius: 10, fontSize: 15,
                fontWeight: 600, display: "inline-block", fontFamily: FONT_FAMILY,
              }}>
                Add Green Bean
              </div>
            </div>
          </Card>
        </div>

        {/* Side: Stock counter */}
        <div style={{ opacity: sideOpacity, transform: `translateX(${sideX}px)` }}>
          <Card style={{ width: 260, textAlign: "center" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 10l4-4 4 4" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Green Stock</span>
            </div>
            <span style={{ fontSize: 30, fontWeight: 900, color: BRAND.dark, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
              {stockVal}
              <span style={{ fontSize: 15, fontWeight: 500, color: BRAND.muted, marginLeft: 4 }}>kg</span>
            </span>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
