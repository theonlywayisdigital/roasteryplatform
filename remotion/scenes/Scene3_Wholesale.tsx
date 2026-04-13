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

export const Scene3_Wholesale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Headline ── */
  const headOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 12], [25, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  /* ── Portal card appears (12-24) ── */
  const cardOpacity = interpolate(frame, [12, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Ink flood: radial clip-path expanding from top-left ── */
  // The ink starts at top-left of the header area and expands as a circle
  // Phase 1 (40-90): Dark ink floods the header
  const inkProgress = interpolate(frame, [40, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  // Circle radius grows from 0 to cover the whole header
  const inkRadius = interpolate(inkProgress, [0, 1], [0, 200]);

  // Phase 2 (80-130): Orange accent bleeds into buttons progressively
  const accentProgress = interpolate(frame, [80, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  /* ── Logo drops in with spring bounce (60-85) ── */
  const logoSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 9, stiffness: 120, mass: 0.5 },
  });
  const logoY = interpolate(logoSpring, [0, 1], [-200, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 0.2, 1], [0, 0.8, 1]);

  /* ── Content fade-in after branding (100-130) ── */
  const contentOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contentY = interpolate(frame, [100, 130], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Brand controls card (left side) ── */
  const controlsOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* Derived colours */
  const headerBg = inkProgress > 0
    ? `rgb(${Math.round(interpolate(inkProgress, [0, 1], [226, 26]))}, ${Math.round(interpolate(inkProgress, [0, 1], [232, 26]))}, ${Math.round(interpolate(inkProgress, [0, 1], [240, 26]))})`
    : "#E2E8F0";
  const textColor = inkProgress > 0.5 ? "#FFFFFF" : BRAND.dark;
  const subTextColor = inkProgress > 0.5 ? "rgba(255,255,255,0.7)" : BRAND.muted;
  const accentColor = accentProgress > 0
    ? `rgb(${Math.round(interpolate(accentProgress, [0, 1], [203, 217]))}, ${Math.round(interpolate(accentProgress, [0, 1], [213, 119]))}, ${Math.round(interpolate(accentProgress, [0, 1], [225, 6]))})`
    : "#CBD5E1";
  const brandName = logoOpacity > 0.5 ? "Off Your Bean" : "Your Roastery";
  const primaryHex = inkProgress > 0.5 ? "#1A1A1A" : "#E2E8F0";
  const accentHex = accentProgress > 0.5 ? "#D97706" : "#CBD5E1";

  /* Ink clip-path for the header overlay */
  const inkClip = `circle(${inkRadius}% at 0% 0%)`;

  return (
    <AbsoluteFill style={fullScreen}>
      <h1 style={{ ...headline, opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 40 }}>
        Your brand. Their experience.
      </h1>

      <div style={{ display: "flex", gap: 30, opacity: cardOpacity }}>
        {/* Left: Brand controls */}
        <div style={{ opacity: controlsOpacity }}>
          <Card style={{ width: 280, display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark, fontFamily: FONT_FAMILY }}>Brand Identity</span>

            {/* Logo upload */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginBottom: 6, fontFamily: FONT_FAMILY }}>Logo</div>
              <div style={{
                width: "100%", height: 60,
                border: `2px dashed ${BRAND.border}`, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}>
                <span style={{ fontSize: 12, color: BRAND.muted, position: "absolute", opacity: 1 - logoOpacity, fontFamily: FONT_FAMILY }}>
                  Upload logo
                </span>
                <div style={{ opacity: logoOpacity, transform: `scale(${logoSpring})` }}>
                  <OffYourBeanLogo size={80} />
                </div>
              </div>
            </div>

            {/* Primary colour */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginBottom: 6, fontFamily: FONT_FAMILY }}>Primary</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  border: `1px solid ${BRAND.border}`, backgroundColor: headerBg,
                }} />
                <span style={{ fontSize: 13, color: BRAND.muted, fontFamily: "monospace" }}>{primaryHex}</span>
              </div>
            </div>

            {/* Accent colour */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginBottom: 6, fontFamily: FONT_FAMILY }}>Accent</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  border: `1px solid ${BRAND.border}`, backgroundColor: accentColor,
                }} />
                <span style={{ fontSize: 13, color: BRAND.muted, fontFamily: "monospace" }}>{accentHex}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Portal preview */}
        <Card style={{ width: 500, padding: 0, overflow: "hidden" }}>
          {/* Hero banner with ink flood */}
          <div style={{
            height: 160,
            position: "relative",
            overflow: "hidden",
          }}>
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

            {/* Nav */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 20px", zIndex: 5,
            }}>
              <div style={{
                opacity: logoOpacity,
                transform: `translateY(${logoY}px)`,
              }}>
                <OffYourBeanLogo size={56} />
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                {["Shop", "Wholesale", "Contact"].map((l) => (
                  <span key={l} style={{ fontSize: 13, color: subTextColor, fontFamily: FONT_FAMILY }}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Product grid — fades in last */}
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
              {[1, 2].map((i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ width: "100%", aspectRatio: "1", borderRadius: 10, backgroundColor: "#F3F4F6" }} />
                  <div style={{ height: 8, width: "75%", backgroundColor: "#E5E7EB", borderRadius: 4 }} />
                  <div style={{ height: 8, width: "50%", backgroundColor: "#F3F4F6", borderRadius: 4 }} />
                  <div style={{
                    width: "100%", padding: "8px 0", borderRadius: 8,
                    backgroundColor: accentColor, color: "#FFFFFF",
                    textAlign: "center" as const, fontSize: 13,
                    fontWeight: 600, fontFamily: FONT_FAMILY,
                  }}>
                    Order
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
