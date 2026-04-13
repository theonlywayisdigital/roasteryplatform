import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card, OffYourBeanLogo, StatusBadge, IntegrationTile } from "../components";

export const Scene9_Invoicing: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Main card — fade + scale up */
  const cardOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardScale = interpolate(frame, [10, 22], [0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Side cards — fade + slide from right */
  const sideOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sideX = interpolate(frame, [10, 22], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const fo = (d: number) => interpolate(frame, [d, d + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fy = (d: number) => interpolate(frame, [d, d + 12], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Status transitions: Draft -> Sent -> Paid */
  const statusLabel = frame < 44 ? "Draft" : frame < 72 ? "Sent" : "Paid";
  const statusBg = frame < 44 ? "#F3F4F6" : frame < 72 ? "#DBEAFE" : "#DCFCE7";
  const statusColor = frame < 44 ? BRAND.muted : frame < 72 ? BRAND.blue : BRAND.green;

  /* Brand bar */
  const barScale = interpolate(frame, [18, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Accounting tiles — appear with card */

  const accounting = [
    { name: "Xero", color: "#13B5EA" },
    { name: "QuickBooks", color: "#2CA01C" },
    { name: "Sage", color: "#00D639" },
  ];

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Invoice in seconds. Sync to your accounts.
      </h1>

      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        {/* Invoice card — scale up */}
        <div style={{ opacity: cardOpacity, transform: `scale(${cardScale})`, transformOrigin: "left center" }}>
          <Card style={{ width: 440, padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "24px 24px 0" }}>
              {/* Invoice label + status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, opacity: fo(16) }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.orange, textTransform: "uppercase" as const, letterSpacing: 1.5, fontFamily: FONT_FAMILY }}>Invoice</span>
                <StatusBadge label={statusLabel} bg={statusBg} color={statusColor} dot={statusLabel === "Paid" ? BRAND.green : undefined} />
              </div>

              {/* Brand bar */}
              <div style={{ width: "100%", height: 6, backgroundColor: "#1A1A1A", borderRadius: 3, marginBottom: 24, transform: `scaleX(${barScale})`, transformOrigin: "left" }} />

              {/* Logo + Invoice # */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, opacity: fo(32), transform: `translateY(${fy(32)}px)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <OffYourBeanLogo size={44} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Off Your Bean</span>
                </div>
                <div style={{ textAlign: "right" as const }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.orange, fontFamily: FONT_FAMILY }}>INVOICE</div>
                  <div style={{ fontSize: 12, color: BRAND.muted, fontFamily: FONT_FAMILY }}>INV-0042</div>
                </div>
              </div>
            </div>

            {/* Line items */}
            <div style={{ padding: "0 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: `1px solid #F3F4F6`, fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY, opacity: fo(44) }}>
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: `1px solid #F3F4F6`, fontSize: 15, fontFamily: FONT_FAMILY, opacity: fo(54), transform: `translateY(${fy(54)}px)` }}>
                <span style={{ color: BRAND.dark }}>House Blend × 10</span>
                <span style={{ fontWeight: 600, color: BRAND.dark }}>£85.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderTop: `1px solid ${BRAND.border}`, opacity: fo(64), transform: `translateY(${fy(64)}px)` }}>
                <span style={{ fontWeight: 700, color: BRAND.dark, fontSize: 16, fontFamily: FONT_FAMILY }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#1A1A1A", fontFamily: FONT_FAMILY }}>£85.00</span>
              </div>
            </div>

            {/* Pay Now button */}
            <div style={{ padding: "8px 24px 24px", display: "flex", justifyContent: "center", opacity: fo(72) }}>
              <div style={{ backgroundColor: BRAND.orange, color: "#fff", padding: "10px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: FONT_FAMILY }}>
                Pay Now
              </div>
            </div>
          </Card>
        </div>

        {/* Accounting integrations — slide from right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, opacity: sideOpacity, transform: `translateX(${sideX}px)` }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark, fontFamily: FONT_FAMILY, marginBottom: 4 }}>Accounting</span>
          {accounting.map((a) => (
            <div key={a.name}>
              <IntegrationTile name={a.name} color={a.color} connected={frame >= 40} />
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
