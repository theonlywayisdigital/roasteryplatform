import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { fullScreen, headline, BRAND, FONT_FAMILY } from "../styles";
import { Card } from "../components";

export const Scene6_Inbox: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Email row entrance */
  const emailOpacity = interpolate(frame, [14, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const emailY = interpolate(frame, [14, 28], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* Convert button pulses between frames 35-60 */
  const btnScale = frame >= 35 && frame < 60
    ? 1 + 0.03 * Math.sin((frame - 35) * 0.15)
    : 1;

  /* Conversion at frame 60 */
  const isConverted = frame >= 60;
  const convertOpacity = isConverted
    ? interpolate(frame, [60, 73], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const convertScale = isConverted
    ? interpolate(frame, [60, 73], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) })
    : 0;
  const buttonFadeOut = isConverted
    ? interpolate(frame, [60, 69], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  /* New order card slides in from below after conversion */
  const orderCardOpacity = interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const orderCardY = interpolate(frame, [85, 100], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Email arrives. Order created in one click.
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        <div style={{ opacity: emailOpacity, transform: `translateY(${emailY}px)` }}>
          <Card style={{ width: 600, borderLeft: `4px solid ${BRAND.blue}`, background: "rgba(37,99,235,0.02)" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" rx="2" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /><path d="M2 6l8 5 8-5" stroke={BRAND.blue} strokeWidth="1.5" fill="none" /></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>The Daily Grind</div>
                <div style={{ fontSize: 13, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Order Request — House Blend × 20</div>
              </div>
            </div>

            {/* Email body */}
            <div style={{ fontSize: 14, color: BRAND.muted, lineHeight: 1.6, marginBottom: 20, fontFamily: FONT_FAMILY }}>
              Hi, could we place our usual order of 20 bags of House Blend 1kg please, same delivery address.
            </div>

            {/* Convert button / Converted state */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Blue convert button */}
              <div
                style={{
                  opacity: buttonFadeOut,
                  transform: `scale(${btnScale})`,
                  backgroundColor: BRAND.blue,
                  color: "#FFFFFF",
                  padding: "10px 24px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONT_FAMILY,
                }}
              >
                Convert to Order
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              </div>

              {/* Green converted badge */}
              <div
                style={{
                  opacity: convertOpacity,
                  transform: `scale(${convertScale})`,
                  backgroundColor: BRAND.green,
                  color: "#FFFFFF",
                  padding: "10px 24px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONT_FAMILY,
                  position: isConverted ? "relative" : "absolute",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                Order Created
              </div>
            </div>
          </Card>
        </div>

        {/* New order card slides up after conversion */}
        <div style={{ opacity: orderCardOpacity, transform: `translateY(${orderCardY}px)` }}>
          <Card style={{ width: 600, borderLeft: `4px solid ${BRAND.green}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 4h10l-1 7H4L3 4Z" stroke="#16A34A" strokeWidth="1.5" fill="none" /><circle cx="6" cy="13" r="1" fill="#16A34A" /><circle cx="11" cy="13" r="1" fill="#16A34A" /></svg>
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>ORD-1043</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.green, backgroundColor: "#DCFCE7", padding: "4px 12px", borderRadius: 20, fontFamily: FONT_FAMILY }}>Confirmed</span>
            </div>
            <div style={{ display: "flex", gap: 30, fontSize: 14, fontFamily: FONT_FAMILY }}>
              {[
                ["Buyer", "The Daily Grind"],
                ["Product", "House Blend 1kg"],
                ["Qty", "× 20"],
                ["Total", "£170.00"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ color: BRAND.muted, fontSize: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontWeight: 600, color: BRAND.dark }}>{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
