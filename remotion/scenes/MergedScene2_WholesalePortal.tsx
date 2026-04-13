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
import { Card, OffYourBeanLogo } from "../components";

/* ═══════════════════════════════════════════════════════════════
   MergedScene2 — Wholesale Portal
   Duration: 540 frames (18s @ 30fps)

   Act 1 (0–210):   Portal transformation — ink flood, branding, products
   Act 2 (210–360): Buyer places order — cursor click, quantity, confirmation
   Act 3 (360–540): Stock deducts — roasted stock drops, badge appears
   ═══════════════════════════════════════════════════════════════ */

export const MergedScene2_WholesalePortal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Helpers ── */
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const easeOut = { ...clamp, easing: Easing.out(Easing.cubic) };

  /* ════════════════════════════════════════════════════════════
     HEADLINES — crossfade across three acts
     ════════════════════════════════════════════════════════════ */

  const head1Opacity = interpolate(frame, [0, 12, 190, 210], [0, 1, 1, 0], clamp);
  const head1Y = interpolate(frame, [0, 12], [25, 0], easeOut);

  const head2Opacity = interpolate(frame, [210, 230, 340, 360], [0, 1, 1, 0], clamp);
  const head2Y = interpolate(frame, [210, 230], [25, 0], easeOut);

  const head3Opacity = interpolate(frame, [360, 380], [0, 1], clamp);
  const head3Y = interpolate(frame, [360, 380], [25, 0], easeOut);

  /* ════════════════════════════════════════════════════════════
     STOCK COUNTERS — top right, persistent from frame 0
     Carried over: Green 108kg, Roasted 10kg
     ════════════════════════════════════════════════════════════ */

  const counterOpacity = interpolate(frame, [0, 15], [0, 1], clamp);
  const counterY = interpolate(frame, [0, 15], [-20, 0], easeOut);

  // Green stock — stays at 108 throughout
  const greenVal = 108;

  // Roasted stock — starts at 10, drops to 0 in Act 3
  const roastedVal = Math.round(interpolate(frame, [375, 420], [10, 0], easeOut));

  // Red flash on roasted counter during deduction
  const redFlash = interpolate(frame, [375, 390, 420, 440], [0, 1, 1, 0], clamp);

  // Counter scale bump in Act 3 to draw attention
  const counterScale = interpolate(frame, [370, 385, 430, 450], [1, 1.08, 1.08, 1], clamp);

  // Portal dims in Act 3 so counters stand out
  const portalDim = interpolate(frame, [360, 390], [1, 0.5], clamp);

  // "Order committed" badge
  const badgeSpring = spring({
    frame: frame - 430,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });
  const badgeOpacity = interpolate(badgeSpring, [0, 0.3, 1], [0, 0.7, 1]);
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.8, 1]);

  /* ════════════════════════════════════════════════════════════
     ACT 1 — Portal Transformation (0–210)
     ════════════════════════════════════════════════════════════ */

  // Portal card fades in
  const portalOpacity = interpolate(frame, [10, 25], [0, 1], clamp);
  const portalScale = interpolate(frame, [10, 25], [0.95, 1], easeOut);

  // Ink flood: dark #1A1A1A sweeps header from top-left (30–120)
  const inkProgress = interpolate(frame, [30, 120], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const inkRadius = interpolate(inkProgress, [0, 1], [0, 200]);
  const inkClip = `circle(${inkRadius}% at 0% 0%)`;

  // Orange accent bleeds into buttons (90–180)
  const accentProgress = interpolate(frame, [90, 180], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const accentColor = accentProgress > 0
    ? `rgb(${Math.round(interpolate(accentProgress, [0, 1], [203, 217]))}, ${Math.round(interpolate(accentProgress, [0, 1], [213, 119]))}, ${Math.round(interpolate(accentProgress, [0, 1], [225, 6]))})`
    : "#CBD5E1";

  // Logo drops in with spring at frame 150
  const logoSpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 9, stiffness: 120, mass: 0.5 },
  });
  const logoY = interpolate(logoSpring, [0, 1], [-200, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 0.2, 1], [0, 0.8, 1]);

  // Nav text colour
  const subTextColor = inkProgress > 0.5 ? "rgba(255,255,255,0.7)" : BRAND.muted;

  // Brand name
  const brandName = logoOpacity > 0.5 ? "Off Your Bean" : "Your Roastery";

  // Product content fades in (130–160)
  const contentOpacity = interpolate(frame, [130, 160], [0, 1], clamp);
  const contentY = interpolate(frame, [130, 160], [20, 0], easeOut);

  /* ════════════════════════════════════════════════════════════
     ACT 2 — Buyer Places Order (210–360)
     ════════════════════════════════════════════════════════════ */

  // Cursor appears and moves to first product card
  const cursorOpacity = interpolate(frame, [220, 230], [0, 1], clamp);
  const cursorX = interpolate(frame, [230, 260], [400, 168], easeOut);
  const cursorY = interpolate(frame, [230, 260], [100, 240], easeOut);

  // First product card highlight on hover
  const card1Highlight = interpolate(frame, [255, 268], [0, 1], clamp);

  // Click effect — scale pulse on card
  const clickPulse = frame >= 268 && frame <= 278
    ? 1 + 0.03 * Math.sin((frame - 268) * 0.6)
    : 1;

  // Quantity selector appears (275–295)
  const qtyOpacity = interpolate(frame, [275, 290], [0, 1], clamp);
  const qtyY = interpolate(frame, [275, 290], [10, 0], easeOut);
  const qtyVal = Math.round(interpolate(frame, [290, 310], [1, 10], easeOut));

  // Cursor moves to Order button (305–320)
  const cursorX2 = interpolate(frame, [305, 320], [168, 168], easeOut);
  const cursorY2 = interpolate(frame, [305, 320], [240, 360], easeOut);
  const cursorPhase2 = frame >= 305;

  // Order button click (320–330)
  const orderBtnPulse = frame >= 322 && frame <= 332
    ? 1 + 0.04 * Math.sin((frame - 322) * 0.6)
    : 1;

  // Green checkmark confirmation (330–360)
  const checkSpring = spring({
    frame: frame - 332,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.5 },
  });
  const checkScale = interpolate(checkSpring, [0, 1], [0, 1]);
  const checkOpacity = interpolate(checkSpring, [0, 0.2, 1], [0, 0.6, 1]);

  // Hide cursor after confirmation
  const cursorFadeOut = interpolate(frame, [335, 345], [1, 0], clamp);

  /* ════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════ */

  // Product data
  const products = [
    { name: "House Blend", weight: "1kg", price: "£8.50" },
    { name: "Ethiopia Yirga", weight: "250g", price: "£12.00" },
  ];

  return (
    <AbsoluteFill style={fullScreen}>

      {/* ── Headlines ── */}
      <div style={{ position: "relative", marginBottom: 30, height: 140, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <h1 style={{ ...headline, position: "absolute", opacity: head1Opacity, transform: `translateY(${head1Y}px)`, maxWidth: 1200 }}>
          Your brand. Their experience.
        </h1>
        <h1 style={{ ...headline, position: "absolute", opacity: head2Opacity, transform: `translateY(${head2Y}px)`, maxWidth: 1200 }}>
          Watch the order come in.
        </h1>
        <h1 style={{ ...headline, position: "absolute", opacity: head3Opacity, transform: `translateY(${head3Y}px)`, maxWidth: 1200 }}>
          Stock committed. Instantly.
        </h1>
      </div>

      {/* ── Main layout ── */}
      <div style={{ display: "flex", gap: 30, alignItems: "flex-start", position: "relative" }}>

        {/* ── Portal preview (centre-left) ── */}
        <div style={{
          opacity: portalOpacity * portalDim,
          transform: `scale(${portalScale})`,
          transformOrigin: "left center",
          position: "relative",
        }}>
          <Card style={{ width: 620, padding: 0, overflow: "hidden" }}>
            {/* Hero banner with ink flood */}
            <div style={{ height: 160, position: "relative", overflow: "hidden" }}>
              {/* Base light background */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundColor: "#E2E8F0",
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end", padding: 20,
              }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY, position: "relative", zIndex: 2 }}>
                  {brandName}
                </span>
              </div>

              {/* Dark ink overlay — expands via clip-path */}
              {inkProgress > 0 && (
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundColor: "#1A1A1A",
                  clipPath: inkClip,
                  display: "flex", flexDirection: "column",
                  justifyContent: "flex-end", padding: 20,
                }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", fontFamily: FONT_FAMILY, position: "relative", zIndex: 2 }}>
                    {brandName}
                  </span>
                </div>
              )}

              {/* Nav bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 20px", zIndex: 5,
              }}>
                <div style={{ opacity: logoOpacity, transform: `translateY(${logoY}px)` }}>
                  <OffYourBeanLogo size={48} />
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  {["Shop", "Wholesale", "Contact"].map((l) => (
                    <span key={l} style={{ fontSize: 13, color: subTextColor, fontFamily: FONT_FAMILY }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div style={{
              padding: 20,
              opacity: contentOpacity,
              transform: `translateY(${contentY}px)`,
            }}>
              <p style={{
                fontSize: 12, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: 1.5,
                color: inkProgress > 0.5 ? "#1A1A1A" : BRAND.muted,
                marginBottom: 16, fontFamily: FONT_FAMILY,
              }}>
                Our Coffee
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                {products.map((p, i) => {
                  const isFirst = i === 0;
                  const highlightBorder = isFirst && card1Highlight > 0
                    ? `2px solid ${BRAND.blue}`
                    : `1px solid ${BRAND.border}`;
                  const cardPulse = isFirst ? clickPulse : 1;

                  return (
                    <div key={p.name} style={{
                      flex: 1, display: "flex", flexDirection: "column", gap: 8,
                      border: highlightBorder,
                      borderRadius: 12, padding: 12,
                      transform: `scale(${cardPulse})`,
                      position: "relative",
                    }}>
                      <div style={{ width: "100%", aspectRatio: "1.2", borderRadius: 8, backgroundColor: "#F3F4F6" }} />
                      <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark, fontFamily: FONT_FAMILY }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: BRAND.muted, fontFamily: FONT_FAMILY }}>{p.weight}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.dark, fontFamily: FONT_FAMILY }}>{p.price}</div>

                      {/* Quantity selector — appears on first card in Act 2 */}
                      {isFirst && frame >= 275 && (
                        <div style={{
                          display: "flex", alignItems: "center", gap: 10,
                          opacity: qtyOpacity, transform: `translateY(${qtyY}px)`,
                        }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 6,
                            backgroundColor: "#F3F4F6", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: 16, fontWeight: 700, color: BRAND.muted, fontFamily: FONT_FAMILY,
                          }}>-</div>
                          <span style={{
                            fontSize: 16, fontWeight: 700, color: BRAND.dark,
                            fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums",
                            minWidth: 24, textAlign: "center" as const,
                          }}>{qtyVal}</span>
                          <div style={{
                            width: 28, height: 28, borderRadius: 6,
                            backgroundColor: "#F3F4F6", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: 16, fontWeight: 700, color: BRAND.muted, fontFamily: FONT_FAMILY,
                          }}>+</div>
                        </div>
                      )}

                      {/* Order button */}
                      <div style={{
                        width: "100%", padding: "8px 0", borderRadius: 8,
                        backgroundColor: accentColor, color: "#FFFFFF",
                        textAlign: "center" as const, fontSize: 13,
                        fontWeight: 600, fontFamily: FONT_FAMILY,
                        transform: isFirst ? `scale(${orderBtnPulse})` : undefined,
                        position: "relative",
                      }}>
                        Order
                        {/* Green checkmark over button after order */}
                        {isFirst && frame >= 332 && (
                          <div style={{
                            position: "absolute", inset: 0,
                            backgroundColor: BRAND.green,
                            borderRadius: 8,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            opacity: checkOpacity,
                            transform: `scale(${checkScale})`,
                          }}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M3 9L7 13L15 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span style={{ marginLeft: 6, fontSize: 13, fontWeight: 600, color: "#FFFFFF", fontFamily: FONT_FAMILY }}>
                              Ordered
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Cursor overlay */}
          {frame >= 220 && frame < 350 && (
            <div style={{
              position: "absolute",
              left: cursorPhase2 ? cursorX2 : cursorX,
              top: cursorPhase2 ? cursorY2 : cursorY,
              opacity: cursorOpacity * cursorFadeOut,
              pointerEvents: "none" as const,
              zIndex: 10,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 8-6 2-3 7L5 3z" fill="#0F172A" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          )}
        </div>

        {/* ── Right: Stock counters ── */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 16,
          opacity: counterOpacity,
          transform: `translateY(${counterY}px) scale(${counterScale})`,
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

          {/* Roasted Stock — drops from 10 to 0 in Act 3 */}
          <Card style={{
            width: 200, textAlign: "center" as const, padding: 20,
            boxShadow: redFlash > 0
              ? `0 10px 25px rgba(0,0,0,0.08), 0 0 0 ${Math.round(redFlash * 3)}px rgba(239,68,68,${redFlash * 0.4})`
              : "0 10px 25px rgba(0,0,0,0.08)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
              <svg width="14" height="14" viewBox="0 0 16 16">
                {frame >= 375
                  ? <path d="M4 6l4 4 4-4" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />
                  : <path d="M4 10l4-4 4 4" stroke={BRAND.orange} strokeWidth="2" fill="none" strokeLinecap="round" />
                }
              </svg>
              <span style={{ fontSize: 11, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Roasted Stock</span>
            </div>
            <span style={{
              fontSize: 26, fontWeight: 900,
              color: frame >= 375 ? "#EF4444" : BRAND.orange,
              fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums",
            }}>
              {roastedVal}
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginLeft: 4 }}>kg</span>
            </span>
            {frame >= 375 && (
              <div style={{
                fontSize: 11, color: "#F87171", fontFamily: FONT_FAMILY, marginTop: 4,
                opacity: interpolate(frame, [420, 430], [0, 1], clamp),
              }}>
                &#x25BC; 10kg
              </div>
            )}
          </Card>

          {/* "Order committed" badge */}
          {frame >= 425 && (
            <div style={{
              opacity: badgeOpacity,
              transform: `scale(${badgeScale})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                backgroundColor: "#DCFCE7", padding: "8px 16px",
                borderRadius: 20, fontFamily: FONT_FAMILY,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" fill={BRAND.green} />
                  <path d="M4.5 8L7 10.5L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.green }}>
                  Order committed
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
