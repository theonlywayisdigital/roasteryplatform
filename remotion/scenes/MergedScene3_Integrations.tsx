import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card, IntegrationTile } from "../components";

/* ═══════════════════════════════════════════════════════════════
   MergedScene3 — Integrations
   Duration: 300 frames (10s @ 30fps)

   Act 1 (0–100):   Connect your stores — 2×2 integration grid
   Act 2 (100–200): Stock broadcasts — signal pulse from counters
   Act 3 (200–300): Shopify order arrives — notification + stock deduct
   ═══════════════════════════════════════════════════════════════ */

const SHOPIFY_GREEN = "#96BF48";

const stores = [
  { name: "Shopify", color: SHOPIFY_GREEN },
  { name: "WooCommerce", color: "#7F54B3" },
  { name: "Wix", color: "#0C6EFC" },
  { name: "Squarespace", color: "#000000" },
];

export const MergedScene3_Integrations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Helpers ── */
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const easeOut = { ...clamp, easing: Easing.out(Easing.cubic) };

  /* ════════════════════════════════════════════════════════════
     HEADLINES
     ════════════════════════════════════════════════════════════ */

  const head1Opacity = interpolate(frame, [0, 12, 180, 200], [0, 1, 1, 0], clamp);
  const head1Y = interpolate(frame, [0, 12], [25, 0], easeOut);

  const head2Opacity = interpolate(frame, [200, 220], [0, 1], clamp);
  const head2Y = interpolate(frame, [200, 220], [25, 0], easeOut);

  /* ════════════════════════════════════════════════════════════
     STOCK COUNTERS — top right, persistent from frame 0
     Carried over: Green 108kg, Roasted 0kg
     ════════════════════════════════════════════════════════════ */

  const counterOpacity = interpolate(frame, [0, 15], [0, 1], clamp);
  const counterY = interpolate(frame, [0, 15], [-20, 0], easeOut);

  const greenVal = 108;

  // Roasted drops briefly in Act 3 when Shopify order hits
  const roastedVal = Math.round(interpolate(frame, [240, 265], [0, 0], easeOut));
  // Stays at 0 — the point is the low stock warning

  // Counter scale bump in Act 2 broadcast
  const broadcastScale = interpolate(frame, [110, 125, 155, 170], [1, 1.06, 1.06, 1], clamp);

  // Low stock warning badge
  const lowStockSpring = spring({
    frame: frame - 255,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });
  const lowStockOpacity = interpolate(lowStockSpring, [0, 0.3, 1], [0, 0.7, 1]);
  const lowStockScale = interpolate(lowStockSpring, [0, 1], [0.8, 1]);

  /* ════════════════════════════════════════════════════════════
     ACT 1 — Integration tiles (0–100)
     ════════════════════════════════════════════════════════════ */

  // Tiles pop in simultaneously from frame 30
  const tileScale = interpolate(frame, [30, 50], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.back(1.4)),
  });
  const tileOpacity = interpolate(frame, [30, 45], [0, 1], clamp);

  // Green connected pulse appears on all simultaneously at frame 60
  const connected = frame >= 60;

  // "All connected" label
  const connectedLabelOpacity = interpolate(frame, [70, 88], [0, 1], clamp);
  const connectedLabelY = interpolate(frame, [70, 88], [12, 0], easeOut);

  /* ════════════════════════════════════════════════════════════
     ACT 2 — Signal broadcast pulse (100–200)
     ════════════════════════════════════════════════════════════ */

  // Expanding ring radiates from top-right (counter position) outward
  const pulseProgress = interpolate(frame, [110, 155], [0, 1], easeOut);
  const pulseRadius = interpolate(pulseProgress, [0, 1], [0, 1200]);
  const pulseOpacity = interpolate(pulseProgress, [0, 0.3, 1], [0.4, 0.25, 0]);

  // Second wave slightly delayed
  const pulse2Progress = interpolate(frame, [125, 170], [0, 1], easeOut);
  const pulse2Radius = interpolate(pulse2Progress, [0, 1], [0, 1200]);
  const pulse2Opacity = interpolate(pulse2Progress, [0, 0.3, 1], [0.3, 0.2, 0]);

  // Each tile highlights briefly as signal hits — staggered slightly
  const tileGlow = (idx: number) => {
    const hitFrame = 130 + idx * 5;
    return interpolate(frame, [hitFrame, hitFrame + 10, hitFrame + 25], [0, 1, 0], clamp);
  };

  /* ════════════════════════════════════════════════════════════
     ACT 3 — Shopify order notification (200–300)
     ════════════════════════════════════════════════════════════ */

  const notifSpring = spring({
    frame: frame - 210,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.7 },
  });
  const notifY = interpolate(notifSpring, [0, 1], [-120, 0]);
  const notifOpacity = interpolate(notifSpring, [0, 0.2, 1], [0, 0.7, 1]);

  /* ════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════ */

  return (
    <AbsoluteFill style={fullScreen}>

      {/* ── Signal pulse rings (Act 2) ── */}
      {frame >= 110 && frame < 180 && (
        <>
          <div style={{
            position: "absolute", top: 120, right: 140,
            width: pulseRadius * 2, height: pulseRadius * 2,
            borderRadius: "50%",
            border: `2px solid ${BRAND.blue}`,
            opacity: pulseOpacity,
            transform: `translate(50%, -50%)`,
            pointerEvents: "none" as const,
            zIndex: 1,
          }} />
          <div style={{
            position: "absolute", top: 120, right: 140,
            width: pulse2Radius * 2, height: pulse2Radius * 2,
            borderRadius: "50%",
            border: `2px solid ${BRAND.blue}`,
            opacity: pulse2Opacity,
            transform: `translate(50%, -50%)`,
            pointerEvents: "none" as const,
            zIndex: 1,
          }} />
        </>
      )}

      {/* ── Headlines ── */}
      <div style={{ position: "relative", marginBottom: 30, height: 140, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <h1 style={{ ...headline, position: "absolute", opacity: head1Opacity, transform: `translateY(${head1Y}px)`, maxWidth: 1200 }}>
          Already selling online? You&apos;re covered.
        </h1>
        <h1 style={{ ...headline, position: "absolute", opacity: head2Opacity, transform: `translateY(${head2Y}px)`, maxWidth: 1200 }}>
          One system. Every channel.
        </h1>
      </div>

      {/* ── Main layout ── */}
      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>

        {/* ── Centre: Integration grid ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: 520 }}>
            {stores.map((s, idx) => {
              const glow = tileGlow(idx);
              return (
                <div key={s.name} style={{
                  transform: `scale(${tileScale})`,
                  opacity: tileOpacity,
                  boxShadow: glow > 0
                    ? `0 0 0 ${Math.round(glow * 3)}px rgba(37,99,235,${glow * 0.3}), 0 4px 12px rgba(37,99,235,${glow * 0.15})`
                    : "none",
                  borderRadius: 12,
                }}>
                  <IntegrationTile name={s.name} color={s.color} connected={connected} />
                </div>
              );
            })}
          </div>

          {/* "All connected" label */}
          <div style={{
            marginTop: 24,
            opacity: connectedLabelOpacity,
            transform: `translateY(${connectedLabelY}px)`,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: BRAND.green }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: BRAND.green, fontFamily: FONT_FAMILY }}>
              All stores synced
            </span>
          </div>

          {/* ── Shopify order notification (Act 3) ── */}
          {frame >= 205 && (
            <div style={{
              marginTop: 24,
              opacity: notifOpacity,
              transform: `translateY(${notifY}px)`,
              width: 520,
            }}>
              <Card style={{
                width: "100%",
                padding: "16px 20px",
                borderLeft: `4px solid ${SHOPIFY_GREEN}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}>
                {/* Shopify logo mark */}
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  backgroundColor: SHOPIFY_GREEN,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13 3l1 4 3 1-8 9-2-7 6-7z" fill="white" />
                    <path d="M8 17V9l-3 1 3 7z" fill="rgba(255,255,255,0.7)" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: SHOPIFY_GREEN, fontFamily: FONT_FAMILY }}>Shopify</span>
                    <span style={{ fontSize: 12, color: BRAND.muted, fontFamily: FONT_FAMILY }}>New Order</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: BRAND.dark, fontFamily: FONT_FAMILY }}>
                    House Blend × 5
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY, marginTop: 2 }}>
                    £42.50
                  </div>
                </div>
                {/* Checkmark */}
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  backgroundColor: SHOPIFY_GREEN,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* ── Right: Stock counters ── */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 16,
          opacity: counterOpacity,
          transform: `translateY(${counterY}px) scale(${broadcastScale})`,
          transformOrigin: "top right",
        }}>
          {/* Green Stock — static at 108kg */}
          <Card style={{ width: 200, textAlign: "center" as const, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
              <svg width="14" height="14" viewBox="0 0 16 16">
                <path d="M4 10l4-4 4 4" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Green Stock</span>
            </div>
            <span style={{ fontSize: 26, fontWeight: 900, color: BRAND.green, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
              {greenVal}
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginLeft: 4 }}>kg</span>
            </span>
          </Card>

          {/* Roasted Stock — 0kg */}
          <Card style={{ width: 200, textAlign: "center" as const, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
              <svg width="14" height="14" viewBox="0 0 16 16">
                <path d="M4 10l4-4 4 4" stroke={BRAND.orange} strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Roasted Stock</span>
            </div>
            <span style={{ fontSize: 26, fontWeight: 900, color: BRAND.orange, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
              {roastedVal}
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginLeft: 4 }}>kg</span>
            </span>
          </Card>

          {/* Low stock warning badge (Act 3) */}
          {frame >= 250 && (
            <div style={{
              opacity: lowStockOpacity,
              transform: `scale(${lowStockScale})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                backgroundColor: "#FEF3C7", padding: "8px 16px",
                borderRadius: 20, fontFamily: FONT_FAMILY,
                border: "1px solid #FDE68A",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L1 14h14L8 1z" fill={BRAND.orange} />
                  <path d="M8 6v4M8 11.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.orange }}>
                  Low stock
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
