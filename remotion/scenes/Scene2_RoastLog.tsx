import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card, Field } from "../components";

export const Scene2_RoastLog: React.FC = () => {
  const frame = useCurrentFrame();

  /* ── Headline ── */
  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Card fade + scale ── */
  const cardOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardScale = interpolate(frame, [10, 22], [0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Side cards slide in from right ── */
  const sideOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sideX = interpolate(frame, [10, 22], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Field fade helper ── */
  const fo = (d: number) => interpolate(frame, [d, d + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fy = (d: number) => interpolate(frame, [d, d + 15], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Stock counters ── */
  const greenVal = Math.round(interpolate(frame, [0, 60], [120, 108], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const roastedVal = Math.round(interpolate(frame, [0, 60], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));

  /* ── Weight loss badge ── */
  const wlOpacity = interpolate(frame, [18, 33], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Button ── */
  const btnOpacity = interpolate(frame, [18, 33], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Log every roast. Stock updates automatically.
      </h1>

      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        {/* Main card */}
        <div style={{ opacity: cardOpacity, transform: `scale(${cardScale})`, transformOrigin: "left center" }}>
          <Card style={{ width: 480 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12Z" stroke="#D97706" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Log Roast</span>
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ opacity: fo(18), transform: `translateY(${fy(18)}px)` }}>
                <Field label="Green Bean" value="Ethiopia Yirgacheffe" />
              </div>
              <div style={{ display: "flex", gap: 14, opacity: fo(26), transform: `translateY(${fy(26)}px)` }}>
                <div style={{ flex: 1 }}>
                  <Field label="Green Weight (kg) *" value="12" />
                </div>
                <div style={{ flex: 1 }}>
                  <Field label="Roasted Weight (kg) *" value="10" />
                </div>
              </div>

              {/* Weight loss badge */}
              <div style={{ opacity: wlOpacity }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginBottom: 6, fontFamily: FONT_FAMILY }}>
                  Weight Loss
                </div>
                <div style={{
                  backgroundColor: "#FEF3C7",
                  border: "1px solid #FDE68A",
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontSize: 16,
                  fontWeight: 700,
                  color: BRAND.orange,
                  fontFamily: FONT_FAMILY,
                  display: "inline-block",
                }}>
                  16.7%
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
                Log Roast
              </div>
            </div>
          </Card>
        </div>

        {/* Side: Stock counters */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, opacity: sideOpacity, transform: `translateX(${sideX}px)` }}>
          {/* Green stock */}
          <Card style={{ width: 220, textAlign: "center" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Green Stock</span>
            </div>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#EF4444", fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
              {greenVal}
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginLeft: 4 }}>kg</span>
            </span>
            <div style={{ fontSize: 12, color: "#F87171", fontFamily: FONT_FAMILY, marginTop: 6 }}>&#x25BC; 12kg</div>
          </Card>

          {/* Roasted stock */}
          <Card style={{ width: 220, textAlign: "center" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 10l4-4 4 4" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Roasted Stock</span>
            </div>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#16A34A", fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
              {roastedVal}
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginLeft: 4 }}>kg</span>
            </span>
            <div style={{ fontSize: 12, color: "#4ADE80", fontFamily: FONT_FAMILY, marginTop: 4 }}>&#x25B2; 10kg</div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
