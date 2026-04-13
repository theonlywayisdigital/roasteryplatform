import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card } from "../components";

export const Scene5_Purchasing: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Order card and stock bar appear simultaneously */
  const contentOpacity = interpolate(frame, [18, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const orderX = interpolate(frame, [18, 38], [400, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Stock bar — appears with order */
  const barY = interpolate(frame, [18, 38], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const barWidth = interpolate(frame, [35, 80], [100, 88], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const stockVal = Math.round(interpolate(frame, [35, 80], [90, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));

  /* Reserved note */
  const noteOpacity = interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Buyer orders. Stock committed instantly.
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
        {/* Order card */}
        <div style={{ opacity: contentOpacity, transform: `translateX(${orderX}px)` }}>
          <Card style={{ width: 500, borderLeft: `4px solid ${BRAND.blue}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 4h10l-1 7H4L3 4Z" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /><circle cx="6" cy="13" r="1" fill={BRAND.blue} /><circle cx="11" cy="13" r="1" fill={BRAND.blue} /></svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.blue, fontFamily: FONT_FAMILY }}>New Order</span>
              </div>
              <span style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Just now</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Buyer", "The Daily Grind"],
                ["Product", "House Blend 1kg"],
                ["Quantity", "× 10"],
                ["Total", "£85.00"],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontFamily: FONT_FAMILY }}>
                  <span style={{ color: BRAND.muted }}>{label}</span>
                  <span style={{ fontWeight: 600, color: BRAND.dark }}>{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Stock bar */}
        <div style={{ opacity: contentOpacity, transform: `translateY(${barY}px)`, width: 500 }}>
          <Card style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>House Blend — Available Stock</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
                {stockVal}<span style={{ fontSize: 13, fontWeight: 400, color: BRAND.muted, marginLeft: 4 }}>/ 90 kg</span>
              </span>
            </div>
            <div style={{ width: "100%", height: 14, backgroundColor: "#F3F4F6", borderRadius: 7, overflow: "hidden" }}>
              <div style={{ width: `${barWidth}%`, height: "100%", backgroundColor: BRAND.blue, borderRadius: 7, transition: "width 0.1s" }} />
            </div>
            <p style={{ fontSize: 13, color: BRAND.muted, marginTop: 10, opacity: noteOpacity, fontFamily: FONT_FAMILY }}>
              10kg reserved for ORD-1042
            </p>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
