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
import { Card, Field } from "../components";

/* ═══════════════════════════════════════════════════════════════
   MergedScene1 — Green Bean → Roast Log
   Duration: 420 frames (14s @ 30fps)

   Act 1 (0–180):   Add Green Bean form + Green Stock counter
   Act 2 (180–420): Log Roast form + both stock counters animate
   ═══════════════════════════════════════════════════════════════ */

export const MergedScene1_GreenBeanRoastLog: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Helpers ── */
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const easeOut = { ...clamp, easing: Easing.out(Easing.cubic) };

  /* ════════════════════════════════════════════════════════════
     HEADLINE — crossfades at the act boundary
     ════════════════════════════════════════════════════════════ */

  // Act 1 headline: "It starts with the green bean."
  const head1Opacity = interpolate(frame, [0, 12, 160, 180], [0, 1, 1, 0], clamp);
  const head1Y = interpolate(frame, [0, 12], [25, 0], easeOut);

  // Act 2 headline: "Log every roast. Stock updates automatically."
  const head2Opacity = interpolate(frame, [180, 200], [0, 1], clamp);
  const head2Y = interpolate(frame, [180, 200], [25, 0], easeOut);

  /* ════════════════════════════════════════════════════════════
     ACT 1 — Add Green Bean form (frames 0–180)
     ════════════════════════════════════════════════════════════ */

  // Form slides in from left with fade + scale
  const act1FormOpacity = interpolate(frame, [8, 24], [0, 1], clamp);
  const act1FormScale = interpolate(frame, [8, 24], [0.92, 1], easeOut);
  const act1FormX = interpolate(frame, [8, 24], [-60, 0], easeOut);

  // Act 1 form exits: shrinks to 80% and slides left at transition
  const act1ExitScale = interpolate(frame, [170, 210], [1, 0.8], easeOut);
  const act1ExitX = interpolate(frame, [170, 210], [0, -500], easeOut);
  const act1ExitOpacity = interpolate(frame, [170, 210], [1, 0], clamp);

  // Combined act 1 form transforms
  const act1Scale = frame < 170 ? act1FormScale : act1FormScale * act1ExitScale;
  const act1X = frame < 170 ? act1FormX : act1FormX + act1ExitX;
  const act1Opacity = frame < 170 ? act1FormOpacity : act1FormOpacity * act1ExitOpacity;

  // Field stagger — type in sequentially
  const fieldFo = (d: number) => interpolate(frame, [d, d + 18], [0, 1], clamp);
  const fieldFy = (d: number) => interpolate(frame, [d, d + 18], [16, 0], easeOut);

  // Act 1 button pulse at frame 150
  const act1BtnOpacity = interpolate(frame, [80, 95], [0, 1], clamp);
  const act1BtnPulse = frame >= 145 && frame <= 165
    ? 1 + 0.06 * Math.sin((frame - 145) * 0.4)
    : 1;

  /* ════════════════════════════════════════════════════════════
     ACT 2 — Log Roast form (frames 180–420)
     ════════════════════════════════════════════════════════════ */

  // Log Roast form slides in from right and scales up
  const act2FormSpring = spring({
    frame: frame - 185,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.7 },
  });
  const act2FormOpacity = interpolate(act2FormSpring, [0, 0.3, 1], [0, 0.7, 1]);
  const act2FormScale = interpolate(act2FormSpring, [0, 1], [0.9, 1]);
  const act2FormX = interpolate(act2FormSpring, [0, 1], [300, 0]);

  // Act 2 field stagger (relative to act 2 start)
  const act2Fo = (d: number) => interpolate(frame, [d, d + 18], [0, 1], clamp);
  const act2Fy = (d: number) => interpolate(frame, [d, d + 18], [16, 0], easeOut);

  // Weight loss badge
  const wlOpacity = interpolate(frame, [240, 258], [0, 1], clamp);

  // Act 2 button appears before stock deduction, pulses at 280
  const act2BtnOpacity = interpolate(frame, [255, 270], [0, 1], clamp);
  const act2BtnPulse = frame >= 275 && frame <= 295
    ? 1 + 0.06 * Math.sin((frame - 275) * 0.4)
    : 1;

  /* ════════════════════════════════════════════════════════════
     STOCK COUNTERS — persistent, right side
     ════════════════════════════════════════════════════════════ */

  // Green stock counter — appears with Act 1 form, persists throughout
  const greenCounterOpacity = interpolate(frame, [8, 24], [0, 1], clamp);
  const greenCounterX = interpolate(frame, [8, 24], [40, 0], easeOut);

  // Green stock value: ticks up 0→120 in Act 1, drops 120→108 when roast logs
  const greenAct1 = interpolate(frame, [10, 80], [0, 120], easeOut);
  const greenAct2 = interpolate(frame, [290, 340], [120, 108], easeOut);
  const greenVal = Math.round(frame < 290 ? greenAct1 : greenAct2);

  // Green stock arrow — shows up arrow in Act 1, down arrow in Act 2 after roast
  const greenDeltaVisible = frame >= 290;

  // Roasted stock counter — appears in Act 2
  const roastedCounterSpring = spring({
    frame: frame - 195,
    fps,
    config: { damping: 12, stiffness: 70, mass: 0.8 },
  });
  const roastedCounterOpacity = interpolate(roastedCounterSpring, [0, 0.3, 1], [0, 0.6, 1]);
  const roastedCounterY = interpolate(roastedCounterSpring, [0, 1], [40, 0]);

  // Roasted stock value: 0→10 when roast logs
  const roastedVal = Math.round(interpolate(frame, [290, 340], [0, 10], easeOut));

  // Roasted delta visible after counting
  const roastedDeltaVisible = frame >= 340;

  /* ════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════ */

  const showAct1Form = frame < 220; // keep visible during exit animation
  const showAct2Form = frame >= 180;

  return (
    <AbsoluteFill style={fullScreen}>
      {/* ── Headlines ── */}
      <div style={{ position: "relative", marginBottom: 40, height: 140, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <h1 style={{
          ...headline,
          position: "absolute",
          opacity: head1Opacity,
          transform: `translateY(${head1Y}px)`,
          maxWidth: 1200,
        }}>
          It starts with the green bean.
        </h1>
        <h1 style={{
          ...headline,
          position: "absolute",
          opacity: head2Opacity,
          transform: `translateY(${head2Y}px)`,
          maxWidth: 1200,
        }}>
          Log every roast.<br />Stock updates automatically.
        </h1>
      </div>

      {/* ── Main content area ── */}
      <div style={{ display: "flex", gap: 30, alignItems: "flex-start", position: "relative" }}>

        {/* ── Left: Form cards ── */}
        <div style={{ width: 520, position: "relative" }}>

          {/* Act 1: Add Green Bean form */}
          {showAct1Form && (
            <div style={{
              opacity: act1Opacity,
              transform: `scale(${act1Scale}) translateX(${act1X}px)`,
              transformOrigin: "left center",
              position: frame >= 180 ? "absolute" as const : "relative" as const,
              top: 0,
              left: 0,
              width: 520,
            }}>
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

                {/* Fields — type in sequentially */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ opacity: fieldFo(22), transform: `translateY(${fieldFy(22)}px)` }}>
                    <Field label="Name *" value="Ethiopia Yirgacheffe" />
                  </div>
                  <div style={{ display: "flex", gap: 14, opacity: fieldFo(40), transform: `translateY(${fieldFy(40)}px)` }}>
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
                <div style={{ marginTop: 20, opacity: act1BtnOpacity }}>
                  <div style={{
                    backgroundColor: BRAND.blue, color: "#fff",
                    padding: "10px 24px", borderRadius: 10, fontSize: 15,
                    fontWeight: 600, display: "inline-block", fontFamily: FONT_FAMILY,
                    transform: `scale(${act1BtnPulse})`,
                  }}>
                    Add Green Bean
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Act 2: Log Roast form */}
          {showAct2Form && (
            <div style={{
              opacity: act2FormOpacity,
              transform: `scale(${act2FormScale}) translateX(${act2FormX}px)`,
              transformOrigin: "left center",
            }}>
              <Card style={{ width: 520 }}>
                {/* Header */}
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
                  <div style={{ opacity: act2Fo(210), transform: `translateY(${act2Fy(210)}px)` }}>
                    <Field label="Green Bean" value="Ethiopia Yirgacheffe" />
                  </div>
                  <div style={{ display: "flex", gap: 14, opacity: act2Fo(228), transform: `translateY(${act2Fy(228)}px)` }}>
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
                <div style={{ marginTop: 20, opacity: act2BtnOpacity }}>
                  <div style={{
                    backgroundColor: BRAND.blue, color: "#fff",
                    padding: "10px 24px", borderRadius: 10, fontSize: 15,
                    fontWeight: 600, display: "inline-block", fontFamily: FONT_FAMILY,
                    transform: `scale(${act2BtnPulse})`,
                  }}>
                    Log Roast
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* ── Right: Stock counters ── */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 16,
          opacity: greenCounterOpacity,
          transform: `translateX(${greenCounterX}px)`,
        }}>
          {/* Green Stock */}
          <Card style={{ width: 240, textAlign: "center" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                {greenDeltaVisible
                  ? <path d="M4 6l4 4 4-4" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />
                  : <path d="M4 10l4-4 4 4" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />
                }
              </svg>
              <span style={{ fontSize: 12, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Green Stock</span>
            </div>
            <span style={{
              fontSize: 30, fontWeight: 900,
              color: greenDeltaVisible ? "#EF4444" : BRAND.green,
              fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums",
            }}>
              {greenVal}
              <span style={{ fontSize: 15, fontWeight: 500, color: BRAND.muted, marginLeft: 4 }}>kg</span>
            </span>
            {greenDeltaVisible && (
              <div style={{
                fontSize: 12, color: "#F87171", fontFamily: FONT_FAMILY, marginTop: 6,
                opacity: interpolate(frame, [340, 350], [0, 1], clamp),
              }}>
                &#x25BC; 12kg
              </div>
            )}
          </Card>

          {/* Roasted Stock — appears in Act 2 */}
          {frame >= 190 && (
            <div style={{
              opacity: roastedCounterOpacity,
              transform: `translateY(${roastedCounterY}px)`,
            }}>
              <Card style={{ width: 240, textAlign: "center" as const }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M4 10l4-4 4 4" stroke={BRAND.orange} strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 500, color: BRAND.muted, fontFamily: FONT_FAMILY }}>Roasted Stock</span>
                </div>
                <span style={{ fontSize: 28, fontWeight: 900, color: BRAND.orange, fontFamily: FONT_FAMILY, fontVariantNumeric: "tabular-nums" }}>
                  {roastedVal}
                  <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.muted, marginLeft: 4 }}>kg</span>
                </span>
                {roastedDeltaVisible && (
                  <div style={{
                    fontSize: 12, color: BRAND.orange, fontFamily: FONT_FAMILY, marginTop: 4,
                    opacity: interpolate(frame, [340, 350], [0, 1], clamp),
                  }}>
                    &#x25B2; 10kg
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
