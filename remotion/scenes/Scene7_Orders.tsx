import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card, StatusBadge } from "../components";

const orders = [
  { buyer: "The Daily Grind", product: "House Blend × 10", amount: "£85.00", status: "Dispatched", badgeBg: "#FEF3C7", badgeColor: BRAND.orange },
  { buyer: "Rose Farm", product: "Ethiopia Yirga × 5", amount: "£62.50", status: "Processing", badgeBg: "#DBEAFE", badgeColor: BRAND.blue },
  { buyer: "Bean & Gone", product: "Decaf Colombia × 8", amount: "£72.00", status: "Delivered", badgeBg: "#DCFCE7", badgeColor: BRAND.green, dot: BRAND.green },
];

export const Scene7_Orders: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const cardOpacity = interpolate(frame, [12, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Every order. Every status. One place.
      </h1>

      <div style={{ opacity: cardOpacity }}>
        <Card style={{ width: 700 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="3" width="14" height="12" rx="2" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /><path d="M2 7h14" stroke={BRAND.blue} strokeWidth="1.5" /></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Recent Orders</span>
          </div>

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 0.8fr auto", gap: 16, paddingBottom: 10, borderBottom: `1px solid #F3F4F6`, marginBottom: 4 }}>
            {["Customer", "Product", "Amount", "Status"].map((h) => (
              <span key={h} style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY, textAlign: h === "Amount" || h === "Status" ? "right" as const : "left" as const }}>{h}</span>
            ))}
          </div>

          {/* Order rows */}
          {orders.map((order, i) => {
            const delay = 24 + i * 12;
            const rowOpacity = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const rowY = interpolate(frame, [delay, delay + 18], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

            /* Badge pop */
            const badgeDelay = delay + 12;
            const badgeScale = interpolate(frame, [badgeDelay, badgeDelay + 12], [0.7, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.5)),
            });
            const badgeOpacity = interpolate(frame, [badgeDelay, badgeDelay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div
                key={order.buyer}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.2fr 0.8fr auto",
                  gap: 16,
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: `1px solid #FAFAFA`,
                  opacity: rowOpacity,
                  transform: `translateY(${rowY}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="5" r="3" stroke="#9CA3AF" strokeWidth="1.2" fill="none" /><path d="M2 13c0-3 2-5 5-5s5 2 5 5" stroke="#9CA3AF" strokeWidth="1.2" fill="none" /></svg>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 500, color: BRAND.dark, fontFamily: FONT_FAMILY }}>{order.buyer}</span>
                </div>
                <span style={{ fontSize: 15, color: "#6B7280", fontFamily: FONT_FAMILY }}>{order.product}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: BRAND.dark, textAlign: "right" as const, fontFamily: FONT_FAMILY }}>{order.amount}</span>
                <div style={{ display: "flex", justifyContent: "flex-end", opacity: badgeOpacity, transform: `scale(${badgeScale})` }}>
                  <StatusBadge label={order.status} bg={order.badgeBg} color={order.badgeColor} dot={order.dot} />
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </AbsoluteFill>
  );
};
